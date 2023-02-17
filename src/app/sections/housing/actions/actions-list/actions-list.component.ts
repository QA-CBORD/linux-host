import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.scss']
})
export class ActionsListComponent {
  showDetailsOption = false;
  navigateTo: string;
  canEdit: boolean;
  itemKey = '';
  showEditOption = true;
  showViewOption = true;
  showRemoveOption = false;
  @Output() onRemove = new EventEmitter<any>();

  constructor(private _popoverController: PopoverController) {}

  closePopover(): void {
    this._popoverController.dismiss();
  }

  detailsPopover() {
    alert("Details");
  }

  handleRemove(): void {
    this.closePopover();
    this.onRemove.emit();
  }
}
