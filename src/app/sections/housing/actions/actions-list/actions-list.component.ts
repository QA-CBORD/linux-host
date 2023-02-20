import { ApplicationDefinition, ApplicationStatus, PatronApplication } from './../../applications/applications.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ApplicationDetailsPopover } from '@sections/housing/applications/application-details-popover/application-details-popover.component';

@Component({
  selector: 'st-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.scss'],
})
export class ActionsListComponent {
  showDetailsOption = false;
  navigateTo: string;
  canEdit: boolean;
  itemKey = '';
  showEditOption = true;
  showViewOption = true;
  showRemoveOption = false;
  applicationDefinition: ApplicationDefinition;
  patronApplication: PatronApplication;
  @Output() onRemove = new EventEmitter<any>();

  constructor(private _popoverController: PopoverController) {}

  closePopover(): void {
    this._popoverController.dismiss();
  }

  async detailsPopover() {
    const appDetails = await this._popoverController.create({
      cssClass: 'large-popover',
      component: ApplicationDetailsPopover,
      componentProps: {
        details: {
          name: this.applicationDefinition?.applicationTitle,
          isSubmitted: this.patronApplication?.status === ApplicationStatus.Submitted,
          lastSubmitted: this.patronApplication?.submittedDateTime,
        },
      },
      animated: false,
      backdropDismiss: true,
    });
    this.closePopover();
    appDetails.present();
  }

  handleRemove(): void {
    this.closePopover();
    this.onRemove.emit();
  }
}
