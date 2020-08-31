import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Keyboard } = Plugins;

@Component({
  selector: 'st-header',
  templateUrl: './st-header.component.html',
  styleUrls: ['./st-header.component.scss'],
})
export class StHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() placeholder: string;
  @Input() backButtonTitle: string = 'Back';
  @Input() backButtonIcon: string | null = null;
  @Input() isToolbarShow: boolean = false;
  @Input() isSubToolbarShow: boolean = false;
  @Input() isTitleShow: boolean = false;
  @Output() onSearchedValue = new EventEmitter<string>();
  @Input() isBackButtonShow: boolean = true;
  @Input() isDismissButtonShow: boolean;
  @Output() onDismiss = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onInputChanged(event) {
    this.onSearchedValue.emit(event.target.value);
  }

  onEnterKeyClicked() {
    Keyboard.hide();
  }

  onDissmissClicked() {
    this.onDismiss.emit();
  }
}
