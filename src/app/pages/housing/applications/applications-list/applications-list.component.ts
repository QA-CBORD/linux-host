import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { IonItemSliding } from '@ionic/angular';

import { Application, ApplicationStatus } from '../applications.model';

@Component({
  selector: 'st-applications-list',
  templateUrl: './applications-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListComponent {
  constructor(@Inject(LOCALE_ID) private _localId: string) {}

  @Input() applications: Application[];

  @Output() clear: EventEmitter<number> = new EventEmitter<number>();

  trackById(_: number, application: Application): number {
    return application.applicationDefinitionId;
  }

  getApplicationStatus(application: Application): string {
    if (application.isApplicationSubmitted) {
      return application.submittedDateTime
        ? `${ApplicationStatus[ApplicationStatus.Submitted]}:  ${formatDate(
            application.submittedDateTime,
            'MMM/dd/yyyy',
            this._localId
          )}`
        : ApplicationStatus[ApplicationStatus.Submitted];
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
