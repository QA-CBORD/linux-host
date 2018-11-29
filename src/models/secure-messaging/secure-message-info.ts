

export interface SecureMessageInfo {
    id: string;
    originalMessageId: string;
    repliedMessagId: string;
    recipient: string;
    recipientName: string;
    institutionId: string;
    sender: string;
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

export interface SecureMessageGroupInfo {
    id: string;
    name: string;
    internal_name: string;
    description: string;
    created_date: string; /// might need to be changed to date
    version: number;
    members: SecureMessageGroupMemeberInfo[]; 

}

export interface SecureMessageGroupMemeberInfo {
    id: string;
    member_id: string;
    aux_id: string;
    name: string;
    created_date: string; /// might need to be changed to date
    version: number;
}