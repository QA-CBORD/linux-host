import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { SecureMessagingService } from "../../services/secure-messaging-service/secure-messaging-service";

import { SecureMessageInfo } from "../../models/secure-messaging/secure-message-info";


@Injectable()
export class SecureMessagingProvider {

    constructor(
        private secureMessageService: SecureMessagingService
    ) {
    }


    public sendSecureMessage(messageInfo: SecureMessageInfo): Observable<any> {

        return this.secureMessageService.postSecureMessage(messageInfo);

    }

    public getSecureMessages(): Observable<any> {

        return this.secureMessageService.getSecureMessages();

    }

    public getSecureMessagesGroup(): Observable<any> {
        return this.secureMessageService.getSecureMessagesGroup();
    }

    public testPostSecureMessage(): Observable<any> {

        let messageInfo: SecureMessageInfo = {
            id: this.newGuid(),
            originalMessageId: null,
            recipient: "1234",
            sender: "9999",
            sentDate: new Date(),
            ttl: null,
            description: "Test Message",
            body: "A wonderful test message body",
            state: null,
            importance: null,
            readDate: null,
            institutionId: null,
            recipientName: null,
            repliedMessagId: null,
            requiresReadReceipt: null,
            senderName: null
        };

        return this.secureMessageService.postSecureMessage(messageInfo);
    }

    private newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}