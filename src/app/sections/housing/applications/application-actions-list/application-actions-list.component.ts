import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { ApplicationDetails } from '../applications.model';

@Component({
  selector: 'st-application-actions-list',
  templateUrl: './application-actions-list.component.html',
})
export class ApplicationActionsListComponent {
  @Input() application: ApplicationDetails;

  constructor(private _router: Router, private _popoverController: PopoverController) {}

  handleEdit(): void {
    this._popoverController
      .dismiss()
      .then(() => this._router.navigate(['/housing/applications', this.application.applicationDefinition.key]));
  }
}
