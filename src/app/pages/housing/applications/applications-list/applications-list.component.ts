import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { QuestionsStorageService } from '../../questions/questions-storage.service';

import { PatronApplication, ApplicationStatus } from '../applications.model';

@Component({
  selector: 'st-applications-list',
  templateUrl: './applications-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListComponent {
  @Input() applications: PatronApplication[];

  @Output() clear: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _questionsStorageService: QuestionsStorageService) {}

  trackById(_: number, application: PatronApplication): number {
    return application.applicationDefinitionId;
  }

  async getApplicationStatus(application: PatronApplication): Promise<string> {
    const applicationForms: any[] = await this._questionsStorageService.getApplicationForms(
      application.applicationDefinitionId
    );

    if (application.isApplicationSubmitted) {
      return ApplicationStatus.Submitted;
    } else if (applicationForms && applicationForms.length > 0) {
      return ApplicationStatus.Pending;
    } else {
      return ApplicationStatus.New;
    }
  }

  handleClear(applicationId: number, applicationSlide: IonItemSliding): void {
    this.clear.emit(applicationId);

    applicationSlide.close();
  }
}
