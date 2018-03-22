import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MessageResponse } from "../../models/service/message-response.interface";
import { UserInfo } from "../../models/user/user-info.interface"


@Injectable()
export class UserService extends GETService {

  private serviceURL: string = '/json/user';
  
    constructor(public http: Http) {
      super();
    }

  public getUser(sessionId): Observable<MessageResponse<UserInfo>> {
    
        let postParams = {
          method: 'retrieve',
          params: {
            sessionId: sessionId
          }
        };
    
        console.log(JSON.stringify(postParams));
    
        return this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
          .map(this.extractData)
          .do(this.logData)
          .catch(this.handleError);

    }
    

}
