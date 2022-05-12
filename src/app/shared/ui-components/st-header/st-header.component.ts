import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'st-header',
  templateUrl: './st-header.component.html',
  styleUrls: ['./st-header.component.scss'],
})
export class StHeaderComponent {
  @Input() title: string;
  @Input() placeholder: string;
  @Input() backButtonTitle = 'Back';
  @Input() backButtonIcon: string | null = null;
  @Input() isToolbarShow = false;
  @Input() isSubToolbarShow = false;
  @Input() isTitleShow = false;
  @Output() onSearchedValue = new EventEmitter<string>();
  @Input() isBackButtonShow = true;
  @Input() isDismissButtonShow: boolean;
  @Input() isRemoveButtonShow: boolean;
  @Output() onDismiss = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<void>();

  onInputChanged(event) {
    this.onSearchedValue.emit(event.target.value);
  }

  onEnterKeyClicked() {
    Keyboard.hide();
  }

  onDissmissClicked() {
    this.onDismiss.emit();
  }

  onRemoveClicked() {
    this.onRemove.emit();
  }
}
