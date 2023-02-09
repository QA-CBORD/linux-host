import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'st-header',
  templateUrl: './st-header.component.html',
  styleUrls: ['./st-header.component.scss'],
})
export class StHeaderComponent {
  @Input() trackUrls: boolean;
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
  @Output() onClose = new EventEmitter<void>();
  @Input() useClose = false;

  constructor(private readonly router: Router, private readonly navService: NavigationService) {}

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

  async onBack() {
    if (this.useClose) {
      this.onClose.emit();
      return;
    }
    if (this.trackUrls) {
      await this.router.navigate([this.navService.getPreviousTrackedUrl()]);
    }
  }
}
