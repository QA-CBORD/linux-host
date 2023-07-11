

import { of, throwError } from "rxjs";
import { MealDonationsComponent, REQUEST_MEALS_CONTROL_NAMES } from "./meal-donations.component";
import { FormBuilder, Validators } from "@angular/forms";
import { AccountType } from "src/app/app.global";

describe('MealDonationsComponent', () => {
    let fixture: MealDonationsComponent;

    let fb,
        mealDonationsService,
        loadingService,
        toastService,
        popoverCtrl,
        modalCtrl,
        navCtrl,
        cdRef;

    beforeEach(() => {
        (fb = new FormBuilder()),
            (mealDonationsService = {
                getAccountsFilteredByMealsTenders: jest.fn().mockReturnValue(of([])),
                settings$: of([]),
                getSettingByName: jest.fn(),
                donate: jest.fn(),
                getMealsDonationContentStringByName$: jest.fn().mockReturnValue(of('')),
            }),
            (modalCtrl = {
                create: jest.fn().mockReturnValue(Promise.resolve({ present: jest.fn(), onDidDismiss: jest.fn().mockReturnValue(Promise.resolve()) })),
            }),
            (navCtrl = {
                navigateBack: jest.fn(),
            }),
            (cdRef = {
                detectChanges: jest.fn(),
            }),
            (toastService = {
                showToast: jest.fn(),
            }),
            (popoverCtrl = {
                create: jest.fn().mockReturnValue(Promise.resolve({ present: jest.fn(), onDidDismiss: jest.fn().mockReturnValue(Promise.resolve()) })),
            }),
            (loadingService = {
                showSpinner: jest.fn(),
                closeSpinner: jest.fn(),
            });
        fixture = new MealDonationsComponent(
            fb,
            mealDonationsService,
            loadingService,
            toastService,
            popoverCtrl,
            modalCtrl,
            navCtrl,
            cdRef
        );
    });

    describe('ionViewWillEnter', () => {
        it('should initialize accounts$, showContent, isFreeFormEnabled, and initForm', () => {
            const accounts = [{ id: '1', name: 'Account 1' }, { id: '2', name: 'Account 2' }];
            mealDonationsService.getAccountsFilteredByMealsTenders.mockReturnValue(of(accounts));

            fixture.ionViewWillEnter();

            expect(fixture.accounts$).toBeDefined();
            fixture.accounts$.subscribe((result) => {
                expect(result).toEqual(accounts);
            });

            expect(fixture.showContent).toBe(true);

            expect(fixture.isFreeFormEnabled$).toBeDefined();
            fixture.isFreeFormEnabled$.subscribe((result) => {
                expect(result).toBe(true);
            });

            expect(fixture.mealsForm).toBeDefined();
            expect(fixture.mealsForm.controls[REQUEST_MEALS_CONTROL_NAMES.account].value).toBe('');
            expect(fixture.mealsForm.controls[REQUEST_MEALS_CONTROL_NAMES.amount].value).toBe('');
            expect(fixture.maxAmount).toBeUndefined();
            expect(fixture.fixedAmounts$).toBeUndefined();
        });
    });

});