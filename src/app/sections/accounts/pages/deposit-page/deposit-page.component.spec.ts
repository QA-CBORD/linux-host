import { of } from "rxjs";
import { DepositPageComponent } from "./deposit-page.component";

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
        (fb = {}),
            (orderingService = {}),
            (a11yService = {}),
            (commonService = {}),
            (depositService = {}),
            (userFacadeService = {}),
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
    });
});