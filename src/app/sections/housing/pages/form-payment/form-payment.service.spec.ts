import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@core/service/loading/loading.service';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { of } from 'rxjs';
import { FormPaymentService, FormType } from "./form-payment.service";

export const MockCurrentForm = JSON.parse(JSON.stringify({
    "details": {
        "applicationDefinition": {
            "key": 815,
            "termKey": 146,
            "applicationTitle": "22 Fall Application w/ Deposit",
            "accountCodeKey": 32,
            "amount": 60,
            "applicationFormJson": "[{\"type\":\"text\",\"required\":false,\"label\":\"ID Number\",\"name\":\"text-1660933919238\",\"subtype\":\"text\",\"readonly\":false,\"attribute\":\"ID Number\",\"consumerKey\":2330,\"dataType\":\"String\",\"source\":\"PATRON_CORE\"},{\"type\":\"text\",\"required\":false,\"label\":\"First Name\",\"name\":\"text-1660933920006\",\"subtype\":\"text\",\"readonly\":false,\"attribute\":\"First Name\",\"consumerKey\":2323,\"dataType\":\"String\",\"source\":\"PATRON_CORE\"},{\"type\":\"select\",\"required\":false,\"label\":\"Music Pref\",\"name\":\"select-1660933920605\",\"multiple\":false,\"readonly\":false,\"values\":[{\"label\":\"Rock\",\"value\":\"Rock\"},{\"label\":\"Folk\",\"value\":\"Folk\"},{\"label\":\"Jazz\",\"value\":\"Jazz\"},{\"label\":\"Classical\",\"value\":\"Classical\"},{\"label\":\"Country\",\"value\":\"Country\"},{\"label\":\"R&B\",\"value\":\"R&B\"},{\"label\":\"Latin\",\"value\":\"Latin\"},{\"label\":\"Jazz-Rock\",\"value\":\"Jazz-Rock\"},{\"label\":\"Polka/Waltz\",\"value\":\"Polka/Waltz\"},{\"label\":\"Big Band Jazz\",\"value\":\"Big Band Jazz\"},{\"label\":\"Hip Hop\",\"value\":\"Hip Hop\"},{\"label\":\"Rap\",\"value\":\"Rap\"},{\"label\":\"Christian Rock\",\"value\":\"Christian Rock\"},{\"label\":\"Hymns\",\"value\":\"Hymns\"},{\"label\":\"Blues\",\"value\":\"Blues\"},{\"label\":\"Easy Listening\",\"value\":\"Easy Listening\"},{\"label\":\"Pop\",\"value\":\"Pop\"},{\"label\":\"Reggae\",\"value\":\"Reggae\"},{\"label\":\"Dixieland\",\"value\":\"Dixieland\"},{\"label\":\"Disco\",\"value\":\"Disco\"}],\"attribute\":\"Music Pref\",\"consumerKey\":2388,\"dataType\":\"String\",\"source\":\"PATRON\"},{\"type\":\"paragraph\",\"subtype\":\"blockquote\",\"label\":\"New Page\",\"attribute\":null,\"consumerKey\":null},{\"type\":\"header\",\"subtype\":\"h3\",\"label\":\"select your top 3 buildings\",\"attribute\":null,\"consumerKey\":null},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Facility Preferences\",\"inline\":true,\"name\":\"checkbox-group-1660933926652\",\"other\":false,\"prefRank\":3,\"readonly\":false,\"values\":[{\"label\":\"JTW Vista Campus is very long name and should end HERE\",\"value\":\"194\"},{\"label\":\"Building 1\",\"value\":\"2\"},{\"label\":\"Building 2\",\"value\":\"11\"},{\"label\":\"BldS2\",\"value\":\"22\"},{\"label\":\"BldCS3\",\"value\":\"28\"},{\"label\":\"BldS4\",\"value\":\"43\"},{\"label\":\"BldS5\",\"value\":\"48\"},{\"label\":\"Building_ivn\",\"value\":\"64\"},{\"label\":\"Building_ivn_1-one-two-buckle-my-shoe-thee-four-shut-the-door\",\"value\":\"65\"},{\"label\":\"Building_ivn_2\",\"value\":\"70\"},{\"label\":\"BD1S7\",\"value\":\"77\"},{\"label\":\"Smith Commons\",\"value\":\"81\"},{\"label\":\"Bld1\",\"value\":\"84\"},{\"label\":\"1\",\"value\":\"126\"},{\"label\":\"Building 3\",\"value\":\"136\"},{\"label\":\"Building 4\",\"value\":\"143\"},{\"label\":\"Building 5\",\"value\":\"144\"},{\"label\":\"Building 6\",\"value\":\"145\"},{\"label\":\"Copy of Building1\",\"value\":\"166\"},{\"label\":\"Site3BD1\",\"value\":\"316\"},{\"label\":\"Good Hall\",\"value\":\"466\",\"selected\":true,\"facilityKey\":466},{\"label\":\"RSBld1\",\"value\":\"531\"},{\"label\":\"B1\",\"value\":\"362\"},{\"label\":\"Rochester Hall\",\"value\":\"570\",\"selected\":true,\"facilityKey\":570},{\"label\":\"Bldg A\",\"value\":\"712\",\"selected\":true,\"facilityKey\":712},{\"label\":\"Bldg B\",\"value\":\"731\",\"selected\":true,\"facilityKey\":731},{\"label\":\"MIT_1\",\"value\":\"749\"},{\"label\":\"MIT_2\",\"value\":\"750\"},{\"label\":\"MIT_3\",\"value\":\"751\"},{\"label\":\"MIT_4\",\"value\":\"754\"},{\"label\":\"MIT_5\",\"value\":\"755\"},{\"label\":\"MIT_6\",\"value\":\"756\"},{\"label\":\"MIT_4F\",\"value\":\"757\"},{\"label\":\"MIT_5M\",\"value\":\"758\"},{\"label\":\"kds Top\",\"value\":\"767\"},{\"label\":\"Bldg C\",\"value\":\"770\",\"selected\":true,\"facilityKey\":770},{\"label\":\"Bldg D\",\"value\":\"788\",\"selected\":true,\"facilityKey\":788},{\"label\":\"Bldg E\",\"value\":\"810\"}],\"attribute\":null,\"consumerKey\":null,\"facilityPicker\":true,\"options\":[{\"label\":\"JTW Vista Campus is very long name and should end HERE\",\"value\":\"194\"},{\"label\":\"Building 1\",\"value\":\"2\"},{\"label\":\"Building 2\",\"value\":\"11\"},{\"label\":\"BldS2\",\"value\":\"22\"},{\"label\":\"BldCS3\",\"value\":\"28\"},{\"label\":\"BldS4\",\"value\":\"43\"},{\"label\":\"BldS5\",\"value\":\"48\"},{\"label\":\"Building_ivn\",\"value\":\"64\"},{\"label\":\"Building_ivn_1-one-two-buckle-my-shoe-thee-four-shut-the-door\",\"value\":\"65\"},{\"label\":\"Building_ivn_2\",\"value\":\"70\"},{\"label\":\"BD1S7\",\"value\":\"77\"},{\"label\":\"Smith Commons\",\"value\":\"81\"},{\"label\":\"Bld1\",\"value\":\"84\"},{\"label\":\"1\",\"value\":\"126\"},{\"label\":\"Building 3\",\"value\":\"136\"},{\"label\":\"Building 4\",\"value\":\"143\"},{\"label\":\"Building 5\",\"value\":\"144\"},{\"label\":\"Building 6\",\"value\":\"145\"},{\"label\":\"Copy of Building1\",\"value\":\"166\"},{\"label\":\"Site3BD1\",\"value\":\"316\"},{\"label\":\"Good Hall\",\"value\":\"466\",\"selected\":true,\"facilityKey\":466},{\"label\":\"RSBld1\",\"value\":\"531\"},{\"label\":\"B1\",\"value\":\"362\"},{\"label\":\"Rochester Hall\",\"value\":\"570\",\"selected\":true,\"facilityKey\":570},{\"label\":\"Bldg A\",\"value\":\"712\",\"selected\":true,\"facilityKey\":712},{\"label\":\"Bldg B\",\"value\":\"731\",\"selected\":true,\"facilityKey\":731},{\"label\":\"MIT_1\",\"value\":\"749\"},{\"label\":\"MIT_2\",\"value\":\"750\"},{\"label\":\"MIT_3\",\"value\":\"751\"},{\"label\":\"MIT_4\",\"value\":\"754\"},{\"label\":\"MIT_5\",\"value\":\"755\"},{\"label\":\"MIT_6\",\"value\":\"756\"},{\"label\":\"MIT_4F\",\"value\":\"757\"},{\"label\":\"MIT_5M\",\"value\":\"758\"},{\"label\":\"kds Top\",\"value\":\"767\"},{\"label\":\"Bldg C\",\"value\":\"770\",\"selected\":true,\"facilityKey\":770},{\"label\":\"Bldg D\",\"value\":\"788\",\"selected\":true,\"facilityKey\":788},{\"label\":\"Bldg E\",\"value\":\"810\"}],\"PrefKeys\":[{\"defaultRank\":1,\"preferenceKey\":49,\"attributeConsumerId\":null,\"listingOrder\":1,\"preferenceID\":20,\"active\":true,\"maxRank\":5,\"name\":\"djs fac pref 1\",\"preferenceType\":\"SpecificFacility\"},{\"defaultRank\":2,\"preferenceKey\":52,\"attributeConsumerId\":null,\"listingOrder\":1,\"preferenceID\":21,\"active\":true,\"maxRank\":5,\"name\":\"djs fac pref 2\",\"preferenceType\":\"SpecificFacility\"},{\"defaultRank\":3,\"preferenceKey\":53,\"attributeConsumerId\":null,\"listingOrder\":1,\"preferenceID\":22,\"active\":true,\"maxRank\":5,\"name\":\"djs fac pref 3\",\"preferenceType\":\"SpecificFacility\"}]},{\"type\":\"paragraph\",\"subtype\":\"p\",\"label\":\"(Building selection/Facility Preferences is last thing on the form.)\",\"attribute\":null,\"consumerKey\":null}]"
        },
        "patronAttributes": [
            {
                "attributeConsumerKey": 2310,
                "value": "Sophomore",
                "effectiveDate": "2020-08-01T00:00:00",
                "key": 4731,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2388,
                "value": "Pop",
                "effectiveDate": "2022-05-31T00:00:00",
                "endDate": "2022-09-15T23:59:59",
                "key": 4355,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 3158,
                "value": "2020-08-08",
                "effectiveDate": "2019-12-01T00:00:00",
                "endDate": "2026-07-16T23:59:59",
                "key": 3959,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2333,
                "value": null,
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2332,
                "value": null,
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2331,
                "value": null,
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2330,
                "value": "r19c08080",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2329,
                "value": null,
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2328,
                "value": "R19c08@tpsmail.com",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2327,
                "value": "2001-06-05",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2338,
                "value": "No",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2326,
                "value": null,
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2307,
                "value": "Female",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2325,
                "value": "MidR19c08",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2324,
                "value": "QALastR19c08",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 2323,
                "value": "FirstR19c08",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            },
            {
                "attributeConsumerKey": 3114,
                "value": "Pref08",
                "effectiveDate": "0001-01-01T00:00:00",
                "key": 0,
                "patronKey": 8219
            }
        ],
        "patronPreferences": [
            {
                "rank": 1,
                "facilityKey": 0
            },
            {
                "rank": 2,
                "facilityKey": 0
            },
            {
                "rank": 3,
                "facilityKey": 0
            },
            {
                "rank": 4,
                "facilityKey": 0
            },
            {
                "rank": 5,
                "facilityKey": 0
            }
        ],
        "roommatePreferences": [
            {
                "rank": 1,
                "patronKeyRoommate": 0,
                "preferenceKey": 12
            },
            {
                "rank": 2,
                "patronKeyRoommate": 0,
                "preferenceKey": 13
            },
            {
                "rank": 3,
                "patronKeyRoommate": 0,
                "preferenceKey": 14
            }
        ],
        "patronAddresses": [
            {
                "addressKey": 2166,
                "patronId": 8219,
                "addrTypeKey": 2,
                "addrName": "08perm",
                "addrLn1": "308 Perm rd",
                "addrLn2": "null",
                "city": "Perm08city",
                "state": "null",
                "zip": "14333",
                "country": "null",
                "addrPhone": "null",
                "email": "null"
            },
            {
                "addressKey": 2164,
                "patronId": 8219,
                "addrTypeKey": 3,
                "addrName": "08billing",
                "addrLn1": "60 Brown",
                "addrLn2": "Apt 3D",
                "city": "Ithacax",
                "state": "NY",
                "zip": "14852",
                "country": "USA",
                "addrPhone": "6076076071",
                "email": "08xemail@test.cbord.com"
            },
            {
                "addressKey": 2003,
                "patronId": 8219,
                "addrTypeKey": 5,
                "addrName": "r19c08 Addreeditget",
                "addrLn1": "8 Address1x rdx",
                "addrLn2": "8 AddrLxine2",
                "city": "City-8x",
                "state": "NM",
                "zip": "87654",
                "country": "US",
                "addrPhone": "607-273-1999",
                "email": "noemail8x@cbord1.com"
            },
            {
                "addressKey": 2183,
                "patronId": 8219,
                "addrTypeKey": 223,
                "addrName": "null",
                "addrLn1": "null",
                "addrLn2": "null",
                "city": "null",
                "state": "null",
                "zip": "null",
                "country": "null",
                "addrPhone": "null",
                "email": "08PersEmail@test.cbord.com"
            }
        ]
    },
    "formValue": {
        "checkbox-group-1660933926652": [
            {
                "label": "Good Hall",
                "value": "466",
                "selected": true,
                "facilityKey": 466
            },
            {
                "label": "Rochester Hall",
                "value": "570",
                "selected": true,
                "facilityKey": 570
            },
            {
                "label": "Bldg A",
                "value": "712",
                "selected": true,
                "facilityKey": 712
            },
            {
                "label": "Bldg B",
                "value": "731",
                "selected": true,
                "facilityKey": 731
            },
            {
                "label": "Bldg C",
                "value": "770",
                "selected": true,
                "facilityKey": 770
            },
            {
                "label": "Bldg D",
                "value": "788",
                "selected": true,
                "facilityKey": 788
            }
        ]
    },
    "key": "815",
    "type": "application"
}));

