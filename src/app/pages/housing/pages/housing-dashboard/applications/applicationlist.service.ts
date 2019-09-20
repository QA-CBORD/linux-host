import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Application } from './applications.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationlistService {
  constructor(private http: HttpClient) {}

  retrievedApplications: Application[] = [];

  GetApplicationsFromRescenter(patronId: number, termId: number): Observable<Application[]> {
    // Call RC to get the list of application for this particular patron id
    const baseUrl = (environment as any).baseUrl || '';
    const apiUrl = baseUrl + 'api/patrons/v.1.0/patron-applications/' + patronId + '/term/' + termId;
    const apps = this.http.get(apiUrl).pipe(map(x => this.ConvertApplicationsJSONToModelObjects(x)));
    apps.subscribe(x => (this.retrievedApplications = x)).unsubscribe();
    return apps;
  }

  RetrieveApplicationById(appId: number): Application {
    if (this.retrievedApplications.length > 0) {
      // const result = this.retrievedApplications.filter(app => app.applicationDefinitionId == appId);
      // return result[0];
      return this.retrievedApplications[0];
    }
  }

  private ConvertApplicationsJSONToModelObjects(appData: any): Application[] {
    const app: Application[] = [];
    const application: Application = appData.data[0];

    app.push(
      new Application(
        application.applicationDefinitionId,
        application.createdDateTime,
        application.submittedDateTime,
        application.acceptedDateTime,
        application.cancelledDateTime,
        application.modifiedDate,
        application.patronId,
        application.isApplicationSubmitted,
        application.isApplicationAccepted,
        application.isApplicationCanceled,
        application.applicationTitle,
        application.applicationTerm
      )
    );

    return app;
  }
}
