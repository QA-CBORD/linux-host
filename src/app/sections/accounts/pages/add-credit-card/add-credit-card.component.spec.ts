import { of } from "rxjs";
import { ADD_CREDIT_CARD_CONTROL_NAMES, AddCreditCardComponent } from "./add-credit-card.component";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";

describe('AddCreditCardComponent', () => {
    let fixture: AddCreditCardComponent;

    let fb,
        addCreditCardService,
        popoverCtrl,
        toastService,
        loadingService,
        nav;

    beforeEach(() => {
        (fb = new FormBuilder()),
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
        fixture.initForm();
    });

    describe('Initialization', () => {
        it('should create the component', () => {
            expect(fixture).toBeTruthy();
        });

        it('should initialize the form', () => {
            expect(fixture.ccForm).toBeInstanceOf(FormGroup);
        });
    });
    describe('Form Controls', () => {
        it('should return the cardNumber control', () => {
            const control: AbstractControl = fixture.cardNumberControl;
            expect(control).toBeInstanceOf(AbstractControl);
            expect(control).toBe(fixture.ccForm.get(ADD_CREDIT_CARD_CONTROL_NAMES.cardNumber));
        });
    });
});