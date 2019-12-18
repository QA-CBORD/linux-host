import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ApplicationStatus, ApplicationDetails, PatronApplication } from '../applications.model';

@Component({
  selector: 'st-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListComponent {
  @Input() applications: ApplicationDetails[];

  @Output() clear: EventEmitter<number> = new EventEmitter<number>();

  trackById(_: number, application: ApplicationDetails): number {
    return application.applicationDefinition.key;
  }

  getApplicationStatus(application: PatronApplication): string {
    if (!application) {
      return ApplicationStatus[ApplicationStatus.New];
    }

    return ApplicationStatus[application.status];
  }
}
