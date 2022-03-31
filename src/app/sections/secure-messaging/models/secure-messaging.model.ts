export interface SecureMessageInfo {
  id: string; /// uuid
  replied_message_id: string; /// uuid
  recipient: SecureMessageAddressInfo;
  sender: SecureMessageAddressInfo;
  institution_id: string; /// uuid
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

export interface SecureMessageGroupInfo {
  id: string;
  name: string;
  inter_name: string;
  description: string;
  created_date?: string;
  version?: number;
}

export interface SecureMessageGroupMemberInfo {
  id?: string;
  message_group_id: string;
  member_id: string;
  aux_id?: string;
  name: string;
  created_date?: string;
  version?: number;
}

export interface SecureMessageAddressInfo {
  id?: string;
  type: string; /// 'patron' or 'group'
  id_field: string;
  id_value: string;
  aux_user_id?: string;
  name: string;
  created_date?: string;
  version?: number;
}

export interface SecureMessageConversation {
  institutionId: string;
  groupIdValue: string;
  groupName: string;
  groupDescription: string;
  myIdValue: string;
  messages: SecureMessageInfo[];
}

export interface SecureMessageSendBody {
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

export interface SecureMessagingAuthInfo {
  id_field: string;
  role: string;
  iss: string;
  jwt_version: string;
  id_value: string;
  institution_id: string;
}

export interface SecureMessageConversationListItem {
  conversation: SecureMessageConversation;
  groupInitial: string;
  groupName: string;
  description: string;
}

export enum SecureMessageTypes {
  PATRON = 'patron',
  GROUP = 'group',
}
