import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ApplicationlistService } from './applicationlist.service';
import { Application } from './applications.model';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder, private appServ: ApplicationlistService) {}

  applicationsForm: FormGroup;

  applications: Application[];
  patronId: number;
  termId: number;

  ngOnInit() {
    this.applicationsForm = this._formBuilder.group({
      patronId: null,
      termId: null
    })
  }

  getApplications() {
    const apps = this.appServ.GetApplicationsFromRescenter(this.patronId, this.termId);
    apps.subscribe(x => (this.applications = x));
  }

  GetApplicationStatus(app: Application): string {
    let appStatus: string;
    if (app.isApplicationAccepted) {
      appStatus = 'Accepted';
    } else if (app.isApplicationSubmitted) {
      appStatus = 'Submitted';
    } else if (app.isApplicationCanceled) {
      appStatus = 'Canceled';
    } else {
      appStatus = new Date(app.createdDateTime).getFullYear() == 1 ? 'New' : 'Pending';
    }
    return appStatus;
  }

  GetApplicationModificationDate(app: Application): string {
    let returnVal: string;
    if (app.isApplicationAccepted) {
      returnVal = new Date(app.acceptedDateTime).toDateString();
    } else if (app.isApplicationSubmitted) {
      returnVal = new Date(app.submittedDateTime).toDateString();
    } else if (app.isApplicationCanceled) {
      returnVal = new Date(app.cancelledDateTime).toDateString();
    } else if (app.modifiedDate !== '') {
      returnVal = new Date(app.modifiedDate).toDateString();
    } else {
      returnVal = '';
    }
    return returnVal;
  }

  trackById(_: number, application: Application): number {
    return application.applicationDefinitionId;
  }
}
