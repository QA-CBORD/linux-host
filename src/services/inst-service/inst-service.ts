import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MessageResponse } from "../../models/service/message-response.interface";
import { InstitutionInfoList } from "../../models/institution/institution-info-list.interface";
import { InstitutionInfo } from "../../models/institution/institution-info.interface";


@Injectable()
export class InstService extends GETService {

  private serviceUrl: string = '/json/institution';

  public getInstitutionList(): Observable<InstitutionInfoList> {

    return Observable.create((observer: any) => {

      let postParams = {
        method: 'retrieveLookupList',
        params: {
          sessionId: GETService.getSessionId()
        }
      };

      console.log(JSON.stringify(postParams));

      this.httpPost(this.serviceUrl, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
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

      this.httpPost(this.serviceUrl, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });
  }


}
