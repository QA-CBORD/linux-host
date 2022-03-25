import { DatePipe } from '@angular/common';
import {
  SecureMessageConversation,
  SecureMessageConversationListItem,
  SecureMessageGroupInfo,
  SecureMessageInfo,
  SecureMessagingAuthInfo,
} from '@sections/secure-messaging/models';
import { generateColorHslFromText } from './colors-helper';
import { checkIsYesterday } from './general-helpers';

export const messageSentDateToString = (sentDate: Date, datePipe: DatePipe) => {
  const today: Date = new Date();

    /// > 1 year (Full timestamp)
    if (today.getFullYear() > sentDate.getFullYear()) {
      return datePipe.transform(sentDate, 'mediumDate');
    }

    const timeDiff = today.getTime() - sentDate.getTime();

    /// > 5 days (<monthAbbv> <date>, xx:xx AM/PM)
    if (timeDiff > 432000000) {
      return datePipe.transform(sentDate, 'MMM d, h:mm a');
    }

    /// > 2 days (<dayAbbv> xx:xx AM/PM)
    if (timeDiff >= 172800000) {
      return datePipe.transform(sentDate, 'E, h:mm a');
    }

    /// > 1 day (Yesterday at xx:xx AM/PM)
    if (timeDiff >= 86400000 || checkIsYesterday(sentDate)) {
      return datePipe.transform(sentDate, "'Yesterday at ' h:mm a'");
    }

    /// > 5 minutes (xx:xx AM/PM)
    if (timeDiff > 300000) {
      return datePipe.transform(sentDate, 'h:mm a');
    }

    /// > 1 minute (x minutes ago)
    if (timeDiff > 60000) {
      const minutesAgo = Math.round(timeDiff / 60000);
      return minutesAgo.toString() + (minutesAgo === 1 ? ' minute ago' : ' minutes ago');
    }

    /// < 1 minute (Now)
    return 'Now';
};
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
  const lastIMessage: SecureMessageInfo = messages[messages.length - 1];
  const frontText: string = lastIMessage.sender.type === 'patron' ? 'You: ' : '';

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

      if (message.sender.type === 'group') {
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

      const conversation: SecureMessageConversation = {
        institutionId: institution_id,
        groupName: newGroupName,
        groupIdValue: newGroupId,
        groupDescription: newGroupDescription,
        myIdValue: id_value,
        messages: [],
        selected: false,
      };

      conversation.messages.push(message);
      tempConversations.push(conversation);
    }
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

export const mapConversationToListItem = (conversation: SecureMessageConversation): SecureMessageConversationListItem => {
  const groupName = getConversationGroupName(conversation);
  return {
    avatarBackgroundColor: generateColorHslFromText(groupName),
    groupInitial: getConversationGroupInitial(groupName),
    description: getConversationDescription(conversation),
    groupName,
    conversation,
  };
};

export const buildConversationListItemsFromConversations = (
  conversations: SecureMessageConversation[]
): SecureMessageConversationListItem[] => conversations.map(mapConversationToListItem);

export const buildConversationListItemsFromMessages = (
  messages: SecureMessageInfo[],
  groups: SecureMessageGroupInfo[],
  secureMessagingAuthInfo: SecureMessagingAuthInfo
): SecureMessageConversationListItem[] => {
  return buildConversationsFromMessages(messages, groups, secureMessagingAuthInfo).map(mapConversationToListItem);
};
