import { FacilityDetails, FacilityDetailsToFacilityMapper } from '@sections/housing/facilities/facilities.model';

export function generateFacilities(): any[] {
  const facilities = createFacilities();
  const facilityMapper = new FacilityDetailsToFacilityMapper();
  return facilityMapper.map(facilities);
}

function createFacilities(): FacilityDetails[] {
  return [
    {
      "facilityKey": 9000598,
      "assetTypeKey": 0,
      "name": "200",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031009,
          "facilityKey": 9000598,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date(2016-10-14),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9033110,
          "facilityKey": 9000598,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2017-07-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032097,
          "facilityKey": 9000598,
          "attributeConsumerKey": 2306,
          "value": "Male",
          "effectiveDate": new Date("2016-12-01T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000485,
      "assetTypeKey": 0,
      "name": "Able",
      "isTopLevel": true,
      "topLevelKey": 9000485,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9028000,
          "facilityKey": 9000485,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2010-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9027451,
          "facilityKey": 9000485,
          "attributeConsumerKey": 2312,
          "value": "Below",
          "effectiveDate": new Date("2010-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9029690,
          "facilityKey": 9000485,
          "attributeConsumerKey": 2020098,
          "value": "Shared Bathroom",
          "effectiveDate": new Date("2014-03-31T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000487,
      "assetTypeKey": 0,
      "name": "Charles",
      "isTopLevel": true,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9028002,
          "facilityKey": 9000487,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2010-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9029692,
          "facilityKey": 9000487,
          "attributeConsumerKey": 2020098,
          "value": "Shared Bathroom",
          "effectiveDate": new Date("2014-03-31T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9027467,
          "facilityKey": 9000487,
          "attributeConsumerKey": 2312,
          "value": "Below",
          "effectiveDate": new Date("2010-01-01T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000493,
      "assetTypeKey": 0,
        "name": "101",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9027521,
          "facilityKey": 9000493,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2010-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9027523,
          "facilityKey": 9000493,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2010-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9029698,
          "facilityKey": 9000493,
          "attributeConsumerKey": 2020098,
          "value": "Shared Bathroom",
          "effectiveDate": new Date("2014-03-31T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000495,
      "assetTypeKey": 0,
      "name": "301",
      "isTopLevel": false,
      "topLevelKey": 9000485,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9027545,
          "facilityKey": 9000495,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2010-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9027547,
          "facilityKey": 9000495,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2010-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9029700,
          "facilityKey": 9000495,
          "attributeConsumerKey": 2020098,
          "value": "Shared Bathroom",
          "effectiveDate": new Date("2014-03-31T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000554,
      "assetTypeKey": 0,
      "name": "Alumni Hall",
      "isTopLevel": true,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030402,
          "facilityKey": 9000554,
          "attributeConsumerKey": 2312,
          "value": "Below",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030406,
          "facilityKey": 9000554,
          "attributeConsumerKey": 2308,
          "value": "0",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000556,
      "assetTypeKey": 0,
      "name": "204",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030424,
          "facilityKey": 9000556,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030426,
          "facilityKey": 9000556,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000557,
      "assetTypeKey": 0,
      "name": "205",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030437,
          "facilityKey": 9000557,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030439,
          "facilityKey": 9000557,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000559,
      "assetTypeKey": 0,
      "name": "206",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030456,
          "facilityKey": 9000559,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030458,
          "facilityKey": 9000559,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000562,
      "assetTypeKey": 0,
      "name": "204",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030480,
          "facilityKey": 9000562,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030481,
          "facilityKey": 9000562,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000563,
      "assetTypeKey": 0,
      "name": "205",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030491,
          "facilityKey": 9000563,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030492,
          "facilityKey": 9000563,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000564,
      "assetTypeKey": 0,
      "name": "206",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030502,
          "facilityKey": 9000564,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030503,
          "facilityKey": 9000564,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000570,
      "assetTypeKey": 0,
      "name": "East Lounge",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030564,
          "facilityKey": 9000570,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030566,
          "facilityKey": 9000570,
          "attributeConsumerKey": 2308,
          "value": "4",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000568,
      "assetTypeKey": 0,
      "name": "204",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030532,
          "facilityKey": 9000568,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030533,
          "facilityKey": 9000568,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000569,
      "assetTypeKey": 0,
      "name": "205",
      "isTopLevel": false,
      "topLevelKey": 9000554,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030543,
          "facilityKey": 9000569,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030544,
          "facilityKey": 9000569,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2015-10-22T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000573,
      "assetTypeKey": 0,
      "name": "102",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030697,
          "facilityKey": 9000573,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-02-23T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030699,
          "facilityKey": 9000573,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-02-23T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030705,
          "facilityKey": 9000573,
          "attributeConsumerKey": 2306,
          "value": "ANY",
          "effectiveDate": new Date("2016-02-23T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000574,
      "assetTypeKey": 0,
      "name": "103",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030706,
          "facilityKey": 9000574,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-02-23T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030708,
          "facilityKey": 9000574,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-02-23T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030714,
          "facilityKey": 9000574,
          "attributeConsumerKey": 2306,
          "value": "ANY",
          "effectiveDate": new Date("2016-02-23T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000594,
      "assetTypeKey": 0,
      "name": "1 BR Apt 1",
      "isTopLevel": false,
      "topLevelKey": 9000485,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030956,
          "facilityKey": 9000594,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030962,
          "facilityKey": 9000594,
          "attributeConsumerKey": 2306,
          "value": "ANY",
          "effectiveDate": new Date("2016-01-01T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000595,
      "assetTypeKey": 0,
      "name": "1 BR Apt 2",
      "isTopLevel": false,
      "topLevelKey": 9000485,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9030965,
          "facilityKey": 9000595,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9033411,
          "facilityKey": 9000595,
          "attributeConsumerKey": 2308,
          "value": "1",
          "effectiveDate": new Date("2016-01-01T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000596,
      "assetTypeKey": 0,
      "name": "1 BR Apt 3",
      "isTopLevel": false,
      "topLevelKey": 9000485,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9033432,
          "facilityKey": 9000596,
          "attributeConsumerKey": 2308,
          "value": "1",
          "effectiveDate": new Date("2016-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030974,
          "facilityKey": 9000596,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-01-01T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9030980,
          "facilityKey": 9000596,
          "attributeConsumerKey": 2306,
          "value": "ANY",
          "effectiveDate": new Date("2016-01-01T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000599,
      "assetTypeKey": 0,
      "name": "201",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031017,
          "facilityKey": 9000599,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032846,
          "facilityKey": 9000599,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000600,
      "assetTypeKey": 0,
      "name": "202",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031025,
          "facilityKey": 9000600,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032847,
          "facilityKey": 9000600,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000601,
      "assetTypeKey": 0,
      "name": "203",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031033,
          "facilityKey": 9000601,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032848,
          "facilityKey": 9000601,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000602,
      "assetTypeKey": 0,
      "name": "204",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031041,
          "facilityKey": 9000602,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032849,
          "facilityKey": 9000602,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000603,
      "assetTypeKey": 0,
      "name": "205",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031049,
          "facilityKey": 9000603,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032850,
          "facilityKey": 9000603,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000604,
      "assetTypeKey": 0,
      "name": "206",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031057,
          "facilityKey": 9000604,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9033053,
          "facilityKey": 9000604,
          "attributeConsumerKey": 2308,
          "value": "3",
          "effectiveDate": new Date("2017-05-16T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000605,
      "assetTypeKey": 0,
      "name": "207",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031065,
          "facilityKey": 9000605,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032852,
          "facilityKey": 9000605,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000606,
      "assetTypeKey": 0,
      "name": "208",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031073,
          "facilityKey": 9000606,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032853,
          "facilityKey": 9000606,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000607,
      "assetTypeKey": 0,
      "name": "209",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031081,
          "facilityKey": 9000607,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032854,
          "facilityKey": 9000607,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000608,
      "assetTypeKey": 0,
      "name": "210",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031089,
          "facilityKey": 9000608,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032855,
          "facilityKey": 9000608,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000609,
      "assetTypeKey": 0,
      "name": "211",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031097,
          "facilityKey": 9000609,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032856,
          "facilityKey": 9000609,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000610,
      "assetTypeKey": 0,
      "name": "212",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031105,
          "facilityKey": 9000610,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032857,
          "facilityKey": 9000610,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000611,
      "assetTypeKey": 0,
      "name": "213",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031113,
          "facilityKey": 9000611,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032858,
          "facilityKey": 9000611,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000612,
      "assetTypeKey": 0,
      "name": "214",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032859,
          "facilityKey": 9000612,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031121,
          "facilityKey": 9000612,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000613,
      "assetTypeKey": 0,
      "name": "215",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032860,
          "facilityKey": 9000613,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031129,
          "facilityKey": 9000613,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000614,
      "assetTypeKey": 0,
      "name": "216",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032861,
          "facilityKey": 9000614,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031137,
          "facilityKey": 9000614,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000615,
      "assetTypeKey": 0,
      "name": "217",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032862,
          "facilityKey": 9000615,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031145,
          "facilityKey": 9000615,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000616,
      "assetTypeKey": 0,
      "name": "218",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032863,
          "facilityKey": 9000616,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031153,
          "facilityKey": 9000616,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000617,
      "assetTypeKey": 0,
      "name": "219",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032864,
          "facilityKey": 9000617,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031161,
          "facilityKey": 9000617,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000618,
      "assetTypeKey": 0,
      "name": "220",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032865,
          "facilityKey": 9000618,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031169,
          "facilityKey": 9000618,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000619,
      "assetTypeKey": 0,
      "name": "221",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032866,
          "facilityKey": 9000619,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031177,
          "facilityKey": 9000619,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000620,
      "assetTypeKey": 0,
      "name": "222",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032867,
          "facilityKey": 9000620,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031185,
          "facilityKey": 9000620,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000621,
      "assetTypeKey": 0,
      "name": "223",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032868,
          "facilityKey": 9000621,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031193,
          "facilityKey": 9000621,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000622,
      "assetTypeKey": 0,
      "name": "224",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9032869,
          "facilityKey": 9000622,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9031201,
          "facilityKey": 9000622,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000623,
      "assetTypeKey": 0,
      "name": "225",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031209,
          "facilityKey": 9000623,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032870,
          "facilityKey": 9000623,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000624,
      "assetTypeKey": 0,
      "name": "226",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031217,
          "facilityKey": 9000624,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032871,
          "facilityKey": 9000624,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000654,
      "assetTypeKey": 0,
      "name": "256",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031457,
          "facilityKey": 9000654,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032901,
          "facilityKey": 9000654,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000655,
      "assetTypeKey": 0,
      "name": "257",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031465,
          "facilityKey": 9000655,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032902,
          "facilityKey": 9000655,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000656,
      "assetTypeKey": 0,
      "name": "258",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031473,
          "facilityKey": 9000656,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032903,
          "facilityKey": 9000656,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000657,
      "assetTypeKey": 0,
      "name": "259",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031481,
          "facilityKey": 9000657,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032904,
          "facilityKey": 9000657,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000658,
      "assetTypeKey": 0,
      "name": "260",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031489,
          "facilityKey": 9000658,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032905,
          "facilityKey": 9000658,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000659,
      "assetTypeKey": 0,
      "name": "261",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031497,
          "facilityKey": 9000659,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032906,
          "facilityKey": 9000659,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000660,
      "assetTypeKey": 0,
      "name": "262",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031505,
          "facilityKey": 9000660,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032907,
          "facilityKey": 9000660,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000661,
      "assetTypeKey": 0,
      "name": "263",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031513,
          "facilityKey": 9000661,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032908,
          "facilityKey": 9000661,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000662,
      "assetTypeKey": 0,
      "name": "264",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031521,
          "facilityKey": 9000662,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032909,
          "facilityKey": 9000662,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000663,
      "assetTypeKey": 0,
      "name": "265",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031529,
          "facilityKey": 9000663,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032910,
          "facilityKey": 9000663,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000664,
      "assetTypeKey": 0,
      "name": "266",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031537,
          "facilityKey": 9000664,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032911,
          "facilityKey": 9000664,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000665,
      "assetTypeKey": 0,
      "name": "267",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031545,
          "facilityKey": 9000665,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032912,
          "facilityKey": 9000665,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000666,
      "assetTypeKey": 0,
      "name": "268",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031553,
          "facilityKey": 9000666,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032913,
          "facilityKey": 9000666,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000667,
      "assetTypeKey": 0,
      "name": "269",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031561,
          "facilityKey": 9000667,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032914,
          "facilityKey": 9000667,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000668,
      "assetTypeKey": 0,
      "name": "270",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031569,
          "facilityKey": 9000668,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032915,
          "facilityKey": 9000668,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000669,
      "assetTypeKey": 0,
      "name": "271",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031577,
          "facilityKey": 9000669,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032916,
          "facilityKey": 9000669,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000670,
      "assetTypeKey": 0,
      "name": "272",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031585,
          "facilityKey": 9000670,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032917,
          "facilityKey": 9000670,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000671,
      "assetTypeKey": 0,
      "name": "273",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031593,
          "facilityKey": 9000671,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032918,
          "facilityKey": 9000671,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000672,
      "assetTypeKey": 0,
      "name": "274",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031601,
          "facilityKey": 9000672,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032919,
          "facilityKey": 9000672,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000673,
      "assetTypeKey": 0,
      "name": "275",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031609,
          "facilityKey": 9000673,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032920,
          "facilityKey": 9000673,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000674,
      "assetTypeKey": 0,
      "name": "276",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031617,
          "facilityKey": 9000674,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032921,
          "facilityKey": 9000674,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000675,
      "assetTypeKey": 0,
      "name": "277",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031625,
          "facilityKey": 9000675,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032922,
          "facilityKey": 9000675,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000676,
      "assetTypeKey": 0,
      "name": "278",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031633,
          "facilityKey": 9000676,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032923,
          "facilityKey": 9000676,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000677,
      "assetTypeKey": 0,
      "name": "279",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031641,
          "facilityKey": 9000677,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032924,
          "facilityKey": 9000677,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000678,
      "assetTypeKey": 0,
      "name": "280",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031649,
          "facilityKey": 9000678,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032925,
          "facilityKey": 9000678,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000679,
      "assetTypeKey": 0,
      "name": "281",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031657,
          "facilityKey": 9000679,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032926,
          "facilityKey": 9000679,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000680,
      "assetTypeKey": 0,
      "name": "282",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031665,
          "facilityKey": 9000680,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032927,
          "facilityKey": 9000680,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000681,
      "assetTypeKey": 0,
      "name": "283",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031673,
          "facilityKey": 9000681,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032928,
          "facilityKey": 9000681,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000682,
      "assetTypeKey": 0,
      "name": "284",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031681,
          "facilityKey": 9000682,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032929,
          "facilityKey": 9000682,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000683,
      "assetTypeKey": 0,
      "name": "285",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031689,
          "facilityKey": 9000683,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032930,
          "facilityKey": 9000683,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000684,
      "assetTypeKey": 0,
      "name": "286",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031697,
          "facilityKey": 9000684,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032931,
          "facilityKey": 9000684,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000685,
      "assetTypeKey": 0,
      "name": "287",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031705,
          "facilityKey": 9000685,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032932,
          "facilityKey": 9000685,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000686,
      "assetTypeKey": 0,
      "name": "288",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031713,
          "facilityKey": 9000686,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032933,
          "facilityKey": 9000686,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000687,
      "assetTypeKey": 0,
      "name": "289",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031721,
          "facilityKey": 9000687,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032934,
          "facilityKey": 9000687,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000688,
      "assetTypeKey": 0,
      "name": "290",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031729,
          "facilityKey": 9000688,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032935,
          "facilityKey": 9000688,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000689,
      "assetTypeKey": 0,
      "name": "291",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031737,
          "facilityKey": 9000689,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032936,
          "facilityKey": 9000689,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000690,
      "assetTypeKey": 0,
      "name": "292",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031745,
          "facilityKey": 9000690,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032937,
          "facilityKey": 9000690,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000691,
      "assetTypeKey": 0,
      "name": "293",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031753,
          "facilityKey": 9000691,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032938,
          "facilityKey": 9000691,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000692,
      "assetTypeKey": 0,
      "name": "294",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031761,
          "facilityKey": 9000692,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032939,
          "facilityKey": 9000692,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000693,
      "assetTypeKey": 0,
      "name": "295",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031769,
          "facilityKey": 9000693,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032940,
          "facilityKey": 9000693,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000694,
      "assetTypeKey": 0,
      "name": "296",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031777,
          "facilityKey": 9000694,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032941,
          "facilityKey": 9000694,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000695,
      "assetTypeKey": 0,
      "name": "297",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031785,
          "facilityKey": 9000695,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032942,
          "facilityKey": 9000695,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000696,
      "assetTypeKey": 0,
      "name": "298",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031793,
          "facilityKey": 9000696,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032943,
          "facilityKey": 9000696,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000625,
      "assetTypeKey": 0,
      "name": "227",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031225,
          "facilityKey": 9000625,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032872,
          "facilityKey": 9000625,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000626,
      "assetTypeKey": 0,
      "name": "228",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031233,
          "facilityKey": 9000626,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032873,
          "facilityKey": 9000626,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000627,
      "assetTypeKey": 0,
      "name": "229",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031241,
          "facilityKey": 9000627,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032874,
          "facilityKey": 9000627,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000628,
      "assetTypeKey": 0,
      "name": "230",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031249,
          "facilityKey": 9000628,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032875,
          "facilityKey": 9000628,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000629,
      "assetTypeKey": 0,
      "name": "231",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031257,
          "facilityKey": 9000629,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032876,
          "facilityKey": 9000629,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000630,
      "assetTypeKey": 0,
      "name": "232",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031265,
          "facilityKey": 9000630,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032877,
          "facilityKey": 9000630,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000631,
      "assetTypeKey": 0,
      "name": "233",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031273,
          "facilityKey": 9000631,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032878,
          "facilityKey": 9000631,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000632,
      "assetTypeKey": 0,
      "name": "234",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031281,
          "facilityKey": 9000632,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032879,
          "facilityKey": 9000632,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000633,
      "assetTypeKey": 0,
      "name": "235",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031289,
          "facilityKey": 9000633,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032880,
          "facilityKey": 9000633,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000634,
      "assetTypeKey": 0,
      "name": "236",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031297,
          "facilityKey": 9000634,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032881,
          "facilityKey": 9000634,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000635,
      "assetTypeKey": 0,
      "name": "237",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031305,
          "facilityKey": 9000635,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032882,
          "facilityKey": 9000635,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000636,
      "assetTypeKey": 0,
      "name": "238",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031313,
          "facilityKey": 9000636,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032883,
          "facilityKey": 9000636,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000637,
      "assetTypeKey": 0,
      "name": "239",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031321,
          "facilityKey": 9000637,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032884,
          "facilityKey": 9000637,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000638,
      "assetTypeKey": 0,
      "name": "240",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031329,
          "facilityKey": 9000638,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032885,
          "facilityKey": 9000638,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000639,
      "assetTypeKey": 0,
      "name": "241",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031337,
          "facilityKey": 9000639,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032886,
          "facilityKey": 9000639,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000640,
      "assetTypeKey": 0,
      "name": "242",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031345,
          "facilityKey": 9000640,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032887,
          "facilityKey": 9000640,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000641,
      "assetTypeKey": 0,
      "name": "243",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031353,
          "facilityKey": 9000641,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032888,
          "facilityKey": 9000641,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000642,
      "assetTypeKey": 0,
      "name": "244",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031361,
          "facilityKey": 9000642,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032889,
          "facilityKey": 9000642,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000643,
      "assetTypeKey": 0,
      "name": "245",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031369,
          "facilityKey": 9000643,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032890,
          "facilityKey": 9000643,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000644,
      "assetTypeKey": 0,
      "name": "246",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031377,
          "facilityKey": 9000644,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032891,
          "facilityKey": 9000644,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000645,
      "assetTypeKey": 0,
      "name": "247",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031385,
          "facilityKey": 9000645,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032892,
          "facilityKey": 9000645,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000646,
      "assetTypeKey": 0,
      "name": "248",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031393,
          "facilityKey": 9000646,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032893,
          "facilityKey": 9000646,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000647,
      "assetTypeKey": 0,
      "name": "249",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031401,
          "facilityKey": 9000647,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032894,
          "facilityKey": 9000647,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000648,
      "assetTypeKey": 0,
      "name": "250",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031409,
          "facilityKey": 9000648,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032895,
          "facilityKey": 9000648,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000649,
      "assetTypeKey": 0,
      "name": "251",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031417,
          "facilityKey": 9000649,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032896,
          "facilityKey": 9000649,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000650,
      "assetTypeKey": 0,
      "name": "252",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031425,
          "facilityKey": 9000650,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032897,
          "facilityKey": 9000650,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000651,
      "assetTypeKey": 0,
      "name": "253",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031433,
          "facilityKey": 9000651,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032898,
          "facilityKey": 9000651,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000652,
      "assetTypeKey": 0,
      "name": "254",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031441,
          "facilityKey": 9000652,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032899,
          "facilityKey": 9000652,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    },
    {
      "facilityKey": 9000653,
      "assetTypeKey": 0,
      "name": "255",
      "isTopLevel": false,
      "topLevelKey": 9000487,
      "currentOccupancy": 0,
      "attributes": [
        {
          "facilityAttributeKey": 9031449,
          "facilityKey": 9000653,
          "attributeConsumerKey": 2312,
          "value": "This",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        },
        {
          "facilityAttributeKey": 9032900,
          "facilityKey": 9000653,
          "attributeConsumerKey": 2308,
          "value": "2",
          "effectiveDate": new Date("2016-10-14T00:00:00"),
          "endDate": null
        }
      ],
      "occupantKeys": null
    }
  ]
}
