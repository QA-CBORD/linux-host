import { SecureMessageConversation, SecureMessageInfo } from '@sections/secure-messaging/models';

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
