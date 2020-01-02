import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApplicationDetails } from '../applications.model';
import { PopoverController } from '@ionic/angular';

import { ApplicationActionsListComponent } from '../application-actions-list/application-actions-list.component';

@Component({
  selector: 'st-application-actions',
  templateUrl: './application-actions.component.html',
  styleUrls: ['./application-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationActionsComponent {
  @Input() application: ApplicationDetails;

  constructor(private _popoverController: PopoverController) {}

  handleClick(application: ApplicationDetails, event: Event): void {
    this._popoverController
      .create({
        component: ApplicationActionsListComponent,
        componentProps: {
          application,
        },
        cssClass: 'application-actions-popover',
        event,
        showBackdrop: false,
        mode: 'md',
      })
      .then((popover: HTMLIonPopoverElement) => popover.present());
  }
}
