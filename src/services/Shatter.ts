import axios from 'axios';
import * as cheerio from 'cheerio';
import { Shatter, Crystal, CrystalType } from '../models/Shatter_enums';
import { formatNames } from '../utils/formatters';

export class ShatterParser {
  private readonly baseUrl = 'https://growtopia.fandom.com/wiki/Guide:Crystals';
  
  async ParseItemTable(): Promise<Shatter[]> {
    try {
      const response = await axios.get(this.baseUrl);
      const $ = cheerio.load(response.data);
      const items: Shatter[] = [];
      
      $('table.article-table tr').each((_, row) => {
        if ($(row).find('th').length > 0) return;
        
        const itemCell = $(row).find('td').first();
        if (!itemCell.length) return;
        
        const name = itemCell.find('a').text().trim();
        const imageUrl = itemCell.find('.growsprite img').attr('src') || undefined;
        
        if (!name) return;
        
        const crystals: Crystal[] = [];
        
        $(row).find('td').each((index, cell) => {
          if (index < 2) return;

          const bgStyle = $(cell).attr('style');
          if (!bgStyle) return;
          
          let crystalType: CrystalType | null = null;
          
          if (bgStyle.includes('#FF3333')) {
            crystalType = CrystalType.Red;
          } else if (bgStyle.includes('#00CC00')) {
            crystalType = CrystalType.Green;
          } else if (bgStyle.includes('#3333FF')) {
            crystalType = CrystalType.Blue;
          } else if (bgStyle.includes('#FFFFFF')) {
            crystalType = CrystalType.White;
          } else if (bgStyle.includes('#000000')) {
            crystalType = CrystalType.Black;
          }
          
          if (crystalType === null) return;
          
          const quantityText = $(cell).text().trim();
          const quantity = parseInt(quantityText.replace('x', ''));
          
          if (isNaN(quantity)) return;
          
          crystals.push({
            type: crystalType,
            quantity
          });
        });
        
        if (crystals.length > 0) {
          items.push({
            name,
            imageUrl,
            crystals
          });
        }
      });
      
      return items;
    } catch (error) {
      console.error('Error getting items details:', error);
      return [];
    }
  }
}