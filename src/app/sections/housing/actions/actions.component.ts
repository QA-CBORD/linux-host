import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ApplicationDefinition, PatronApplication } from '../applications/applications.model';

import { ActionsListComponent } from './actions-list/actions-list.component';

@Component({
  selector: 'st-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  @Input() navigateTo: string;
  @Input() canEdit: boolean;
  @Input() itemKey = '';
  @Input() showEditOption = true;
  @Input() showViewOption = true;
  @Input() showRemoveOption = false;
  @Input() showDetailsOption = false;
  @Input() applicationDefinition: ApplicationDefinition;
  @Input() patronApplication: PatronApplication;
  @Output() onRemove = new EventEmitter();

  constructor(private _popoverController: PopoverController) {}

  handleClick(event: Event): void {
    this._popoverController
      .create({
        component: ActionsListComponent,
        componentProps: {
          navigateTo: this.navigateTo,
          canEdit: this.canEdit,
          itemKey: this.itemKey,
          showViewOption: this.showViewOption,
          showEditOption: this.showEditOption,
          showRemoveOption: this.showRemoveOption,
          showDetailsOption: this.showDetailsOption,
          applicationDefinition: this.applicationDefinition,
          patronApplication: this.patronApplication,
          onRemove: this.onRemove
        },
        cssClass: 'actions-popover',
        event,
        showBackdrop: false,
        mode: 'md',
      })
      .then((popover: HTMLIonPopoverElement) => popover.present());
  }
}
