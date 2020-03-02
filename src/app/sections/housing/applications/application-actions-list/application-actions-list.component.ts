import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-application-actions-list',
  templateUrl: './application-actions-list.component.html',
})
export class ApplicationActionsListComponent {
  @Input() applicationKey: number;

  constructor(private _popoverController: PopoverController) {}

  handleEdit(): void {
    this._popoverController.dismiss();
  }
}
