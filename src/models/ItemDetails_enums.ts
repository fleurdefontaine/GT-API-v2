export interface GrowtopiaItemDetails {
  name: string;
  imageUrl?: string;
  wikiUrl?: string;
  ChiType?: string;
  Hardness?: string[];
  GrowTime?: string;
  GemsDrop?: string;
  Seed: {
    colors: string[];
    spriteUrl?: string;
  };
  PaintPreview?: {
    color: string;
    sprite: string;
  }[];
  description?: string;
  properties?: string;

  Recipe?: {
    type: 'Combine' | 'Cooking' | 'None';
    items: Array<{
      name: string;
      quantity?: string;
      time?: string;
      icon: string;
    }>;
  };
}