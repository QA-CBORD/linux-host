import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccount } from '@core/model/account/account.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { handleServerError } from '@core/utils/general-helpers';
import { COMMA_REGEXP, CURRENCY_REGEXP, NUM_COMMA_DOT_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController, PopoverController } from '@ionic/angular';
import { ACCOUNTS_VALIDATION_ERRORS, PAYMENT_TYPE } from '@sections/accounts/accounts.config';
import { amountRangeValidator } from '@sections/accounts/pages/deposit-page/amount-range.validator';
import { DepositCsModel } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ConfirmDepositPopoverComponent } from '@sections/accounts/shared/ui-components/confirm-deposit-popover';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { GuestAddFundsCsModel } from '@sections/guest/model/guest-add-funds.content.strings';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { GUEST_ROUTES } from '@sections/section.config';
import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import { from, Observable, of, throwError } from 'rxjs';
import { finalize, map, switchMap, take } from 'rxjs/operators';
import { ROLES } from 'src/app/app.global';
import { AbstractDepositManager, CREDITCARD_STATUS } from './abstract-deposit-manager';

export enum GUEST_FORM_CONTROL_NAMES {
  paymentMethod = 'paymentMethod',
  toAccount = 'toAccount',
  amountToDeposit = 'amountToDeposit',
  mainInput = 'mainInput',
}

