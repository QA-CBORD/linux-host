import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { SearchbarCustomEvent } from '@ionic/angular';

@Component({
  selector: 'st-header-search-bar',
  templateUrl: './st-header-search-bar.component.html',
  styleUrls: ['./st-header-search-bar.component.scss'],
})
export class StHeaderSearchBarComponent {
  @Input() title: string;
  @Input() searchPlaceHolder: string;
  @Input() useBackButton: boolean;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private nativeProvider: NativeProvider) {}

  onInputChanged({ target: { value } }: SearchbarCustomEvent) {
    this.onSearch.emit(value);
  }

  onEnterKeyClicked() {
    if (this.nativeProvider.isMobile()) Keyboard.hide();
  }
}
