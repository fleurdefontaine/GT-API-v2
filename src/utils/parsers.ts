import { CheerioAPI } from 'cheerio';

export const getTable = ($: CheerioAPI): Record<string, string> => {
  const tableData: Record<string, string> = {};
  $('table.card-field tr').each((_, el) => {
    const label = $(el).find('th').text().trim();
    if (label) tableData[label] = $(el).find('td').text().trim().replace(/\s+/g, ' ');
  });
  return tableData;
};

export const getCard = ($: CheerioAPI): string[] => {
  return $('div.card-text').map((_, el) => $(el).html()?.trim() ?? '').get();
};

export const getSeedColors = ($: CheerioAPI): { colors: string[], spriteUrl?: string } => {
  const seedColors: string[] = [];
  const seedRow = $('table.card-field tr').filter((_, el) => $(el).find('th').text().trim() === 'Seed Color');
  const seedSpriteUrl = seedRow.find('span.seed.growsprite img').attr('src') || undefined;
  
  seedRow.find('span[style*="background:"]').each((_, el) => {
    const match = $(el).attr('style')?.match(/background:\s*(#[0-9A-Fa-f]{6})/);
    if (match) seedColors.push(match[1]);
  });
  
  return { colors: seedColors, spriteUrl: seedSpriteUrl };
};

export const getPaint = ($: CheerioAPI): { color: string; sprite: string }[] => {
  const paintPreviews: { color: string; sprite: string }[] = [];
  
  $('div.paint-preview .paint').each((_, el) => {
    const color = $(el).find('i').text().trim();
    if (color !== 'None') {
      paintPreviews.push({
        color,
        sprite: $(el).find('i .growsprite img').attr('src') || ''
      });
    }
  });
  
  return paintPreviews;
};

export const getHardness = (hardnessText?: string): string[] => {
  const hitMatches = hardnessText?.match(/\d+\sHits/g) || [];
  return hitMatches.map((hit, i) => i === 0 ? `${hit} without Pickaxe` : `${hit} with Pickaxe`);
};

export const getRecipe = ($: CheerioAPI): { 
  type: 'Combine' | 'Cooking' | 'None'; 
  items: Array<{ 
    name: string; 
    quantity?: string; 
    time?: string; 
    icon: string; 
  }> 
} => {
  const recipeBox = $('.recipebox');
  const result = {
    type: 'None' as 'Combine' | 'Cooking' | 'None',
    items: [] as Array<{ name: string; quantity?: string; time?: string; icon: string }>
  };
  
  if (!recipeBox.length) return result;
  
  const html = recipeBox.html() || '';
  
  if (html.includes("Combiner")) {
    result.type = 'Combine';
    
    recipeBox.find('tr td').each((_, el) => {
      const sprite = $(el).find('.growsprite img');
      const name = $(el).find('a').first().text().trim();
      const quantity = $(el).find('b').first().text().trim();
      const icon = sprite.attr('src') || '';
      
      if (name && icon) {
        result.items.push({ name, quantity, icon });
      }
    });
  } 
  else if (html.includes("Cooking")) {
    result.type = 'Cooking';
    
    recipeBox.find('tr').each((_, tr) => {
      const td = $(tr).find('td');
      if (td.length === 2) {
        const nameEl = td.eq(0);
        const timeEl = td.eq(1);

        const nameText = nameEl.text().trim();
        const match = nameText.match(/^(\d+×)?\s*(.+)$/);
        const name = match ? match[2].trim() : nameText;
        const icon = nameEl.find('.growsprite img').attr('src') || '';
        const time = timeEl.text().trim();
        const quantity = match?.[1]?.trim() || '1×';

        if (name && icon && time) {
          result.items.push({ name, time, icon, quantity });
        }
      }
    });
  }
  return result;
};