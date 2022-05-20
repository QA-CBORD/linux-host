import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CURRENCY_REGEXP } from '@core/utils/regexp-patterns';
import { DepositCsModel } from '../deposit-page.content.string';

@Component({
  selector: 'st-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss'],
})
export class InputAmountComponent implements OnInit {
 
  @Input()  contentString: DepositCsModel = {} as any;
 
  @Input() control: AbstractControl = new FormControl();
 
  @Output() onInput: EventEmitter<Event> = new EventEmitter<Event>();

  @Output() onKeyDown: EventEmitter<Event> = new EventEmitter<Event>();

  private focusLine: boolean = false;

  constructor() { }

  ngOnInit() {}

  ionInputEvent(event: Event) {
    this.onInput.emit(event);
  }

  keydownEvent(event: Event) {
    this.onKeyDown.emit(event);
  }
}
