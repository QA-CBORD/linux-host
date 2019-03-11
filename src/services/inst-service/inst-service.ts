import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService, ServiceParameters } from "../get-service/get-service";

import { MInstitutionInfoList } from "../../models/institution/institution-info-list.interface";
import { MInstitutionInfo } from "../../models/institution/institution-info.interface";


@Injectable()
export class InstService extends GETService {

  private serviceUrl: string = '/json/institution';


  /**
   * Get the list of Institutions
   */
  public getInstitutionList(): Observable<MInstitutionInfoList> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {};

      this.httpRequest(this.serviceUrl, 'retrieveLookupList', true, postParams)
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

  /**
   * Get Institution information
   * 
   * @param institutionId Institution Id of desired Institution Information 
   */
  public getInstitutionInfo(institutionId): Observable<MInstitutionInfo> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {
        institutionId: institutionId
      };

      this.httpRequest(this.serviceUrl, 'retrieve', true, postParams)
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
