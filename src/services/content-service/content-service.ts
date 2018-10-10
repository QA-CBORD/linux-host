import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { UserInfo } from "../../models/user/user-info.interface"


@Injectable()
export class ContentService extends GETService {

  private serviceUrl: string = '/json/user';

  public retrieveString(sessionId: string, institutionId: string, locale: string, domain: string, category: string, name: string): Observable<UserInfo> {

    return Observable.create((observer: any) => {

      let postParams = {
        method: 'retrieveString',
        params: {
          sessionId: sessionId,
          institutionId: institutionId,
          locale: locale,
          domain: domain,
          category: category,
          name: name
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

  public retrieveStringList(sessionId: string, institutionId: string, locale: string, domain: string, category: string): Observable<UserInfo> {

    return Observable.create((observer: any) => {

      let postParams = {
        method: 'retrieveStringList',
        params: {
          sessionId: sessionId,
          institutionId: institutionId,
          locale: locale,
          domain: domain,
          category: category
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

  public retrieveStringListByInstitutionDomainCategories(sessionId: string, institutionId: string, locale: string, domain_categories: string[]): Observable<UserInfo> {

    return Observable.create((observer: any) => {

      let postParams = {
        method: 'retrieveStringListByInstitutionDomainCategories',
        params: {
          sessionId: sessionId,
          institutionId: institutionId,
          locale: locale,
          domain_categories: domain_categories,
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
