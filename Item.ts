class Item {
    codeNumber: string;
    name: string;
    priceGiven: number;
    constructor (codeNumber: string, name: string, priceGiven: number) {
       this.codeNumber = codeNumber;
       this.name = name;
       this.priceGiven = priceGiven;
    }

    getCode(): string {
        return this.codeNumber;
    }

    getPrice(): number {
        return this.priceGiven;
    }
}

export { Item };