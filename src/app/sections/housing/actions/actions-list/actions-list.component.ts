import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-actions-list',
  templateUrl: './actions-list.component.html',
})
export class ActionsListComponent {
  @Input() key: number;

  @Input() path: string;

  @Input() edit: boolean;

  constructor(private _popoverController: PopoverController) {}

  handleEdit(): void {
    this._popoverController.dismiss();
  }
}
