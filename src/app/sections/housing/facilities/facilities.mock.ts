import { Facility } from './facilities.model';

export function generateFacility(_: any, index: number): Facility {
  const facilityName: string = 'Gryffindor';
  const facilityId: number = index;
  const bedCount: string = '1-4';
  const bathCount: string = 'Communal';
  const floors: number = 7 + index;
  const builtYear: number = 1997 + index;
  const campus: string = 'North';
  const parking: string = 'Whomping Willow';
  const availableUnits: number = 50 + index;

  return new Facility(
    facilityName,
    facilityId,
    bedCount,
    bathCount,
    floors,
    builtYear,
    campus,
    parking,
    availableUnits
  );
}

export function generateFacilities(amount: number): Facility[] {
  return Array.apply(null, Array(amount)).map(generateFacility);
}
