

import { of } from "rxjs";
import { MealDonationsComponent } from "./meal-donations.component";

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
        (fb = {}),
            (mealDonationsService = {}),
            (modalCtrl = {}),
            (navCtrl = {}),
            (cdRef = {}),
            (toastService = {}),
            (popoverCtrl = {}),
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
});