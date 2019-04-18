import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'st-header',
  templateUrl: './st-header.component.html',
  styleUrls: ['./st-header.component.scss'],
})
export class StHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButtonTitle: string = 'Back';
  @Input() isToolbarShow: boolean = false;
  @Input() isSubToolbarShow: boolean = false;
  @Input() isTitleShow: boolean = false;
  @Output() onSearchedValue = new EventEmitter<string>();

  constructor(private keyboard: Keyboard) {}

  ngOnInit() {}

  onInputChanged(event) {
    this.onSearchedValue.emit(event.target.value);
  }

  onEnterKeyClicked() {
    if (this.keyboard) {
      this.keyboard.hide();
    }
  }
}
