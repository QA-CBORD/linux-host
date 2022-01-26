import { Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { AccountsService } from '@sections/dashboard/services';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { PaymentSystemType } from 'src/app/app.global';

@Component({
  selector: 'st-credit-card-mgmt',
  templateUrl: './credit-card-mgmt.component.html',
  styleUrls: ['./credit-card-mgmt.component.scss'],
})
export class CreditCardMgmtComponent implements OnInit {
  @Input() contentStrings = {};

  creditCards = [
    { ccName: 'master card 1234' },
    { ccName: 'amex card  0011' },
    { ccName: 'visa card 9966' },
    { ccName: 'master card 1234' },
    { ccName: 'master card 1234' },
  ];

  @Input() accounts: UserAccount[] = [];

  accountsObs: Observable<{ account: UserAccount; display: string }[]>;

  noCreditCardFound: boolean = false;

  addNewCreditCartState: boolean = false;
  browserHidden: boolean;

  constructor(
    private readonly modalControler: ModalController,
    private readonly accountService: AccountsService,
    private externalPaymentService: ExternalPaymentService,
    private loadingService: LoadingService,
    private readonly toastService: ToastService,
    protected readonly alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.accountsObs = this.retrieveAccounts();
  }

  retrieveAccounts() {
    this.loadingService.showSpinner();
    return this.accountService.getUserAccounts([PaymentSystemType.MONETRA, PaymentSystemType.USAEPAY]).pipe(
      map(accounts => accounts.map(acc => this.buildStr(acc))),
      tap(x => (this.noCreditCardFound = !x.length)),
      finalize(() => this.loadingService.closeSpinner())
    );
  }

  private buildStr(account: UserAccount) {
    const { accountTender, lastFour } = account;
    const display = `${CREDITCARD_TYPE[parseInt(accountTender) - 1]} ending in ${lastFour}`;
    return {
      display,
      account,
    };
  }

  close() {
    this.modalControler.dismiss();
  }

  changeAddNewCreditCardState() {}

  async removeAccount({ account }) {
    const onRemoveConfirmed = async () => {
      this.alertCtrl.dismiss();
      this.loadingService.showSpinner();
      await this.accountService
        .removeCreditCardAccount(account)
        .pipe(
          tap(success => {
            this.accountsObs = this.retrieveAccounts();
            (success && this.showMessage('Your credit card has been removed successfully.')) ||
              this.showMessage('We could not remove your credit card, please try again later.');
          }),
          catchError(() => this.showMessage('We could not remove your credit card, please try again later.')),
          finalize(() => this.loadingService.closeSpinner())
        )
        .toPromise();
    };

    await this.createAlertDialog(
      'Confirm',
      'Are you sure you want to remove credit card ending in ' + account.lastFour,
      [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Confirm',
          handler: () => onRemoveConfirmed(),
        },
      ]
    );
  }

  async addCreditCard() {
    this.browserHidden = true;
    from(this.externalPaymentService.addUSAePayCreditCard())
      .pipe(
        tap(() =>  this.browserHidden = false),
        switchMap(({ success, errorMessage }) => {
          if (!success) {
            return throwError(errorMessage);
          }
          return this.retrieveAccounts().pipe(
            tap(() => this.showMessage('Your credit card has been added successfully'))
          );
        }),
        take(1)
      )
      .subscribe(
        data => (this.accountsObs = of(data)),
        message => this.showMessage(message),
        () => this.loadingService.closeSpinner()
      );
  }

  private async showMessage(message: string) {
    await this.toastService.showToast({ message, duration: 10000 });
  }

  private async createAlertDialog(header: string, msg: string, buttons: Array<any>) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert-dialog',
      backdropDismiss: false,
      mode: 'ios',
      message: msg,
      buttons: buttons,
      header: header,
    });
    alert.present();
  }
}
