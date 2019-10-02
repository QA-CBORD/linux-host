import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { PatronApplication, ApplicationStatus } from '../applications.model';

@Component({
  selector: 'st-applications-list',
  templateUrl: './applications-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListComponent {
  @Input() applications: PatronApplication[];

  trackById(_: number, application: PatronApplication): number {
    return application.applicationDefinitionId;
  }

  isNotPending(application: PatronApplication): boolean {
    return this.getApplicationStatus(application) !== ApplicationStatus.Pending;
  }

  isNotNewAndNotPending(application: PatronApplication): boolean {
    return this.getApplicationStatus(application) !== ApplicationStatus.New && this.isNotPending(application);
  }

  getApplicationStatus(application: PatronApplication): string {
    if (application.isApplicationAccepted) {
      return ApplicationStatus.Accepted;
    } else if (application.isApplicationSubmitted) {
      return ApplicationStatus.Submitted;
    } else if (application.isApplicationCanceled) {
      return ApplicationStatus.Canceled;
    } else if (new Date(application.createdDateTime).getFullYear() === 1) {
      return ApplicationStatus.New;
    } else {
      return ApplicationStatus.Pending;
    }
  }

  getApplicationModificationDate(application: PatronApplication): string {
    if (application.isApplicationAccepted) {
      return new Date(application.acceptedDateTime).toDateString();
    } else if (application.isApplicationSubmitted) {
      return new Date(application.submittedDateTime).toDateString();
    } else if (application.isApplicationCanceled) {
      return new Date(application.cancelledDateTime).toDateString();
    } else if (application.modifiedDate !== '') {
      return new Date(application.modifiedDate).toDateString();
    } else {
      return '';
    }
  }
}
