import axios from 'axios';
import * as cheerio from 'cheerio';
import { GrowtopiaItemDetails } from '../models/ItemDetails_enums';
import { formatNames, cleanHTML } from '../utils/formatters';
import { getTable, getCard, getSeedColors, getPaint, getHardness, getRecipe } from '../utils/parsers';

export class ItemDetails {
  private readonly baseUrl = 'https://growtopia.fandom.com/wiki/';
  
  async itemDetails(itemName: string): Promise<GrowtopiaItemDetails[]> {
    try {
      const formatName = formatNames(itemName);
      const url = `${this.baseUrl}${formatName}`;
      
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      const name = $('.mw-headline b').text().trim() || "Can't get the name";
      const imageUrl = $('.growsprite img').attr('src');
      if (!imageUrl) return [];
      
      const tableData = getTable($);
      const cardTexts = getCard($);
      const seedInfo = getSeedColors($);
      const paintPreviews = getPaint($);
      const hits = getHardness(tableData['Hardness']);
      const recipe = getRecipe($);
      
      return [{
        name,
        imageUrl,
        wikiUrl: url,
        description: cardTexts[0] || '',
        properties: cardTexts[1] ? cleanHTML(cardTexts[1]) : '',
        ChiType: tableData['Chi'],
        Hardness: hits,
        GrowTime: tableData['Grow Time'],
        GemsDrop: tableData['Default Gems Drop'],
        Seed: {
          colors: seedInfo.colors,
          spriteUrl: seedInfo.spriteUrl
        },
        PaintPreview: paintPreviews,
        Recipe: recipe
      }];
    } catch (error) {
      console.error('Error getting items details:', error);
      return [];
    }
  }
}