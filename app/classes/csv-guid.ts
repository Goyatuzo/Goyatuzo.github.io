export interface ICsvGuidStore {

}

export class Csv<T> {
    private items: Array<T>;

    constructor(input: string) {
        this.items = this.parse(input);
    }

    parse(input: string): Array<T> {
        let items: Array<T> = [];

        const rawItems = input.split("\n");

        const headers = rawItems[0];

        for (let i = 0; i < rawItems.length; ++i) {
            let object: any = {};

            for (let j = 0; j < rawItems[i].length; ++j) {
                object[headers[j]] = rawItems[i][j];
            }

            items.push(object);
        }

        return items;
    }

    toString(): string {
        if (this.items.length === 0) {
            return "";
        }

        let str = "";
        
    }
}