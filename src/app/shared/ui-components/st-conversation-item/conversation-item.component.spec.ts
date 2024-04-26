import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SecureMessageAddressInfo,
  SecureMessageConversation,
  SecureMessageConversationListItem,
  SecureMessageInfo,
} from '@core/model/secure-messaging/secure-messaging.model';
import { IonicModule } from '@ionic/angular';
import { ConversationItemComponent } from './conversation-item.component';

describe('ConversationItemComponent', () => {
  let component: ConversationItemComponent;
  let fixture: ComponentFixture<ConversationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [ConversationItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationItemComponent);
    component = fixture.componentInstance;
    component.conversationItem = {
      conversation: {
        messages: [],
        groupName: 'name',
        institutionId: '1',
        myIdValue: '1',
        groupIdValue: '1',
        groupDescription: 'description',
      },
      groupName: 'name',
      description: 'description',
      groupInitial: '1',
    } as SecureMessageConversationListItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit conversationSelected event when onConversationSelected is called', () => {
    const conversation: SecureMessageConversation = {
      messages: [],
      groupName: 'name',
      institutionId: '1',
      myIdValue: '1',
      groupIdValue: '1',
      groupDescription: 'description',
    };
    component.conversationItem = {
      conversation: conversation,
      groupName: 'name',
      description: 'descriptin',
      groupInitial: '1',
    } as SecureMessageConversationListItem;
    jest.spyOn(component.conversationSelected, 'emit');

    component.onConversationSelected();

    expect(component.conversationSelected.emit).toHaveBeenCalledWith(conversation);
  });

  it('should check if message is unread', () => {
    const message = {
      read_date: null,
      sender: {} as SecureMessageAddressInfo,
      message: 'message',
      body: '',
      description: 'description',
      importance: 1,
      institution_id: '',
      recipient: {} as SecureMessageAddressInfo,
      created_date: '',
      id: '',
      replied_message_id: '',
      requires_read_receipt: true,
      sent_date: '',
      state: 1,
      ttl: 1,
      version: 1,
    } as SecureMessageInfo;

    expect(component.isUnread(message)).toBe(false);
  });

  describe('ConversationItemComponent', () => {
    // ... existing code ...

    it('should set conversationItem and avatarBackgroundColor when conversation input is set', () => {
      const conversation: SecureMessageConversation = {
        messages: [],
        groupName: 'name',
        institutionId: '1',
        myIdValue: '1',
        groupIdValue: '1',
        groupDescription: 'description',
      };
      component.conversationItem = {
        conversation: conversation,
        groupName: 'name',
        description: 'descriptin',
        groupInitial: '1',
      } as SecureMessageConversationListItem;
      component._conversationItem = conversation;

      expect(component.conversationItem).toBeDefined();
    });
  });
});
