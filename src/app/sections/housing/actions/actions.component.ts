import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { ActionsListComponent } from './actions-list/actions-list.component';
import { WaitingList } from '../waiting-lists/waiting-lists.model';

@Component({
  selector: 'st-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  @Input() path: string;

  @Input() edit: boolean;

  @Input() waitingList: WaitingList;

  constructor(private _popoverController: PopoverController) {}

  handleClick(event: Event): void {
    this._popoverController
      .create({
        component: ActionsListComponent,
        componentProps: {
          path: this.path,
          edit: this.edit,
          waitingList: this.waitingList
        },
        cssClass: 'actions-popover',
        event,
        showBackdrop: false,
        mode: 'md',
      })
      .then((popover: HTMLIonPopoverElement) => popover.present());
  }
}
