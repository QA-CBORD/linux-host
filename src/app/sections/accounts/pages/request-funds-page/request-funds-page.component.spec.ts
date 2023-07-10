

import { of } from "rxjs";
import { REQUEST_FUNDS_CONTROL_NAMES, RequestFundsPageComponent } from "./request-funds-page.component";
import { FormBuilder } from "@angular/forms";
import { PATRON_NAVIGATION } from "src/app/app.global";

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
        (fb = new FormBuilder()),
            (accountService = {
                getAccountsFilteredByDepositTenders: jest.fn().mockReturnValue(of([])),
            }),
            (userFacadeService = {
                requestDeposit$: jest.fn().mockReturnValue(of({ response: true })),
            }),
            (settingsFacadeService = {
                getUserSetting: jest.fn().mockReturnValue(of({ value: 'some value' })),
            }),
            (nativeProvider = {}),
            (nav = {
                navigate: jest.fn(),
            }),
            (toastService = {
                showToast: jest.fn()
            }),
            (popoverCtrl = {
                create: jest.fn().mockReturnValue(Promise.resolve({ present: jest.fn(), onDidDismiss: jest.fn().mockReturnValue(Promise.resolve()) })),
            }),
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

    describe('ngOnInit', () => {
        it('should initialize accounts$ and call initForm', () => {
            const accounts = [{ id: '1', name: 'Account 1' }, { id: '2', name: 'Account 2' }];
            accountService.getAccountsFilteredByDepositTenders.mockReturnValue(of(accounts));

            fixture.ngOnInit();

            expect(fixture.accounts$).toBeDefined();
            fixture.accounts$.subscribe((result) => {
                expect(result).toEqual(accounts);
            });
            expect(fixture.requestFundsForm).toBeDefined();
            expect(fixture.requestFundsForm.controls[REQUEST_FUNDS_CONTROL_NAMES.name].value).toBe('');
            expect(fixture.requestFundsForm.controls[REQUEST_FUNDS_CONTROL_NAMES.email].value).toBe('');
            expect(fixture.requestFundsForm.controls[REQUEST_FUNDS_CONTROL_NAMES.account].value).toBe('');
            expect(fixture.requestFundsForm.controls[REQUEST_FUNDS_CONTROL_NAMES.message].value).toBe('');
        });
    });
    describe('back', () => {
        it('should navigate to PATRON_NAVIGATION.accounts', async () => {
            await fixture.back();
            expect(nav.navigate).toHaveBeenCalledWith([PATRON_NAVIGATION.accounts]);
        });
    });

    describe('showToast', () => {
        it('should show a toast with an error message', async () => {
            await fixture.showToast();
            expect(toastService.showToast).toHaveBeenCalledWith({ message: 'Something went wrong...' });
        });
    });
});