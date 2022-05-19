import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ROLES } from 'src/app/app.global'
import { ApplicationStatus, ApplicationDetails, PatronApplication } from '../applications.model';

@Component({
  selector: 'st-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListComponent {
  @Input() applications: ApplicationDetails[];

  getPath(key: number): string {
    return `${ROLES.patron}/housing/applications/${key}`;
  }

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
