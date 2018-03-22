import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MessageResponse } from "../../models/service/message-response.interface";
import { UserInfo } from "../../models/user/user-info.interface"


@Injectable()
export class ContentServiceProvider extends GETService {

  private serviceURL: string = '/json/user';
  
    constructor(public http: Http) {
      super();
    }

    public retrieveString(sessionId: string, institutionId: string, locale: string, domain: string, category: string, name: string): Observable<MessageResponse<UserInfo>> {
      
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
      
          return this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
            .map(this.extractData)
            .do(this.logData)
            .catch(this.handleError);
    }

    public retrieveStringList(sessionId: string, institutionId: string, locale: string, domain: string, category: string): Observable<MessageResponse<UserInfo>> {
      
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
  
      return this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .catch(this.handleError);
  }
  
  public retrieveStringListByInstitutionDomainCategories(sessionId: string, institutionId: string, locale: string, domain_categories: string[]): Observable<MessageResponse<UserInfo>> {
      
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

    return this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError);
  }


}