@Component({
  selector: 'st-guest-add-funds',
  templateUrl: './guest-add-funds.component.html',
  styleUrls: ['./guest-add-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestAddFundsComponent extends AbstractDepositManager implements OnInit {
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  addFundsCs: GuestAddFundsCsModel;
  confirmationCs: ContentStringModel;
  guestDepositForm: FormGroup;
  recipientName: string;
  focusLine = false;
  errorCs: { maxAmountError: string; minAmountError: string; amountPatternError: string; };

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly modalController: ModalController,
    private readonly popoverCtrl: PopoverController,
    private activatedRoute: ActivatedRoute,
    private guestDepositsService: GuestDepositsService,
    protected externalPaymentService: ExternalPaymentService,
    protected cdRef: ChangeDetectorRef,
    protected depositService: DepositService,
    protected toastService: ToastService
  ) {
    super(depositService, externalPaymentService, cdRef, toastService);
  }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.data.subscribe(response => {
      this.setResolvedData(response);
    });
    this.setContentString();
  }

  ionViewWillEnter() {
    this.depositButtonLabel();
    this.setFormValidators();
    this.cdRef.detectChanges();
  }

  initForm() {
    this.guestDepositForm = this.fb.group({
      [GUEST_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.toAccount]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.amountToDeposit]: ['', Validators.required],
      [GUEST_FORM_CONTROL_NAMES.mainInput]: ['', Validators.required],
    });
  }

  onPaymentChanged(target) {
    this.defineDestAccounts(target);
    this.addCreditCard();
  }

  formatAmount(event) {
    const { value } = event.target;
    const index = value.indexOf('.');
    if (!NUM_COMMA_DOT_REGEXP.test(value)) {
      this.mainFormInput.setValue(value.slice(0, value.length - this.oneStep));
    }
    if (index !== this.indexNotFound && value.slice(index + this.oneStep).length > this.oneStep) {
      this.mainFormInput.setValue(value.slice(0, index + 2));
    }
  }

  setFormValidators() {
    this.guestDepositForm.setErrors(null);
    const minMaxValidators = [
      amountRangeValidator(+this.minMaxOfAmounts.minAmountOneTime, +this.minMaxOfAmounts.maxAmountOneTime),
    ];

    this.isFreeFormEnabled$.pipe(take(1)).subscribe(data => {
      this.addCreditCard();
      if (data) {
        this.amountToDeposit.setErrors(null);
        this.mainFormInput.setValidators([
          Validators.required,
          ...minMaxValidators,
          Validators.pattern(CURRENCY_REGEXP),
        ]);
        this.amountToDeposit.clearValidators();
      } else {
        this.amountToDeposit.reset();
        this.amountToDeposit.setValidators([Validators.required]);
        this.mainFormInput.clearValidators();
        this.mainFormInput.setErrors(null);
        this.resetControls([this.controlsNames.amountToDeposit, this.controlsNames.mainInput]);
      }
    });
  }

  onAmountChanged(event) {
    const amount = (event && event.target?.value) || undefined;
    if (!isNaN(+amount)) {
      this.depositButtonLabel('Deposit $' + amount);
    } else {
      this.depositButtonLabel();
    }
  }

  onSubmitDeposit() {
    if (this.isReadyToSubmit()) return;
    this.isDepositing = true;
    const { paymentMethod, toAccount, mainInput, amountToDeposit } = this.guestDepositForm.value;
    const amount = this.formatAmountValue(mainInput, amountToDeposit);
    if (this.isApplePayEnabled(paymentMethod)) {
      this.handleApplePay(toAccount, amount);
    } else {
      of(paymentMethod)
        .pipe(
          switchMap(
            (sourceAcc): any => {
              const calculateDepositFee: Observable<number> = this.depositService.calculateDepositFee(
                sourceAcc.id,
                toAccount.id,
                amount
              );

              return calculateDepositFee.pipe(
                map(valueFee => ({
                  fee: valueFee,
                  sourceAcc: sourceAcc,
                  selectedAccount: toAccount,
                  amount: amount,
                  billme: false,
                }))
              );
            }
          ),
          take(1)
        )
        .subscribe(
          info => {
            // eslint-disable-next-line @typescript-eslint/ban-types
            this.confirmationDepositPopover({ ...(info as {}) });
          },
          () => {
            this.loadingService.closeSpinner();
            this.onErrorRetrieve('Something went wrong, please try again...');
            this.isDepositing = false;
          }
        );
    }
  }

  async confirmationDepositPopover(data: any) {
    const { confirmDepositCs: contentString } = this.confirmationCs as DepositCsModel;
    const popover = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: ConfirmDepositPopoverComponent,
      componentProps: {
        data,
        contentString,
        intructions: this.addFundsCs.refundText,
      },
      animated: false,
      backdropDismiss: false,
    });
    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.loadingService.showSpinner();
        this.performDeposit(data);
      } else {
        this.isDepositing = false;
        this.cdRef.detectChanges();
      }
    });

    return await popover.present();
  }

  get hideAccountBalance() {
    return true;
  }

  get controlsNames() {
    return GUEST_FORM_CONTROL_NAMES;
  }

  get paymentMethod(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.paymentMethod);
  }

  get toAccount(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.toAccount);
  }

  get amountToDeposit(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.amountToDeposit);
  }

  get mainFormInput(): AbstractControl {
    return this.guestDepositForm.get(GUEST_FORM_CONTROL_NAMES.mainInput);
  }

  get isFreeFormEnabled$(): Observable<boolean> {
    return this.isFreeFromDepositEnabled$;
  }

  get amountsForSelect$() {
    return this.oneTimeAmounts$;
  }

  setSourceAccounts(guestAccounts: UserAccount[]) {
    this.creditCardSourceAccounts = this.filterAccountsByPaymentSystem(guestAccounts);
  }

  setDestinationAccounts(recipientAccounts: UserAccount[]) {
    this.creditCardDestinationAccounts = recipientAccounts;
    this.defineDestAccounts(PAYMENT_TYPE.CREDIT);
    this.cdRef.markForCheck();
  }

  async finalizeDepositModal(data): Promise<void> {
    const { depositSuccessCs: contentString } = this.confirmationCs as DepositCsModel;
    contentString.subTitleDetail = this.replaceRecipientName(contentString.subTitleDetail);
    const modal = await this.modalController.create({
      component: DepositModalComponent,
      animated: true,
      componentProps: {
        data,
        contentString,
      },
    });

    modal.onDidDismiss().then(() => {
      this.router.navigate([ROLES.guest, GUEST_ROUTES.dashboard]);
      this.guestDepositForm.reset();
      this.guestDepositForm.markAsPristine();
    });
    await modal.present();
  }

  private resetControls(controlNames: string[]) {
    controlNames.forEach(
      controlName => this.guestDepositForm.contains(controlName) && this.guestDepositForm.get(controlName).reset()
    );
  }

  private depositButtonLabel(buttonText?: string) {
    if (buttonText) {
      this.depositButtonText = buttonText;
    } else {
      this.depositButtonText = this.addFundsCs.depositButton;
    }
  }

  public replaceRecipientName(text: string): string {
    if (text.includes('${recipient_name}')) {
      return text.replace('${recipient_name}', this.recipientName);
    }
    return text;
  }

  private isReadyToSubmit() {
    return (this.guestDepositForm && this.guestDepositForm.invalid) || this.isDepositing;
  }

  private performDeposit(data: any) {
    this.guestDepositsService
      .guestDeposit(data.sourceAcc.id, data.selectedAccount.id, data.amount)
      .pipe(
        handleServerError<string>(ACCOUNTS_VALIDATION_ERRORS),
        take(1),
        finalize(() => {
          this.loadingService.closeSpinner();
          this.isDepositing = false;
        })
      )
      .subscribe(
        () => this.finalizeDepositModal(data),
        error => {
          this.onErrorRetrieve(error || 'Your information could not be verified.');
        }
      );
  }

  private setResolvedData(response) {
    this.depositSettings = response.data.settings;
    this.recipientName = response.data.recipientName;
    this.addFundsCs = response.data.addFundsCs;
    this.confirmationCs = response.data.confirmationCs;
    this.applePayEnabled = response.data.applePayEnabled;
    this.setDestinationAccounts(response.data.destinationAccounts);
    this.setSourceAccounts(response.data.sourceAccounts);
  }

  private formatAmountValue(mainInput: any, amountToDeposit: any) {
    let amount = mainInput || amountToDeposit;
    amount = amount.toString().replace(COMMA_REGEXP, '');
    return amount;
  }

  private addCreditCard() {
    if (this.paymentMethod.value != CREDITCARD_STATUS.NEW) {
      return;
    }
    from(this.externalPaymentService.addUSAePayCreditCard())
      .pipe(
        switchMap(({ success, errorMessage }) => {
          if (!success) {
            return throwError(errorMessage);
          }
          this.loadingService.showSpinner();
          return this.guestDepositsService.guestAccounts();
        }),
        take(1)
      )
      .subscribe(
        accounts => {
          this.setSourceAccounts(accounts);
        },
        message => {
          this.onErrorRetrieve(message);
        },
        () => {
          this.loadingService.closeSpinner();
        }
      );
    this.paymentMethod.reset();
    this.paymentMethod.markAsPristine();
  }

  private setContentString() {
    this.errorCs = { 
      maxAmountError: 'The maximum amount for a deposit is',
      minAmountError: 'The minimum amount for a deposit is',
      amountPatternError: 'Please enter a valid amount.',
    }
  }
}
