import { Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { CREDITCARD_ICONS, CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { AccountsService } from '@sections/dashboard/services';
import { firstValueFrom } from '@shared/utils';
import { of } from 'rxjs';
import { PaymentSystemType } from 'src/app/app.global';

@Component({
  selector: 'st-application-payment',
  templateUrl: './application-payment.component.html',
  styleUrls: ['./application-payment.component.scss'],
})
export class ApplicationPaymentComponent implements OnInit {
  @Input() contentStrings: {
    screen_title: string;
    no_card_found: string;
    add_new_card_btn_text: string;
    user_info_text: string;
    error_loading_cards: string;
    remove_success_msg: string;
    remove_failure_msg: string;
    added_success_msg: string;
  };

  @Input() userAccounts: { account: UserAccount; display: string; iconSrc: string }[] = [];
  constructor() {}

  ngOnInit() {}
}
