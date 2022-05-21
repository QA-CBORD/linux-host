import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';

export interface cardCs {
  screen_title: string;
  no_card_found: string;
  add_new_card_btn_text: string;
  user_info_text: string;
  error_loading_cards: string;
  remove_success_msg: string;
  remove_failure_msg: string;
  added_success_msg: string;
}

export type accountsType = {
  account: UserAccount;
  display: string;
  iconSrc: string;
}[];

@Component({
  selector: 'st-payment-items',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() contentStrings: cardCs;

  @Input() userAccounts: accountsType = [];

  @Input() removeIcon: boolean;

  @Output() onRemove: EventEmitter<UserAccount> = new EventEmitter<UserAccount>();

  @Output() onClick: EventEmitter<UserAccount> = new EventEmitter<UserAccount>();
  
  @Output() onAdd: EventEmitter<Event> = new EventEmitter<Event>();

  noCreditCardFound: boolean;

  constructor() {}

  ngOnInit() {
    this.noCreditCardFound = !this.userAccounts.length;
  }

  onRemoveEvent(account: UserAccount) {
    this.onRemove.emit(account);
  }

  onClickEvent(account: UserAccount) {
    this.onClick.emit(account);
  }

  onAddEvent() {
    this.onAdd.emit();
  }
}
