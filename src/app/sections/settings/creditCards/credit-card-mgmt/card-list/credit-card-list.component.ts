import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';

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

export type AccountsType = {
  account: UserAccount;
  display: string;
  iconSrc: string;
}[];

@Component({
  selector: 'st-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() contentStrings: CardCs = {} as CardCs;
  @Input() userAccounts: AccountsType = [];
  @Input() removeIcon: boolean;
  @Input() addItem: boolean;
  @Output() onRemove: EventEmitter<UserAccount> = new EventEmitter<UserAccount>();
  @Output() onClick: EventEmitter<UserAccount> = new EventEmitter<UserAccount>();
  @Output() onAdd: EventEmitter<Event> = new EventEmitter<Event>();

  noCreditCardFound: boolean;

  ngOnInit(): void {
    this.noCreditCardFound = !this.userAccounts.length;
  }

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
