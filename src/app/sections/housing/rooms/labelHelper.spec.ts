import { FacilityAttribute } from '@sections/housing/facilities/facilities.model';
import { DataType } from '@sections/housing/attributes/attributes.model';
import { LabelHelper } from '@sections/housing/rooms/labelHelper';
import { Label } from '@sections/housing/housing.model';

describe('Testing LabelHelper FindType', () => {
  it('should return Gender data type as string ', () => {
    const expected = DataType.String;
    const attribute = new FacilityAttribute(7949, 354, 2306, 'Male', 'Gender', new Date('2019-01-01T00:00:00'), null);

    expect(LabelHelper.findType(attribute)).toBe(expected);
  });

  it('should return Assignment_Limit as datatype integer ', () => {
    const expected = DataType.Integer;
    const attrib = new FacilityAttribute(
      6175,
      354,
      2308,
      '1',
      'Assignment_Limit',
      new Date('2019-01-01T00:00:00'),
      null
    );

    expect(LabelHelper.findType(attrib)).toBe(expected);
  });

  it('should return Smoking datatype as YesNo', () => {
    const expected = DataType.YesNo;
    const attrib = new FacilityAttribute(
      9025024,
      9000324,
      2302,
      'No',
      'Smoking',
      new Date('2019-01-01T00:00:00'),
      null
    );

    expect(LabelHelper.findType(attrib)).toBe(expected);
  });

  it('should return Mock Date datatype as Date', () => {
    const expected = DataType.Date;
    const attrib = new FacilityAttribute(
      9025024,
      9000324,
      2302,
      '2019-01-01T00:00:00',
      'Mock Date',
      new Date('2019-01-01T00:00:00'),
      null
    );

    expect(LabelHelper.findType(attrib)).toBe(expected);
  });
});

describe('Testing Get Labels', () => {
  it('should return appropriate labels', function() {
    const expected = [
      new Label('Bathroom Type'),
      new Label('Gender'),
      new Label('ADA')
    ];

    const attribs = [
      new FacilityAttribute(7938, 354, 2749, 'tub',
        'Bathroom Type', new Date('2019-01-01T00:00:00'), null),
      new FacilityAttribute(7949, 354, 2306, 'Male',
        'Gender', new Date('2019-01-01T00:00:00'), null),
      new FacilityAttribute(7992, 354, 2304, 'Mobility',
        'ADA', new Date('2019-01-01T00:00:00'), null),
      new FacilityAttribute(6171, 354, 2315, 'RmSelect Smith F1 Rm101Sgl',
        'Full Name', new Date('2019-01-01T00:00:00'), null),
      new FacilityAttribute(6175, 354, 2308, '1',
        'Assignment_Limit', new Date('2019-01-01T00:00:00'), null),
      new FacilityAttribute(9025024, 9000324, 2302, 'No',
        'Smoking', new Date('2019-01-01T00:00:00'), null),
    ];

    expect(LabelHelper.getLabels(attribs)).toEqual(expected);
  });
});

// new FacilityAttribute(7938, 354, 2749, 'tub',
//   'Bathroom Type', new Date("2019-01-01T00:00:00"), null),
//   new FacilityAttribute(7949, 354, 2306, 'Male',
//     'Gender', new Date("2019-01-01T00:00:00"), null),
//   new FacilityAttribute(7992, 354, 2304, 'Mobility',
//     'ADA', new Date("2019-01-01T00:00:00"), null),
//   new FacilityAttribute(6171, 354, 2315, 'RmSelect Smith F1 Rm101Sgl',
//     'Full Name', new Date("2019-01-01T00:00:00"), null),
//   new FacilityAttribute(6175, 354, 2308, '1',
//     'Assignment_Limit', new Date("2019-01-01T00:00:00"), null),
