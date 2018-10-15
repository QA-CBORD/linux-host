import { Injectable } from "@angular/core";

import { APIService, HttpResponseType, RestCallType } from './../api-service/api-service';
import { HttpHeaders } from "@angular/common/http";



@Injectable()
export class SecureMessagingService {

    private serviceUrl: string = '/secureMessaging';

    constructor(
        private apiService: APIService) {
    }

    private newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }

    public testSecureMessaging() {

        
            
        

        this.apiService.authenticatedHTTPCall(RestCallType.post, this.serviceUrl, HttpResponseType.json, 
        {
            'id': this.newGuid(),
            'originalMessageId': null,
            'recipient': "1234",
            'sender': "9999",
            'sentDate': "2018-10-09T11:47:00",
            'ttl': null,
            'messageDescription': "Test Message",
            'messageBody': "A wonderful test message body",
            'state': null,
            'importance': null,
            'readDate': null
        }, 
        undefined, 
        new HttpHeaders())
        .subscribe(
            response => {
                console.log("SecureMessaging - SUCCESS:");
                console.log(response);
            },
            error => {
                console.log("SecureMessaging - ERROR");
                console.log(error);
            }
        );

    }

}