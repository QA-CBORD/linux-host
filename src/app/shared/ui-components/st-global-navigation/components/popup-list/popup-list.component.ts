import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'st-popup-list',
  templateUrl: './popup-list.component.html',
  styleUrls: ['./popup-list.component.scss'],
})
export class PopupListComponent implements AfterViewInit {
  @ViewChild('verticalList') verticalList: ElementRef;

  @Output() onBackdropClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngAfterViewInit(): void {
    this.verticalList.nativeElement.focus();
  }
}
