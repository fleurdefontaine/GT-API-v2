export interface Shatter {
    name: string;
    crystals: Crystal[];
    imageUrl?: string;
}

export interface Crystal {
    type: CrystalType;
    quantity: number;
}

export class CrystalType {
    static readonly Red = new CrystalType("Red");
    static readonly Green = new CrystalType("Green");
    static readonly Blue = new CrystalType("Blue");
    static readonly White = new CrystalType("White");
    static readonly Black = new CrystalType("Black");

    private constructor(public readonly value: string) {}

    toString(): string {
        return this.value;
    }
}