const _router = {
    navigate: jest.fn(),
};

const _loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
};

const creditCardService = {
    retrieveAccounts: jest.fn(() => of(true))
};

const applicationsService = {
    saveApplication: jest.fn(() => of(true))
};

describe("FormPaymentService", () => {
    let service: FormPaymentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                { provide: Router, useValue: _router },
                { provide: LoadingService, useValue: _loadingService },
                { provide: CreditCardService, useValue: creditCardService },
                { provide: ApplicationsService, useValue: applicationsService },
                FormPaymentService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        });

        service = TestBed.inject(FormPaymentService);
    });

    describe('Continue to payment: ', () => {
        it('should create the component', () => {
            expect(service).toBeTruthy();
        });

        it('should save the application before the payment', async () => {
            const spy = jest.spyOn(applicationsService as any, 'saveApplication');
            await service.continueToFormPayment(MockCurrentForm);
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockReset();
        });

        it('should NOT save the application before the payment', async () => {
            const spy = jest.spyOn(applicationsService as any, 'saveApplication');
            await service.continueToFormPayment({ ...MockCurrentForm, type: FormType.WorkOrder });
            expect(spy).toHaveBeenCalledTimes(0);
        });
    });

    it('should continue to paymentment on work orders forms', async () => {
        const spy = jest.spyOn(service as any, 'navigateToFormPayment');
        await service.continueToFormPayment({ ...MockCurrentForm, type: FormType.WorkOrder });
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockReset();
    });
});

