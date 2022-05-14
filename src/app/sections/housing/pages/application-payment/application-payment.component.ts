import { Component, OnInit } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { AccountsService } from '@sections/dashboard/services';
import { PaymentSystemType } from 'src/app/app.global';

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
})
export class ApplicationPaymentComponent implements OnInit {
  userAccounts: any;
  constructor(private readonly accountService: AccountsService) {}

  ngOnInit() {
    this.userAccounts = this.accountService.getUserAccounts([PaymentSystemType.MONETRA, PaymentSystemType.USAEPAY]);
  }
}
