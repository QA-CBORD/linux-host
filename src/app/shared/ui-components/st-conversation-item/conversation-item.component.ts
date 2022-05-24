import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { generateColorHslFromText } from '@core/utils/colors-helper';
import { mapConversationToListItem } from '@core/utils/conversations-helper';
import { SecureMessageConversation, SecureMessageConversationListItem } from '@sections/secure-messaging';

@Component({
  selector: 'st-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationItemComponent {
  conversationItem: SecureMessageConversationListItem;
  avatarBackgroundColor: string;

  @Input('conversation') set _conversationItem(conversation: SecureMessageConversation) {
    this.conversationItem = mapConversationToListItem(conversation);
    this.avatarBackgroundColor = generateColorHslFromText(this.conversationItem.groupName);
  }

  @Output() conversationSelected: EventEmitter<SecureMessageConversation> = new EventEmitter();

  onConversationSelected() {
    this.conversationSelected.emit(this.conversationItem.conversation);
  }
}
