import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SecureMessageConversationListItem, SecureMessageConversation, SecureMessageTypes, SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { generateColorHslFromText } from '@core/utils/colors-helper';
import { mapConversationToListItem } from '@core/utils/conversations-helper';
@Component({
  selector: 'st-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationItemComponent {
  conversationItem: SecureMessageConversationListItem;
  avatarBackgroundColor: string;
  senderType = SecureMessageTypes;
  @Input('conversation') set _conversationItem(conversation: SecureMessageConversation) {
    this.conversationItem = mapConversationToListItem(conversation);
    this.avatarBackgroundColor = generateColorHslFromText(this.conversationItem.groupName);
  }

  @Output() conversationSelected: EventEmitter<SecureMessageConversation> = new EventEmitter();

  onConversationSelected() {
    this.conversationSelected.emit(this.conversationItem.conversation);
  }
  isUnread(message:SecureMessageInfo){
    return !message.read_date && message.sender.type === SecureMessageTypes.GROUP
  }
}
