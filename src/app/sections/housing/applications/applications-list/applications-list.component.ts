import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { IonItemSliding } from '@ionic/angular';

import { ApplicationStatus, ApplicationDetails, PatronApplication } from '../applications.model';

@Component({
  selector: 'st-applications-list',
  templateUrl: './applications-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListComponent {
  constructor(@Inject(LOCALE_ID) private _localId: string) {}

  @Input() applications: ApplicationDetails[];

  @Output() clear: EventEmitter<number> = new EventEmitter<number>();

  isSubmitted(application: PatronApplication): boolean {
    return application ? application.status === ApplicationStatus.Submitted : false;
  }

  trackById(_: number, application: ApplicationDetails): number {
    return application.applicationDefinition.key;
  }

  getApplicationStatus(application: PatronApplication): string {
    if (!application) {
      return ApplicationStatus[ApplicationStatus.New];
    }

    if (application.status === ApplicationStatus.Submitted) {
      return `Submitted: ${formatDate(application.submittedDateTime, 'MMM/dd/yyyy', this._localId)}`;
    }

    return ApplicationStatus[application.status];
  }

  handleClear(applicationKey: number, applicationSlide: IonItemSliding): void {
    this.clear.emit(applicationKey);

    applicationSlide.close();
  }
}
