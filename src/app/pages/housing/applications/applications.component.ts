import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ApplicationsService } from './applications.service';

import { Application, ApplicationStatus } from './applications.model';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _changeDetector: ChangeDetectorRef,
    private _applicationsService: ApplicationsService
  ) {}

  applicationsForm: FormGroup;

  applications: Application[];

  ngOnInit() {
    this._initForm();

    this.getApplications();
  }

  getApplications() {
    this._applicationsService.getApplications().subscribe(this._handleSuccess.bind(this));
  }

  // getApplicationStatus(application: Application): string {
  //   if (application.isApplicationAccepted) {
  //     return ApplicationStatus.Accepted;
  //   } else if (application.isApplicationSubmitted) {
  //     return ApplicationStatus.Submitted;
  //   } else if (application.isApplicationCanceled) {
  //     return ApplicationStatus.Canceled;
  //   } else if (new Date(application.createdDateTime).getFullYear() === 1) {
  //     return ApplicationStatus.New;
  //   } else {
  //     return ApplicationStatus.Pending;
  //   }
  // }

  // getApplicationModificationDate(application: Application): string {
  //   if (application.isApplicationAccepted) {
  //     return new Date(application.acceptedDateTime).toDateString();
  //   } else if (application.isApplicationSubmitted) {
  //     return new Date(application.submittedDateTime).toDateString();
  //   } else if (application.isApplicationCanceled) {
  //     return new Date(application.cancelledDateTime).toDateString();
  //   } else if (application.modifiedDate !== '') {
  //     return new Date(application.modifiedDate).toDateString();
  //   } else {
  //     return '';
  //   }
  // }

  // isNotPending(application: Application): boolean {
  //   return this.getApplicationStatus(application) !== ApplicationStatus.Pending;
  // }

  // isNotNewAndNotPending(application: Application): boolean {
  //   return this.getApplicationStatus(application) !== ApplicationStatus.New && this.isNotPending(application);
  // }

  trackById(_: number, application: Application): number {
    return application.id;
  }

  private _initForm(): void {
    this.applicationsForm = this._formBuilder.group({
      patronId: null,
      termId: null,
    });
  }

  private _handleSuccess(applications: Application[]): void {
    this.applications = applications;
    this._changeDetector.markForCheck();
  }
}
