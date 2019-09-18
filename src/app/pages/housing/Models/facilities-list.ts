export class FacilitiesList {
    facilityName: string;
    facilityId: number;
    isExpanded = false;
    iconName = 'arrow-down';
    bedCount: string;
    bathCount: string;
    floors: number;
    builtYear: number;
    campus: string;
    parking: string;
    availableUnits: number;

    constructor(name: string,
                id: number,
                bedCount: string,
                bathCount: string,
                floors: number,
                builtYear: number,
                campus: string,
                parking: string,
                availableUnits: number
        ) {
        this.facilityId = id;
        this.facilityName = name;
        this.bedCount = bedCount;
        this.bathCount = bathCount;
        this.floors = floors;
        this.builtYear = builtYear;
        this.campus = campus;
        this.parking = parking;
        this.availableUnits = availableUnits;
    }
}