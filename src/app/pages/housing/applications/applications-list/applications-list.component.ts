import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { PatronApplication, ApplicationStatus } from '../applications.model';

@Component({
  selector: 'st-applications-list',
  templateUrl: './applications-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListComponent {
  @Input() applications: PatronApplication[];

  @Output() clear: EventEmitter<number> = new EventEmitter<number>();

  trackById(_: number, application: PatronApplication): number {
    return application.applicationDefinitionId;
  }

  getApplicationStatus(application: PatronApplication): string {
    if (application.isApplicationSubmitted) {
      `${ApplicationStatus[ApplicationStatus.Submitted]}: ${application.submittedDateTime}`;
    } else if (application.isApplicationAccepted) {
      return ApplicationStatus[ApplicationStatus.Pending];
    }

    return ApplicationStatus[ApplicationStatus.New];
  }

  handleClear(applicationId: number, applicationSlide: IonItemSliding): void {
    this.clear.emit(applicationId);

    applicationSlide.close();
  }
}
