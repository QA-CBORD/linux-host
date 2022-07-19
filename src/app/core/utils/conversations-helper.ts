import {
  SecureMessageConversation,
  SecureMessageConversationListItem,
  SecureMessageGroupInfo,
  SecureMessageInfo,
  SecureMessageTypes,
  SecureMessagingAuthInfo,
} from '@sections/secure-messaging/models';

/**
 * UI helper method to set group name initals
 * @param groupName Name to get initials from
 */
export const getConversationGroupInitial = (groupName: string): string =>
  groupName == null || groupName.length < 1 ? 'U' : groupName[0];

/**
 * UI helper method to set group name
 * @param conversation conversation to get data for ui
 */
export const getConversationGroupName = ({ groupName }: SecureMessageConversation): string =>
  groupName == null ? 'Conversation' : groupName;

/**
 * UI helper method to set description text for conversation
 * (this gets the most recently sent message)
 * @param conversation conversation to get data for ui
 */
export const getConversationDescription = ({ messages }: SecureMessageConversation): string => {
  if (noPreviousMessages(messages)) return 'You: ';
  const lastIMessage: SecureMessageInfo = messages[messages.length - 1];
  const frontText: string = lastIMessage.sender.type === SecureMessageTypes.PATRON ? 'You: ' : '';

  return frontText + lastIMessage.body;
};

/**
 * Helper method to build conversation list out of the messages array
 * and uses the group list to get the message group info
 * @param messages messages to build conversations
 * @param groups groups to build conversation group info
 * @param secureMessagingAuthInfo auth info to build conversations
 */
export const buildConversationsFromMessages = (
  messages: SecureMessageInfo[],
  groups: SecureMessageGroupInfo[],
  { institution_id, id_value }: SecureMessagingAuthInfo
): SecureMessageConversation[] => {
  const tempConversations: SecureMessageConversation[] = [];
  // TODO: Reduce method complexity. Avoid nested arrays.

  /// create 'conversations' out of message array
  for (const message of messages) {
    message.sent_date = new Date(message.sent_date).toString();

    let bNewConversation = true;

    /// add to existing conversation if it exists
    for (const convo of tempConversations) {
      if (!bNewConversation) {
        break;
      }

      if (
        convo.groupIdValue &&
        convo.groupIdValue.length &&
        (convo.groupIdValue === message.sender.id_value || convo.groupIdValue === message.recipient.id_value)
      ) {
        convo.messages.push(message);
        bNewConversation = false;
      }
    }

    /// create new conversation
    if (bNewConversation) {
      let newGroupName = '';
      let newGroupId = '';
      let newGroupDescription = '';

      if (message.sender.type === SecureMessageTypes.GROUP) {
        newGroupName = message.sender.name;
        newGroupId = message.sender.id_value;
      } else {
        newGroupName = message.recipient.name;
        newGroupId = message.recipient.id_value;
      }

      newGroupDescription = message.description;

      /// try to get proper group info
      for (const group of groups) {
        if (group.id === newGroupId) {
          newGroupName = group.name;
          newGroupDescription = group.description;
        }
      }

      const conversation = createConversation(institution_id, newGroupName, newGroupId, newGroupDescription, id_value);
      conversation.messages.push(message);
      tempConversations.push(conversation);
    }
  }

  if (noPreviousMessages(messages)) {
    const conversation = createConversation(
      institution_id,
      groups[0].name,
      groups[0].id,
      groups[0].description,
      id_value
    );
    tempConversations.push(conversation);
  }

  tempConversations.sort(sortConversations);
  return tempConversations;
};

/**
 * Sort conversations by most current for display
 */
const sortConversations = (a, b) => {
  if (a.messages === null) {
    return 1;
  }
  if (b.messages === null) {
    return -1;
  }
  if (a.messages.length === 0) {
    return 1;
  }
  if (b.messages.length === 0) {
    return -1;
  }

  if (
    new Date(a.messages[a.messages.length - 1].sent_date).getTime() <
    new Date(b.messages[b.messages.length - 1].sent_date).getTime()
  ) {
    return 1;
  }

  if (
    new Date(a.messages[a.messages.length - 1].sent_date).getTime() >
    new Date(b.messages[b.messages.length - 1].sent_date).getTime()
  ) {
    return -1;
  }

  return 0;
};

export const mapConversationToListItem = (
  conversation: SecureMessageConversation
): SecureMessageConversationListItem => {
  const groupName = getConversationGroupName(conversation);
  return {
    groupInitial: getConversationGroupInitial(groupName),
    description: getConversationDescription(conversation),
    groupName,
    conversation,
  };
};
function noPreviousMessages(messages: SecureMessageInfo[]) {
  return !messages.length;
}

function createConversation(
  institution_id: string,
  newGroupName: string,
  newGroupId: string,
  newGroupDescription: string,
  id_value: string
): SecureMessageConversation {
  return {
    institutionId: institution_id,
    groupName: newGroupName,
    groupIdValue: newGroupId,
    groupDescription: newGroupDescription,
    myIdValue: id_value,
    messages: [],
  };
}
