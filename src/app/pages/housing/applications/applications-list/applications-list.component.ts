import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { PatronApplication } from '../applications.model';

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

  // isNotPending(application: Application): boolean {
  //   return this.getApplicationStatus(application) !== ApplicationStatus.Pending;
  // }

  // isNotNewAndNotPending(application: Application): boolean {
  //   return this.getApplicationStatus(application) !== ApplicationStatus.New && this.isNotPending(application);
  // }
}
