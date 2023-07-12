import { firstValueFrom, of } from "rxjs";
import { DepositPageComponent } from "./deposit-page.component";
import { SettingInfo } from "@core/model/configuration/setting-info.model";
import { FormBuilder, FormGroup } from "@angular/forms";

describe('DepositPageComponent', () => {
    let fixture: DepositPageComponent;

    let depositService,
        fb,
        popoverCtrl,
        modalController,
        toastService,
        router,
        loadingService,
        cdRef,
        userFacadeService,
        externalPaymentService,
        a11yService,
        commonService,
        orderingService;

    beforeEach(() => {
        (fb = new FormBuilder()),
            (orderingService = {}),
            (a11yService = {}),
            (commonService = {
                getString: jest.fn(()=>{
                    return 'test'
                })
            }),
            (depositService = {
                getSettingByName: jest.fn(() => {
                    return 'test'
                }),
                settings$: of([{
                    name: 'test',
                    value: '1',
                    category: 'cat'
                },
                {
                    name: 'test2',
                    value: '3',
                    category: 'cat 2'
                }] as SettingInfo[])
            }),
            (userFacadeService = {
                isApplePayEnabled$: jest.fn(() => {
                    return of(true)
                }),
            }),
            (externalPaymentService = {}),
            (cdRef = {}),
            (modalController = {}),
            (router = {}),
            (toastService = {}),
            (popoverCtrl = {}),
            (loadingService = {
                showSpinner: jest.fn(),
                closeSpinner: jest.fn(),
            });
        fixture = new DepositPageComponent(
            depositService,
            fb,
            popoverCtrl,
            modalController,
            toastService,
            router,
            loadingService,
            cdRef,
            userFacadeService,
            externalPaymentService,
            a11yService,
            commonService,
            orderingService
        );
        fixture.ngOnInit();
    });


    describe('DepositPage', () => {
        it('Should retreive the list of deposit settings', async () => {
            expect(fixture.depositSettings.length).toBeGreaterThan(0);
        });
    });
});