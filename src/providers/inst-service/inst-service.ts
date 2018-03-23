import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MessageResponse } from "../../models/service/message-response.interface";
import { InstitutionInfoList } from "../../models/institution/institution-info-list.interface";
import { InstitutionInfo } from "../../models/institution/institution-info.interface";


@Injectable()
export class InstService extends GETService {

  private serviceUrl: string = '/json/institution';

  constructor(public http: Http) {
    super();
  }

  public getInstitutionList(): Observable<InstitutionInfoList> {

    return Observable.create((observer: any) => {
      let postParams = {
        method: 'retrieveLookupList',
        params: {
          sessionId: GETService.getSessionId()
        }
      };

      console.log(JSON.stringify(postParams));

      this.http.post(this.baseUrl.concat(this.serviceUrl), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .subscribe(
          data => {
            observer.next(data.response);
            observer.complete();
          },
          error => {

            observer.error(error);
          }
        )
    });



  }

  public getInstitution(institutionId): Observable<InstitutionInfo> {

    return Observable.create((observer: any) => {

      let postParams = {
        method: 'retrieve',
        params: {
          sessionId: GETService.getSessionId(),
          institutionId: institutionId
        }
      };

      console.log(JSON.stringify(postParams));

      this.http.post(this.baseUrl.concat(this.serviceUrl), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .subscribe(
          data => {
            observer.next(data.response);
            observer.complete();
          },
          error => {

            observer.error(error);
          }
        )
    });

  }
}