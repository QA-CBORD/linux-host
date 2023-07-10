import { of } from "rxjs";
import { AddCreditCardComponent } from "./add-credit-card.component";

describe('AddCreditCardComponent', () => {
    let fixture: AddCreditCardComponent;

    let fb,
        addCreditCardService,
        popoverCtrl,
        toastService,
        loadingService,
        nav;

    beforeEach(() => {
        (fb = {}),
            (addCreditCardService = {
                createAccount: jest.fn(() => {
                    return of('00');
                }),
                getCardType: jest.fn(() => {
                    return 'visa';
                }),
                formatExpirationDate: jest.fn(() => {
                    return '02/27'
                })
            }),
            (nav = {}),
            (toastService = {}),
            (popoverCtrl = {}),
            (loadingService = {
                showSpinner: jest.fn(),
                closeSpinner: jest.fn(),
            });
        fixture = new AddCreditCardComponent(
            fb,
            addCreditCardService,
            popoverCtrl,
            toastService,
            loadingService,
            nav
        );
    });
});