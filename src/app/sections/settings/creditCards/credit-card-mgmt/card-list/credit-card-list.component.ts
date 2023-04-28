import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { AccountsConf } from '../../credit-card.service';
import { CreditPaymentMethods } from '@core/model/account/credit-payment-methods.model';

export interface CardCs {
  screen_title: string;
  no_card_found: string;
  add_new_card_btn_text: string;
  user_info_text: string;
  error_loading_cards: string;
  remove_success_msg: string;
  remove_failure_msg: string;
  added_success_msg: string;
}

@Component({
  selector: 'st-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  @Input() contentStrings: CardCs = {} as CardCs;
  @Input() userAccounts: AccountsConf[] = [];
  @Input() removeIcon: boolean;
  @Input() addItem: boolean;
  @Input() allowedPaymentsMethods: CreditPaymentMethods[];
  @Output() onRemove: EventEmitter<UserAccount> = new EventEmitter<UserAccount>();
  @Output() onClick: EventEmitter<UserAccount> = new EventEmitter<UserAccount>();
  @Output() onAdd: EventEmitter<Event> = new EventEmitter<Event>();

  onRemoveEvent(account: UserAccount): void {
    this.onRemove.emit(account);
  }

  onClickEvent(account: UserAccount): void {
    this.onClick.emit(account);
  }

  onAddEvent(): void {
    this.onAdd.emit();
  }
}
