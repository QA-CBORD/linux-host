import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-actions-list',
  templateUrl: './actions-list.component.html',
})
export class ActionsListComponent {
  @Input() navigateTo: string;
  @Input() canEdit: boolean;
  @Input() itemKey = '';
  @Input() showEditOption = true;
  @Input() showViewOption = true;
  @Input() showRemoveOption = false;
  @Output() onRemove = new EventEmitter<any>();

  constructor(private _popoverController: PopoverController) {}

  closePopover(): void {
    this._popoverController.dismiss();
  }

  handleRemove(): void {
    this.closePopover();
    this.onRemove.emit();
  }
}
