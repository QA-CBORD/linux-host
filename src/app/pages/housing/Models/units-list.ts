export class UnitsList {
    unitId: string;
    unitName: string;
    unitRate: string;
    unitBeds: number;
    unitBaths: number;

    constructor(id: string,
                name: string,
                rate: string,
                beds: number,
                baths: number) {
            this.unitId = id;
            this.unitName = name;
            this.unitRate = rate;
            this.unitBeds = beds;
            this.unitBaths = baths;
    }
}