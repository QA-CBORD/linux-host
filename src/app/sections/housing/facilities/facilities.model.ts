export class Facility {
  constructor(
    public facilityName: string,
    public facilityId: number,
    public bedCount: string,
    public bathCount: string,
    public floors: number,
    public builtYear: number,
    public campus: string,
    public parking: string,
    public availableUnits: number,
    public isExpanded: boolean = false,
    public iconName: string = 'arrow-down',
  ) {}
}
