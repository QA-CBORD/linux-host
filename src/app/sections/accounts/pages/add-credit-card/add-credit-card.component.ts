import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, PopoverController } from '@ionic/angular';
import { AddCreditCardService } from './services/add-credit-card.service';
import { SuccessPopoverComponent } from './components/success-popover/success-popover.component';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { WHITESPACE_REGEXP, FOUR_DIGITS_REGEXP } from '@core/utils/regexp-patterns';
import { Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { validateAllFormFields } from '@core/utils/general-helpers';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCreditCardComponent implements OnInit, OnDestroy {
  ccForm: FormGroup;
  cardType = '';
  private inputKeyCode: number;
  private readonly sourceSubscription: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly addCreditCardService: AddCreditCardService,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly nav: NavController,
  ) { }

  ngOnInit() {
    this.initForm();
    this.cardTypeControlSubscribtion();
    this.expDateControlSubscribtion();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get cardNumberControl(): AbstractControl {
    return this.ccForm.get(this.controlsNames.cardNumber);
  }

  get expDateControl(): AbstractControl {
    return this.ccForm.get(this.controlsNames.expDate);
  }

  get securityCodeControl(): AbstractControl {
    return this.ccForm.get(this.controlsNames.securityCode);
  }

  get nameOnCCControl(): AbstractControl {
    return this.ccForm.get(this.controlsNames.nameOnCC);
  }

  get billingAddressControl(): AbstractControl {
    return this.ccForm.get(this.controlsNames.billingAddress);
  }

  get zipControl(): AbstractControl {
    return this.ccForm.get(this.controlsNames.zip);
  }

  get controlsNames() {
    return ADD_CREDIT_CARD_CONTROL_NAMES;
  }

  onFormSubmit() {
    if (this.ccForm.invalid) {
      validateAllFormFields(this.ccForm);
      return;
    }

    const { cardNumber, expDate, securityCode, nameOnCC, billingAddress, zip } = this.ccForm.value;
    const accountTender = this.cardType === 'Visa' ? '4' : '3';
    const mediaValue = cardNumber.replace(WHITESPACE_REGEXP, '');
    const expirationMonth = expDate.slice(0, 2);
    const expirationYear = expDate.slice(3);
    const billingAddressObject = {
      address1: billingAddress,
      city: '',
      state: '',
      postalcode: zip,
    };

    this.loadingService.showSpinner();
    this.addCreditCardService
      .createAccount(
        nameOnCC,
        nameOnCC,
        accountTender,
        mediaValue,
        securityCode,
        expirationMonth,
        expirationYear,
        billingAddressObject
      )
      .pipe(
        finalize(() => this.loadingService.closeSpinner()),
        take(1)
      )
      .subscribe(
        () => this.modalHandler(),
        () => this.failedCriationAccount('Something went wrong, please try again...')
      );
  }

  onInputFieldClicked({ keyCode }) {
    this.inputKeyCode = keyCode;
  }

  private async modalHandler() {
    const data = { message: 'Card was successfully added' };
    const popover = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: SuccessPopoverComponent,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(() => this.nav.pop());

    return await popover.present();
  }

  private async failedCriationAccount(message: string) {
    await this.toastService.showError(message);
  }

  private cardTypeControlSubscribtion() {
    const cardNumber = this.cardNumberControl;
    const subscription = cardNumber.valueChanges.subscribe(value => {
      this.cardType = this.getCardType(value.replace(WHITESPACE_REGEXP, ''));
      if (this.inputKeyCode !== 8 && value.length <= 16) {
        cardNumber.patchValue(value.replace(FOUR_DIGITS_REGEXP, '$1 '), { emitEvent: false });
      }
    });
    this.sourceSubscription.add(subscription);
  }

  private expDateControlSubscribtion() {
    const expDateControl = this.expDateControl;
    const subscription = expDateControl.valueChanges.subscribe(value => {
      if (this.inputKeyCode !== 8) {
        expDateControl.patchValue(this.formatExpirationDate(value), { emitEvent: false });
      }
    });

    this.sourceSubscription.add(subscription);
  }

  private initForm() {
    this.ccForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9 ]+')]],
      expDate: ['', [Validators.required, Validators.minLength(7)]],
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[0-9.-]*')]],
      nameOnCC: ['', Validators.required],
      billingAddress: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('[0-9.-]*')]],
    });
  }

  private getCardType(number): string {
    return this.addCreditCardService.getCardType(number);
  }

  private formatExpirationDate(string) {
    return this.addCreditCardService.formatExpirationDate(string);
  }
}


export enum ADD_CREDIT_CARD_CONTROL_NAMES {
  cardNumber = 'cardNumber',
  expDate = 'expDate',
  securityCode = 'securityCode',
  nameOnCC = 'nameOnCC',
  billingAddress = 'billingAddress',
  zip = 'zip'
}
