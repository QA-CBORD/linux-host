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

  isSubmitted(application: Application): boolean {
    return application.status === ApplicationStatus.Submitted;
  }

  trackById(_: number, application: Application): number {
    return application.key;
  }

  getApplicationStatus(application: Application): string {
    if (application.status === ApplicationStatus.Submitted) {
      return `Submitted: ${formatDate(application.submittedDateTime, 'MMM/dd/yyyy', this._localId)}`;
    }

    return ApplicationStatus[application.status];
  }

  handleClear(applicationId: number, applicationSlide: IonItemSliding): void {
    this.clear.emit(applicationId);

    applicationSlide.close();
  }
}
