

export interface MSecureMessageInfo {
    id: string;                             /// uuid
    replied_message_id: string;             /// uuid
    recipient: MSecureMessageAddressInfo;
    sender: MSecureMessageAddressInfo;
    institution_id: string;                 /// uuid
    sent_date: string;
    read_date: string;
    ttl: number;
    description: string;
    body: string;
    state: number;
    requires_read_receipt: boolean;
    importance: number;
    created_date: string;
    version?: number;
}

export interface MSecureMessageGroupInfo {
    id: string;
    name: string;
    inter_name: string;
    description: string;
    created_date?: string;
    version?: number;
}

export interface MSecureMessageGroupMemeberInfo {
    id?: string;
    message_group_id: string;
    member_id: string;
    aux_id?: string;
    name: string;
    created_date?: string;
    version?: number;
}


export interface MSecureMessageAddressInfo {
    id?: string;
    type: string; /// 'patron' or 'group'
    id_field: string;
    id_value: string;
    aux_user_id?: string;
    name: string;
    created_date?: string;
    version?: number;
}

export interface MSecureMessageConversation {
    institutionId: string;
    groupIdValue: string;
    groupName: string;
    groupDescription: string;
    myIdValue: string;
    messages: MSecureMessageInfo[];
    selected: boolean;
}

export interface MSecureMessageSendBody {
    institution_id: string;
    sender: {
        type: string; /// patron or group
        id_field: string;
        id_value: string;
        name: string;
    };
    recipient: {
        type: string; /// patron or group
        id_value: string;
        name: string;
    };
    description: string;
    body: string;
    importance: string;
}
