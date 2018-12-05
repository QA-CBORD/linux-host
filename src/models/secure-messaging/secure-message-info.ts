

export interface SecureMessageInfo {
    id: string;                             /// uuid
    replied_message_id: string;             /// uuid
    recipient: SecureMessageAddressInfo;    
    sender: SecureMessageAddressInfo;
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
    version: number;
}

export interface SecureMessageGroupInfo {
    id: string;
    name: string;
    inter_name: string;
    description: string;
    created_date: string;
    version: number;
}

export interface SecureMessageGroupMemeberInfo {
    id: string;
    message_group_id: string;
    member_id: string;
    aux_id: string;
    name: string;
    created_date: string;
    version: number;
}


export interface SecureMessageAddressInfo {
    id: string;
    type: string; /// 'patron' or 'group'
    id_field: string;
    id_value: string;
    aux_user_id: string;
    name: string;
    created_date: string;
    version: number;
}