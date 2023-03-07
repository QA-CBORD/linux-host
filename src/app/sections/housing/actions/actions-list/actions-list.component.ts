import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { ApplicationDefinition, ApplicationStatus, PatronApplication } from './../../applications/applications.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ApplicationDetailsPopover } from '@sections/housing/applications/application-details-popover/application-details-popover.component';
import { Router } from '@angular/router';

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
  @Output() onRemove = new EventEmitter<void>();

  constructor(private _popoverController: PopoverController, private _applicationService: ApplicationsService, private router: Router) {}

  handleEdit(): void {
    this.navigate();
  }

  handleView(): void {
    this._applicationService.isView = true;
    this.navigate();
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
      showBackdrop: true,
    });
    this._popoverController.dismiss();
    appDetails.present();
  }

  handleRemove(): void {
    this._popoverController.dismiss();
    this.onRemove.emit();
  }

  private navigate() {
    this._popoverController.dismiss();
    this.router.navigate([this.navigateTo]);
  }
}
