import { FacilityDetails, FacilityDetailsToFacilityMapper } from '@sections/housing/facilities/facilities.model';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roommate.model';
import { OccupantAttribute } from '@sections/housing/attributes/attributes.model';

export function generateFacilities(): any[] {
  const facilities = createFacilities();
  const facilityMapper = new FacilityDetailsToFacilityMapper();
  return facilityMapper.map(facilities);
}
export function generateOccupantDetails(): FacilityOccupantDetails[] {
  return [
    new FacilityOccupantDetails({
    name: 'ccc',
    patronKey: 333298,
      patronAttributes: [
      new OccupantAttribute({
        name: 'gender',
        attributeConsumerKey: 2384,
        value: 'test 1',
        effectiveDate: null,
        endDate: null
      }),
      new OccupantAttribute({
        name: 'age',
        attributeConsumerKey: 2387,
        value: 'test 2',
        effectiveDate: null,
        endDate: null
      }),
      new OccupantAttribute({
        name: 'smoking',
        attributeConsumerKey: 2381,
        value: 'yes',
        effectiveDate: null,
        endDate: null
      })
    ]
  }),
    new FacilityOccupantDetails({
      name: 'bbb',
      patronKey: 332099,
      patronAttributes: [
        new OccupantAttribute({
          name: 'gender',
          attributeConsumerKey: 2384,
          value: 'test 22',
          effectiveDate: null,
          endDate: null
        }),
        new OccupantAttribute({
          name: 'age',
          attributeConsumerKey: 2387,
          value: 'test 44',
          effectiveDate: null,
          endDate: null
        }),
        new OccupantAttribute({
          name: 'smoking',
          attributeConsumerKey: 2381,
          value: '',
          effectiveDate: null,
          endDate: null
        })
      ]
    }),
    new FacilityOccupantDetails({
      name: 'aaa',
      patronKey: 333001,
      patronAttributes: [
        new OccupantAttribute({
          name: 'gender',
          attributeConsumerKey: 2384,
          value: 'test 22',
          effectiveDate: null,
          endDate: null
        }),
        new OccupantAttribute({
          name: 'age',
          attributeConsumerKey: 2387,
          value: 'test 44',
          effectiveDate: null,
          endDate: null
        }),
        new OccupantAttribute({
          name: 'smoking',
          attributeConsumerKey: 2381,
          value: 'no',
          effectiveDate: null,
          endDate: null
        })
      ]
    })
  ]
}
function createFacilities(): FacilityDetails[] {
  return [{
    "facilityKey": 9000324,
    "name": "205",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000324,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025019,
      "facilityKey": 9000324,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025024,
      "facilityKey": 9000324,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9033132,
      "facilityKey": 9000324,
      "attributeConsumerKey": 2308,
      "value": "1",
      "effectiveDate": new Date("2015-02-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": [333298]
  }, {
    "facilityKey": 9000761,
    "name": "105",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000761,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9033149,
      "facilityKey": 9000761,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9033151,
      "facilityKey": 9000761,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9033157,
      "facilityKey": 9000761,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000762,
    "name": "106",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000762,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9033159,
      "facilityKey": 9000762,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9033161,
      "facilityKey": 9000762,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9033165,
      "facilityKey": 9000762,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000763,
    "name": "107",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000763,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9033167,
      "facilityKey": 9000763,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9033169,
      "facilityKey": 9000763,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9033173,
      "facilityKey": 9000763,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": [332099]
  }, {
    "facilityKey": 9000764,
    "name": "108",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000764,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9033175,
      "facilityKey": 9000764,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9033177,
      "facilityKey": 9000764,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9033181,
      "facilityKey": 9000764,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000765,
    "name": "109",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000765,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9033183,
      "facilityKey": 9000765,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9033185,
      "facilityKey": 9000765,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9033189,
      "facilityKey": 9000765,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000766,
    "name": "110",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000766,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9033191,
      "facilityKey": 9000766,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9033193,
      "facilityKey": 9000766,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9033197,
      "facilityKey": 9000766,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000767,
    "name": "111",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000767,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9033199,
      "facilityKey": 9000767,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9033201,
      "facilityKey": 9000767,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9033205,
      "facilityKey": 9000767,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000768,
    "name": "112",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000768,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9033207,
      "facilityKey": 9000768,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9033209,
      "facilityKey": 9000768,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9033213,
      "facilityKey": 9000768,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2017-09-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000598,
    "name": "200",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000598,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031009,
      "facilityKey": 9000598,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031013,
      "facilityKey": 9000598,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9033110,
      "facilityKey": 9000598,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-07-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9032097,
      "facilityKey": 9000598,
      "attributeConsumerKey": 2306,
      "value": "Male",
      "effectiveDate": new Date("2016-12-01T00:00:00"),
      "endDate": null,
      "name": "Gender"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000325,
    "name": "207",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000325,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025031,
      "facilityKey": 9000325,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025036,
      "facilityKey": 9000325,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9030172,
      "facilityKey": 9000325,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": [333001]
  }, {
    "facilityKey": 9000323,
    "name": "204",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000323,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025007,
      "facilityKey": 9000323,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025012,
      "facilityKey": 9000323,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9030173,
      "facilityKey": 9000323,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000321,
    "name": "202",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000321,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9024983,
      "facilityKey": 9000321,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9024988,
      "facilityKey": 9000321,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9033021,
      "facilityKey": 9000321,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-12-16T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000485,
    "name": "Able",
    "isTopLevel": true,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000485,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9028000,
      "facilityKey": 9000485,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9027451,
      "facilityKey": 9000485,
      "attributeConsumerKey": 2312,
      "value": "Below",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9030649,
      "facilityKey": 9000485,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000493,
    "name": "101",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000493,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9027521,
      "facilityKey": 9000493,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9027523,
      "facilityKey": 9000493,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9030644,
      "facilityKey": 9000493,
      "attributeConsumerKey": 2302,
      "value": "Yes",
      "effectiveDate": new Date("2015-09-20T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000573,
    "name": "102",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000573,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9030697,
      "facilityKey": 9000573,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-02-23T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9030699,
      "facilityKey": 9000573,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-02-23T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9030703,
      "facilityKey": 9000573,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-02-23T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9030705,
      "facilityKey": 9000573,
      "attributeConsumerKey": 2306,
      "value": "ANY",
      "effectiveDate": new Date("2016-02-23T00:00:00"),
      "endDate": null,
      "name": "Gender"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000574,
    "name": "103",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000574,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9030706,
      "facilityKey": 9000574,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-02-23T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9030708,
      "facilityKey": 9000574,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-02-23T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9030712,
      "facilityKey": 9000574,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-02-23T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9030714,
      "facilityKey": 9000574,
      "attributeConsumerKey": 2306,
      "value": "ANY",
      "effectiveDate": new Date("2016-02-23T00:00:00"),
      "endDate": null,
      "name": "Gender"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000599,
    "name": "201",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000599,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031017,
      "facilityKey": 9000599,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031021,
      "facilityKey": 9000599,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032846,
      "facilityKey": 9000599,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000600,
    "name": "202",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000600,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031025,
      "facilityKey": 9000600,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031029,
      "facilityKey": 9000600,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032847,
      "facilityKey": 9000600,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000601,
    "name": "203",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000601,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031033,
      "facilityKey": 9000601,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031037,
      "facilityKey": 9000601,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032848,
      "facilityKey": 9000601,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000602,
    "name": "204",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000602,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031041,
      "facilityKey": 9000602,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031045,
      "facilityKey": 9000602,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032849,
      "facilityKey": 9000602,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000603,
    "name": "205",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000603,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031049,
      "facilityKey": 9000603,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031053,
      "facilityKey": 9000603,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032850,
      "facilityKey": 9000603,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000604,
    "name": "206",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000604,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031057,
      "facilityKey": 9000604,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031061,
      "facilityKey": 9000604,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9033053,
      "facilityKey": 9000604,
      "attributeConsumerKey": 2308,
      "value": "3",
      "effectiveDate": new Date("2017-05-16T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000605,
    "name": "207",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000605,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031065,
      "facilityKey": 9000605,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031069,
      "facilityKey": 9000605,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032852,
      "facilityKey": 9000605,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000606,
    "name": "208",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000606,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031073,
      "facilityKey": 9000606,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031077,
      "facilityKey": 9000606,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032853,
      "facilityKey": 9000606,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000607,
    "name": "209",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000607,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031081,
      "facilityKey": 9000607,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031085,
      "facilityKey": 9000607,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032854,
      "facilityKey": 9000607,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000608,
    "name": "210",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000608,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031089,
      "facilityKey": 9000608,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031093,
      "facilityKey": 9000608,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032855,
      "facilityKey": 9000608,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000609,
    "name": "211",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000609,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031097,
      "facilityKey": 9000609,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031101,
      "facilityKey": 9000609,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032856,
      "facilityKey": 9000609,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000610,
    "name": "212",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000610,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031105,
      "facilityKey": 9000610,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031109,
      "facilityKey": 9000610,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032857,
      "facilityKey": 9000610,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000611,
    "name": "213",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000611,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031113,
      "facilityKey": 9000611,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031117,
      "facilityKey": 9000611,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032858,
      "facilityKey": 9000611,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000612,
    "name": "214",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000612,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032859,
      "facilityKey": 9000612,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031121,
      "facilityKey": 9000612,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031125,
      "facilityKey": 9000612,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000613,
    "name": "215",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000613,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032860,
      "facilityKey": 9000613,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031129,
      "facilityKey": 9000613,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031133,
      "facilityKey": 9000613,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000614,
    "name": "216",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000614,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032861,
      "facilityKey": 9000614,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031137,
      "facilityKey": 9000614,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031141,
      "facilityKey": 9000614,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000615,
    "name": "217",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000615,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032862,
      "facilityKey": 9000615,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031145,
      "facilityKey": 9000615,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031149,
      "facilityKey": 9000615,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000616,
    "name": "218",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000616,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032863,
      "facilityKey": 9000616,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031153,
      "facilityKey": 9000616,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031157,
      "facilityKey": 9000616,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000617,
    "name": "219",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000617,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032864,
      "facilityKey": 9000617,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031161,
      "facilityKey": 9000617,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031165,
      "facilityKey": 9000617,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000618,
    "name": "220",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000618,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032865,
      "facilityKey": 9000618,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031169,
      "facilityKey": 9000618,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031173,
      "facilityKey": 9000618,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000619,
    "name": "221",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000619,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032866,
      "facilityKey": 9000619,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031177,
      "facilityKey": 9000619,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031181,
      "facilityKey": 9000619,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000620,
    "name": "222",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000620,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032867,
      "facilityKey": 9000620,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031185,
      "facilityKey": 9000620,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031189,
      "facilityKey": 9000620,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000621,
    "name": "223",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000621,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032868,
      "facilityKey": 9000621,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031193,
      "facilityKey": 9000621,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031197,
      "facilityKey": 9000621,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000622,
    "name": "224",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000622,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9032869,
      "facilityKey": 9000622,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9031201,
      "facilityKey": 9000622,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031205,
      "facilityKey": 9000622,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000623,
    "name": "225",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000623,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031209,
      "facilityKey": 9000623,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031213,
      "facilityKey": 9000623,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032870,
      "facilityKey": 9000623,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000624,
    "name": "226",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000624,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031217,
      "facilityKey": 9000624,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031221,
      "facilityKey": 9000624,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032871,
      "facilityKey": 9000624,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000654,
    "name": "256",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000654,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031457,
      "facilityKey": 9000654,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031461,
      "facilityKey": 9000654,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032901,
      "facilityKey": 9000654,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000655,
    "name": "257",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000655,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031465,
      "facilityKey": 9000655,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031469,
      "facilityKey": 9000655,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032902,
      "facilityKey": 9000655,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000656,
    "name": "258",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000656,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031473,
      "facilityKey": 9000656,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031477,
      "facilityKey": 9000656,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032903,
      "facilityKey": 9000656,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000657,
    "name": "259",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000657,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031481,
      "facilityKey": 9000657,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031485,
      "facilityKey": 9000657,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032904,
      "facilityKey": 9000657,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000658,
    "name": "260",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000658,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031489,
      "facilityKey": 9000658,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031493,
      "facilityKey": 9000658,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032905,
      "facilityKey": 9000658,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000659,
    "name": "261",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000659,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031497,
      "facilityKey": 9000659,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031501,
      "facilityKey": 9000659,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032906,
      "facilityKey": 9000659,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000660,
    "name": "262",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000660,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031505,
      "facilityKey": 9000660,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031509,
      "facilityKey": 9000660,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032907,
      "facilityKey": 9000660,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000661,
    "name": "263",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000661,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031513,
      "facilityKey": 9000661,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031517,
      "facilityKey": 9000661,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032908,
      "facilityKey": 9000661,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000662,
    "name": "264",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000662,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031521,
      "facilityKey": 9000662,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031525,
      "facilityKey": 9000662,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032909,
      "facilityKey": 9000662,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000663,
    "name": "265",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000663,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031529,
      "facilityKey": 9000663,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031533,
      "facilityKey": 9000663,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032910,
      "facilityKey": 9000663,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000664,
    "name": "266",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000664,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031537,
      "facilityKey": 9000664,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031541,
      "facilityKey": 9000664,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032911,
      "facilityKey": 9000664,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000665,
    "name": "267",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000665,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031545,
      "facilityKey": 9000665,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031549,
      "facilityKey": 9000665,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032912,
      "facilityKey": 9000665,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000666,
    "name": "268",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000666,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031553,
      "facilityKey": 9000666,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031557,
      "facilityKey": 9000666,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032913,
      "facilityKey": 9000666,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000667,
    "name": "269",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000667,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031561,
      "facilityKey": 9000667,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031565,
      "facilityKey": 9000667,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032914,
      "facilityKey": 9000667,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000668,
    "name": "270",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000668,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031569,
      "facilityKey": 9000668,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031573,
      "facilityKey": 9000668,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032915,
      "facilityKey": 9000668,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000669,

    "name": "271",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000669,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031577,
      "facilityKey": 9000669,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031581,
      "facilityKey": 9000669,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032916,
      "facilityKey": 9000669,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000670,
    "name": "272",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000670,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031585,
      "facilityKey": 9000670,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031589,
      "facilityKey": 9000670,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032917,
      "facilityKey": 9000670,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000671,
    "name": "273",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000671,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031593,
      "facilityKey": 9000671,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031597,
      "facilityKey": 9000671,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032918,
      "facilityKey": 9000671,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000672,
    "name": "274",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000672,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031601,
      "facilityKey": 9000672,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031605,
      "facilityKey": 9000672,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032919,
      "facilityKey": 9000672,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000673,
    "name": "275",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000673,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031609,
      "facilityKey": 9000673,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031613,
      "facilityKey": 9000673,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032920,
      "facilityKey": 9000673,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000674,
    "name": "276",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000674,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031617,
      "facilityKey": 9000674,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031621,
      "facilityKey": 9000674,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032921,
      "facilityKey": 9000674,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000675,
    "name": "277",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000675,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031625,
      "facilityKey": 9000675,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031629,
      "facilityKey": 9000675,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032922,
      "facilityKey": 9000675,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000676,
    "name": "278",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000676,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031633,
      "facilityKey": 9000676,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031637,
      "facilityKey": 9000676,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032923,
      "facilityKey": 9000676,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000677,
    "name": "279",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000677,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031641,
      "facilityKey": 9000677,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031645,
      "facilityKey": 9000677,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032924,
      "facilityKey": 9000677,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000678,
    "name": "280",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000678,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031649,
      "facilityKey": 9000678,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031653,
      "facilityKey": 9000678,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032925,
      "facilityKey": 9000678,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000679,
    "name": "281",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000679,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031657,
      "facilityKey": 9000679,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031661,
      "facilityKey": 9000679,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032926,
      "facilityKey": 9000679,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000680,
    "name": "282",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000680,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031665,
      "facilityKey": 9000680,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031669,
      "facilityKey": 9000680,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032927,
      "facilityKey": 9000680,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000681,
    "name": "283",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000681,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031673,
      "facilityKey": 9000681,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031677,
      "facilityKey": 9000681,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032928,
      "facilityKey": 9000681,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000682,
    "name": "284",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000682,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031681,
      "facilityKey": 9000682,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031685,
      "facilityKey": 9000682,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032929,
      "facilityKey": 9000682,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000683,
    "name": "285",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000683,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031689,
      "facilityKey": 9000683,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031693,
      "facilityKey": 9000683,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032930,
      "facilityKey": 9000683,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000684,
    "name": "286",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000684,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031697,
      "facilityKey": 9000684,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031701,
      "facilityKey": 9000684,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032931,
      "facilityKey": 9000684,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000685,
    "name": "287",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000685,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031705,
      "facilityKey": 9000685,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031709,
      "facilityKey": 9000685,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032932,
      "facilityKey": 9000685,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000686,
    "name": "288",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000686,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031713,
      "facilityKey": 9000686,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031717,
      "facilityKey": 9000686,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032933,
      "facilityKey": 9000686,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000687,
    "name": "289",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000687,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031721,
      "facilityKey": 9000687,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031725,
      "facilityKey": 9000687,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032934,
      "facilityKey": 9000687,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000688,
    "name": "290",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000688,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031729,
      "facilityKey": 9000688,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031733,
      "facilityKey": 9000688,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032935,
      "facilityKey": 9000688,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000689,
    "name": "291",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000689,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031737,
      "facilityKey": 9000689,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031741,
      "facilityKey": 9000689,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032936,
      "facilityKey": 9000689,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000690,

    "name": "292",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000690,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031745,
      "facilityKey": 9000690,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031749,
      "facilityKey": 9000690,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032937,
      "facilityKey": 9000690,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000691,
    "name": "293",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000691,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031753,
      "facilityKey": 9000691,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031757,
      "facilityKey": 9000691,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032938,
      "facilityKey": 9000691,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000692,
    "name": "294",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000692,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031761,
      "facilityKey": 9000692,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031765,
      "facilityKey": 9000692,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032939,
      "facilityKey": 9000692,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000693,
    "name": "295",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000693,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031769,
      "facilityKey": 9000693,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031773,
      "facilityKey": 9000693,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032940,
      "facilityKey": 9000693,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000694,
    "name": "296",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000694,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031777,
      "facilityKey": 9000694,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031781,
      "facilityKey": 9000694,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032941,
      "facilityKey": 9000694,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000695,
    "name": "297",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000695,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031785,
      "facilityKey": 9000695,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031789,
      "facilityKey": 9000695,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032942,
      "facilityKey": 9000695,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000696,
    "name": "298",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000696,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031793,
      "facilityKey": 9000696,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031797,
      "facilityKey": 9000696,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032943,
      "facilityKey": 9000696,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000326,
    "name": "208",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000326,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025043,
      "facilityKey": 9000326,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025045,
      "facilityKey": 9000326,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025048,
      "facilityKey": 9000326,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000322,
    "name": "203",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000322,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9024995,
      "facilityKey": 9000322,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025000,
      "facilityKey": 9000322,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9033013,
      "facilityKey": 9000322,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2017-02-08T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000330,
    "name": "213",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000330,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025091,
      "facilityKey": 9000330,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025093,
      "facilityKey": 9000330,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025096,
      "facilityKey": 9000330,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000625,
    "name": "227",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000625,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031225,
      "facilityKey": 9000625,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031229,
      "facilityKey": 9000625,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032872,
      "facilityKey": 9000625,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000316,
    "name": "Anderson Hall",
    "isTopLevel": true,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000316,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9024933,
      "facilityKey": 9000316,
      "attributeConsumerKey": 2312,
      "value": "Below",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9024937,
      "facilityKey": 9000316,
      "attributeConsumerKey": 2308,
      "value": "0",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9024940,
      "facilityKey": 9000316,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000626,
    "name": "228",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000626,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031233,
      "facilityKey": 9000626,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031237,
      "facilityKey": 9000626,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032873,
      "facilityKey": 9000626,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000627,
    "name": "229",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000627,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031241,
      "facilityKey": 9000627,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031245,
      "facilityKey": 9000627,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032874,
      "facilityKey": 9000627,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000628,
    "name": "230",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000628,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031249,
      "facilityKey": 9000628,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031253,
      "facilityKey": 9000628,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032875,
      "facilityKey": 9000628,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000629,
    "name": "231",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000629,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031257,
      "facilityKey": 9000629,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031261,
      "facilityKey": 9000629,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032876,
      "facilityKey": 9000629,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000630,

    "name": "232",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000630,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031265,
      "facilityKey": 9000630,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031269,
      "facilityKey": 9000630,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032877,
      "facilityKey": 9000630,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000631,
    "name": "233",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000631,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031273,
      "facilityKey": 9000631,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031277,
      "facilityKey": 9000631,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032878,
      "facilityKey": 9000631,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000327,
    "name": "209",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000327,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025055,
      "facilityKey": 9000327,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025057,
      "facilityKey": 9000327,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025060,
      "facilityKey": 9000327,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000328,
    "name": "210",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000328,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025067,
      "facilityKey": 9000328,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025069,
      "facilityKey": 9000328,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025072,
      "facilityKey": 9000328,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000329,
    "name": "212",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000329,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025079,
      "facilityKey": 9000329,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025081,
      "facilityKey": 9000329,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025084,
      "facilityKey": 9000329,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000331,
    "name": "214",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000331,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025103,
      "facilityKey": 9000331,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025105,
      "facilityKey": 9000331,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025108,
      "facilityKey": 9000331,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000332,
    "name": "215",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000332,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025115,
      "facilityKey": 9000332,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025117,
      "facilityKey": 9000332,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025120,
      "facilityKey": 9000332,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000333,
    "name": "217",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000333,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025127,
      "facilityKey": 9000333,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025129,
      "facilityKey": 9000333,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025132,
      "facilityKey": 9000333,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9030343,
      "facilityKey": 9000333,
      "attributeConsumerKey": 2306,
      "value": "Female",
      "effectiveDate": new Date("2015-06-03T00:00:00"),
      "endDate": null,
      "name": "Gender"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000334,
    "name": "218",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000334,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025139,
      "facilityKey": 9000334,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025141,
      "facilityKey": 9000334,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025144,
      "facilityKey": 9000334,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9030342,
      "facilityKey": 9000334,
      "attributeConsumerKey": 2306,
      "value": "Female",
      "effectiveDate": new Date("2015-06-03T00:00:00"),
      "endDate": null,
      "name": "Gender"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000335,

    "name": "219",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000335,
      "attributeConsumerKey": 2317,
      "value": "2",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025151,
      "facilityKey": 9000335,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025153,
      "facilityKey": 9000335,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025156,
      "facilityKey": 9000335,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000336,

    "name": "352-354",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000336,
      "attributeConsumerKey": 2317,
      "value": "6",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025162,
      "facilityKey": 9000336,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025163,
      "facilityKey": 9000336,
      "attributeConsumerKey": 2308,
      "value": "4",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025166,
      "facilityKey": 9000336,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000338,
    "name": "356",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000338,
      "attributeConsumerKey": 2317,
      "value": "3",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025180,
      "facilityKey": 9000338,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025182,
      "facilityKey": 9000338,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025185,
      "facilityKey": 9000338,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000339,
    "name": "358",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000339,
      "attributeConsumerKey": 2317,
      "value": "3",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025192,
      "facilityKey": 9000339,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025194,
      "facilityKey": 9000339,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025197,
      "facilityKey": 9000339,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000340,
    "name": "360-362",
    "isTopLevel": false,
    "topLevelKey": 9000485,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000340,
      "attributeConsumerKey": 2317,
      "value": "6",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9025203,
      "facilityKey": 9000340,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9025205,
      "facilityKey": 9000340,
      "attributeConsumerKey": 2308,
      "value": "4",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }, {
      "facilityAttributeKey": 9025208,
      "facilityKey": 9000340,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2010-01-01T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000632,
    "name": "234",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000632,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031281,
      "facilityKey": 9000632,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031285,
      "facilityKey": 9000632,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032879,
      "facilityKey": 9000632,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000633,
    "name": "235",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000633,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031289,
      "facilityKey": 9000633,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031293,
      "facilityKey": 9000633,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032880,
      "facilityKey": 9000633,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000634,
    "name": "236",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000634,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031297,
      "facilityKey": 9000634,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031301,
      "facilityKey": 9000634,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032881,
      "facilityKey": 9000634,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000635,
    "name": "237",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000635,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031305,
      "facilityKey": 9000635,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031309,
      "facilityKey": 9000635,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032882,
      "facilityKey": 9000635,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000636,
    "name": "238",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000636,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031313,
      "facilityKey": 9000636,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031317,
      "facilityKey": 9000636,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032883,
      "facilityKey": 9000636,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000637,
    "name": "239",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000637,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031321,
      "facilityKey": 9000637,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031325,
      "facilityKey": 9000637,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032884,
      "facilityKey": 9000637,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000638,
    "name": "240",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000638,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031329,
      "facilityKey": 9000638,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031333,
      "facilityKey": 9000638,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032885,
      "facilityKey": 9000638,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000639,
    "name": "241",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000639,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031337,
      "facilityKey": 9000639,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031341,
      "facilityKey": 9000639,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032886,
      "facilityKey": 9000639,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000640,
    "name": "242",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000640,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031345,
      "facilityKey": 9000640,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031349,
      "facilityKey": 9000640,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032887,
      "facilityKey": 9000640,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000641,
    "name": "243",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000641,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031353,
      "facilityKey": 9000641,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031357,
      "facilityKey": 9000641,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032888,
      "facilityKey": 9000641,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000642,
    "name": "244",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000642,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031361,
      "facilityKey": 9000642,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031365,
      "facilityKey": 9000642,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032889,
      "facilityKey": 9000642,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000643,
    "name": "245",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000643,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031369,
      "facilityKey": 9000643,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031373,
      "facilityKey": 9000643,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032890,
      "facilityKey": 9000643,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000644,
    "name": "246",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000644,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031377,
      "facilityKey": 9000644,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031381,
      "facilityKey": 9000644,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032891,
      "facilityKey": 9000644,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000645,
    "name": "247",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000645,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031385,
      "facilityKey": 9000645,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031389,
      "facilityKey": 9000645,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032892,
      "facilityKey": 9000645,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000646,
    "name": "248",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000646,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031393,
      "facilityKey": 9000646,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031397,
      "facilityKey": 9000646,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032893,
      "facilityKey": 9000646,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000647,
    "name": "249",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000647,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031401,
      "facilityKey": 9000647,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031405,
      "facilityKey": 9000647,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032894,
      "facilityKey": 9000647,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000648,
    "name": "250",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000648,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031409,
      "facilityKey": 9000648,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031413,
      "facilityKey": 9000648,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032895,
      "facilityKey": 9000648,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000649,
    "name": "251",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000649,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031417,
      "facilityKey": 9000649,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031421,
      "facilityKey": 9000649,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032896,
      "facilityKey": 9000649,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000650,
    "name": "252",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000650,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031425,
      "facilityKey": 9000650,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031429,
      "facilityKey": 9000650,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032897,
      "facilityKey": 9000650,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000651,
    "name": "253",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000651,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031433,
      "facilityKey": 9000651,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031437,
      "facilityKey": 9000651,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032898,
      "facilityKey": 9000651,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000652,
    "name": "254",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000652,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031441,
      "facilityKey": 9000652,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031445,
      "facilityKey": 9000652,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032899,
      "facilityKey": 9000652,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }, {
    "facilityKey": 9000653,
    "name": "255",
    "isTopLevel": false,
    "topLevelKey": 9000316,
    "attributes": [{
      "facilityAttributeKey": 0,
      "facilityKey": 9000653,
      "attributeConsumerKey": 2317,
      "value": "0",
      "effectiveDate": new Date("0001-01-01T00:00:00"),
      "endDate": null,
      "name": "Max Legal Occupancy"
    }, {
      "facilityAttributeKey": 9031449,
      "facilityKey": 9000653,
      "attributeConsumerKey": 2312,
      "value": "This",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Level"
    }, {
      "facilityAttributeKey": 9031453,
      "facilityKey": 9000653,
      "attributeConsumerKey": 2302,
      "value": "No",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Smoking"
    }, {
      "facilityAttributeKey": 9032900,
      "facilityKey": 9000653,
      "attributeConsumerKey": 2308,
      "value": "2",
      "effectiveDate": new Date("2016-10-14T00:00:00"),
      "endDate": null,
      "name": "Assignment_Limit"
    }],
    "occupantKeys": null
  }
   ]
}
