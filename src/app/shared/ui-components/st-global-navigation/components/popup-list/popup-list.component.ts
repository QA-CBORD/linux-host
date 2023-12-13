import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

@Component({
  selector: 'st-popup-list',
  templateUrl: './popup-list.component.html',
  styleUrls: ['./popup-list.component.scss'],
})
export class PopupListComponent implements AfterViewInit {
  @ViewChild('verticalList') verticalList: ElementRef;

  @Output() onBackdropClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly a11yService: AccessibilityService) {}
  ngAfterViewInit(): void {
    this.verticalList.nativeElement.focus();
  }
  async isIos() {
    let isIos = false;
    await this.a11yService.isVoiceOverEnabled$.then(val => (isIos = val));
    return isIos;
  }
}
