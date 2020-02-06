import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, PopoverController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCreditCardService } from './services/add-credit-card.service';
import { SuccessPopoverComponent } from './components/success-popover/success-popover.component';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { WHITESPACE_REGEXP, FOUR_DIGITS_REGEXP } from '@core/utils/regexp-patterns';

@Component({
  selector: 'st-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCreditCardComponent implements OnInit {
  ccForm: FormGroup;
  cardType: string = '';
  private inputKeyCode: number;
  private readonly sourceSubscription: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly addCreditCardService: AddCreditCardService,
    private readonly popoverCtrl: PopoverController,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly loadingService: LoadingService,
    private readonly route: ActivatedRoute,
    private readonly nav: NavController,
  ) {}

  ngOnInit() {
    this.initForm();
    this.cardTypeControlSubscribtion();
    this.expDateControlSubscribtion();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get cardNumberControl(): AbstractControl {
    return this.ccForm.get('cardNumber');
  }

  get expDateControl(): AbstractControl {
    return this.ccForm.get('expDate');
  }

  get securityCodeControl(): AbstractControl {
    return this.ccForm.get('securityCode');
  }

  get nameOnCCControl(): AbstractControl {
    return this.ccForm.get('nameOnCC');
  }

  get billingAddressControl(): AbstractControl {
    return this.ccForm.get('billingAddress');
  }

  get zipControl(): AbstractControl {
    return this.ccForm.get('zip');
  }

  onFormSubmit() {
    const { cardNumber, expDate, securityCode, nameOnCC, billingAddress, zip } = this.ccForm.value;
    const accountTender = this.cardType === 'Visa' ? '4' : '3';
    const mediaValue = cardNumber.replace(WHITESPACE_REGEXP, '');
    const expirationMonth = expDate.slice(0, 2);
    const expirationYear = expDate.slice(3);
    const accountDisplayName = nameOnCC;
    const nameOnMedia = nameOnCC;
    const billingAddressObject = {
      address1: billingAddress,
      city: '',
      state: '',
      postalcode: zip,
    };

    this.loadingService.showSpinner();
    this.addCreditCardService
      .createAccount(
        accountDisplayName,
        nameOnMedia,
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
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  private cardTypeControlSubscribtion() {
    const subscription = this.cardNumberControl.valueChanges.subscribe(value => {
      this.cardType = this.getCardType(value.replace(WHITESPACE_REGEXP, ''));
      if (this.inputKeyCode !== 8 && value.length <= 16) {
        this.cardNumberControl.patchValue(value.replace(FOUR_DIGITS_REGEXP, '$1 '), { emitEvent: false });
      }
    });
    this.sourceSubscription.add(subscription);
  }

  private expDateControlSubscribtion() {
    const subscription = this.expDateControl.valueChanges.subscribe(value => {
      if (this.inputKeyCode !== 8) {
        this.expDateControl.patchValue(this.formatExpirationDate(value), { emitEvent: false });
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
