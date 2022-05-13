import { Facility } from './facilities.model';

export function generateFacility(_: any, index: number): Facility {
  const facilityName = 'Gryffindor';
  const facilityId: number = index;
  const bedCount = '1-4';
  const bathCount = 'Communal';
  const floors: number = 7 + index;
  const builtYear: number = 1997 + index;
  const campus = 'North';
  const parking = 'Whomping Willow';
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
