import { Component } from '@angular/core';

import { ContractlistService } from '../../services/contractlist.service';
import { ApplicationlistService } from '../../services/applicationlist.service';

import { Applications } from '../../Models/application-list';

@Component({
  selector: 'st-housing-dashboard',
  templateUrl: './housing-dashboard.page.html',
  styleUrls: ['./housing-dashboard.page.scss'],
})
export class HousingDashboardPage {
  applicationList: Applications[] = [];
  patronId: number;
  termId: number;
  // contractsList: Contracts[] = []
  constructor(private appServ: ApplicationlistService, private contractServ: ContractlistService) {}

  ngOnInit() {
    // this.contractsList = this.contractServ.GetContractsFromRescenter(1);
  }

  GetData() {
    const apps = this.appServ.GetApplicationsFromRescenter(this.patronId, this.termId);
    apps.subscribe(x => this.applicationList = x);
  }

  GetApplicationStatus(app: Applications): string {
    let appStatus: string;
    if (app.isApplicationAccepted ) {
      appStatus = 'Accepted';
    } else if (app.isApplicationSubmitted) {
      appStatus = 'Submitted';
    } else if (app.isApplicationCanceled) {
      appStatus = 'Canceled';
    } else {
      appStatus = ((new Date(app.createdDateTime)).getFullYear() == 1 ? 'New' : 'Pending');
    }
    return appStatus;
  }

  GetApplicationModificationDate(app: Applications): string {
    let returnVal: string;
    if (app.isApplicationAccepted) {
      returnVal = (new Date(app.acceptedDateTime)).toDateString();
    } else if (app.isApplicationSubmitted) {
      returnVal = (new Date(app.submittedDateTime)).toDateString();
    } else if (app.isApplicationCanceled) {
      returnVal = (new Date(app.cancelledDateTime)).toDateString();
    } else if (app.modifiedDate !== '') {
      returnVal = (new Date(app.modifiedDate)).toDateString();
    } else {
      returnVal = '';
    }
    return returnVal;
  }
}
