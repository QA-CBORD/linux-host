

export interface SecureMessageInfo {
    id: string;
    originalMessageId: string;
    repliedMessagId: string;
    recipient: any;
    recipientName: string;
    institutionId: string;
    sender: any;
    senderName: string;
    sentDate: Date;
    ttl: number;
    description: string;
    body: string;
    state: any;
    requiresReadReceipt: boolean;
    importance: any;
    readDate: Date;
}