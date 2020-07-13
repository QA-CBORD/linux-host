import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { ActionsListComponent } from './actions-list/actions-list.component';

@Component({
  selector: 'st-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  @Input() path: string;

  @Input() edit: boolean;

  constructor(private _popoverController: PopoverController) {}

  handleClick(event: Event): void {
    this._popoverController
      .create({
        component: ActionsListComponent,
        componentProps: {
          path: this.path,
          edit: this.edit,
        },
        cssClass: 'actions-popover',
        event,
        showBackdrop: false,
        mode: 'md',
      })
      .then((popover: HTMLIonPopoverElement) => popover.present());
  }
}
