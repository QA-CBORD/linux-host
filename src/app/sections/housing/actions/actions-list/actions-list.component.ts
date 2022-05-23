import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-actions-list',
  templateUrl: './actions-list.component.html',
})
export class ActionsListComponent {
  @Input() path: string;
  @Input() edit: boolean;
  @Input() key = '';
  @Input() showEdit = true;
  @Input() showView = true;
  @Input() showRemove = false;

  @Output() remove = new EventEmitter<any>();

  constructor(private _popoverController: PopoverController) {}

  handleEdit(): void {
    this._popoverController.dismiss();
  }

  handleRemove(): void {
    this._popoverController.dismiss();
    this.remove.emit();
  }
}
