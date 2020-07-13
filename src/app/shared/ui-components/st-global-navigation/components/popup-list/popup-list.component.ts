import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'st-popup-list',
  templateUrl: './popup-list.component.html',
  styleUrls: ['./popup-list.component.scss'],
})
export class PopupListComponent {
  @Output() onBackdropClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
}
