import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'st-header',
  templateUrl: './st-header.component.html',
  styleUrls: ['./st-header.component.scss'],
})
export class StHeaderComponent {
  @Input() trackUrls: boolean;
  @Input() title: string;
  @Input() pathToReturn: string;
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
  @Input() isFilterButtonShow: boolean;
  @Output() onDismiss = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onFilter = new EventEmitter<void>();

  constructor(
    private readonly router: Router,
    private readonly navService: NavigationService,
    private readonly nativeProvider: NativeProvider,

  ) { }

  onInputChanged(event) {
    this.onSearchedValue.emit(event.target.value);
  }

  onEnterKeyClicked() {
    if (this.nativeProvider.isMobile()) Keyboard.hide();
  }

  onDissmissClicked() {
    this.onDismiss.emit();
  }

  onRemoveClicked() {
    this.onRemove.emit();
  }

  async onBack() {
    if (this.pathToReturn) {
      this.router.navigate([this.pathToReturn]);
      console.log(this.pathToReturn);
      
      return;
    }
    if (this.trackUrls) {
      await this.router.navigate([this.navService.getPreviousTrackedUrl()]);
    } else {
      this.onClose.emit();
    }
  }
}
