

import { of } from "rxjs";
import { RequestFundsPageComponent } from "./request-funds-page.component";

describe('RequestFundsPageComponent', () => {
    let fixture: RequestFundsPageComponent;

    let fb,
        accountService,
        loadingService,
        toastService,
        popoverCtrl,
        userFacadeService,
        settingsFacadeService,
        nav,
        nativeProvider;

    beforeEach(() => {
        (fb = {}),
            (accountService = {}),
            (userFacadeService = {}),
            (settingsFacadeService = {}),
            (nativeProvider = {}),
            (nav = {}),
            (toastService = {}),
            (popoverCtrl = {}),
            (loadingService = {
                showSpinner: jest.fn(),
                closeSpinner: jest.fn(),
            });
        fixture = new RequestFundsPageComponent(
            fb,
            accountService,
            loadingService,
            toastService,
            popoverCtrl,
            userFacadeService,
            settingsFacadeService,
            nav,
            nativeProvider
        );
    });
});