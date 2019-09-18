import { Injectable } from '@angular/core';
import { Applications } from '../Models/application-list';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationlistService {

  constructor(private http: HttpClient) { }

  retrievedApplications: Applications[] = [];

  GetApplicationsFromRescenter(patronId: number, termId: number): Observable<Applications[]> {
    // Call RC to get the list of application for this particular patron id
    const apiUrl = environment.baseUrl + 'api/patrons/v.1.0/patron-applications/' + patronId + '/term/' + termId;
    const apps = this.http.get(apiUrl).pipe(map(x => this.ConvertApplicationsJSONToModelObjects(x)));
    apps.subscribe(x => this.retrievedApplications = x).unsubscribe();
    return apps;
  }

  RetrieveApplicationById(appId: number): Applications {
    if (this.retrievedApplications.length > 0) {
      // const result = this.retrievedApplications.filter(app => app.applicationDefinitionId == appId);
      // return result[0];
      return this.retrievedApplications[0];
     }
  }

  private ConvertApplicationsJSONToModelObjects(appData: any): Applications[] {
    // const parsedData = JSON.parse(jsonData);
    const app: Applications[] = [];
    app.push(new Applications(
      appData.data[0].applicationDefinitionId,
      appData.data[0].createdDateTime,
      appData.data[0].submittedDateTime,
      appData.data[0].acceptedDateTime,
      appData.data[0].cancelledDateTime,
      appData.data[0].modifiedDate,
      appData.data[0].patronId,
      appData.data[0].isApplicationSubmitted,
      appData.data[0].isApplicationAccepted,
      appData.data[0].isApplicationCanceled,
      appData.data[0].applicationTitle,
      appData.data[0].applicationTerm));
    return app;
  }
}
