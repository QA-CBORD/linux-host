import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
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
  @Input() key = '';
  @Input() showEdit = true;
  @Input() showView = true;
  @Input() showRemove = false;

  @Output() remove = new EventEmitter();

  constructor(private _popoverController: PopoverController) {}

  handleClick(event: Event): void {
    this._popoverController
      .create({
        component: ActionsListComponent,
        componentProps: {
          path: this.path,
          edit: this.edit,
          key: this.key,
          showView: this.showView,
          showEdit: this.showEdit,
          showRemove: this.showRemove,
          remove: this.remove
        },
        cssClass: 'actions-popover',
        event,
        showBackdrop: false,
        mode: 'md',
      })
      .then((popover: HTMLIonPopoverElement) => popover.present());
  }
}
