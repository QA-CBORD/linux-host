import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { UserFacadeService } from "@core/facades/user/user.facade.service";
import { PopoverController } from "@ionic/angular";
import { GlobalNavService } from "@shared/ui-components/st-global-navigation/services/global-nav.service";
import { SecureMessagingFacadeService } from "@core/facades/secure-messaging/secure-messaging.facade.service";
import { SecureMessageGroupInfo } from "@core/model/secure-messaging/secure-messaging.model";
import { MarkAsReadVal } from "@core/model/secure-messaging/secure-messaging.model";
import { SecureMessageTypes } from "@core/model/secure-messaging/secure-messaging.model";
import { getConversationGroupInitial } from "@core/utils/conversations-helper";
import { getConversationGroupName } from "@core/utils/conversations-helper";
import { getConversationDescription } from "@core/utils/conversations-helper";
import { generateColorHslFromText } from "@core/utils/colors-helper";
import { FormsModule } from "@angular/forms";
import { SegureMessageChatPageComponent } from "./segure-message-chat.page.component";

describe("SegureMessageChatPageComponent", () => {
  let component: SegureMessageChatPageComponent;
  let fixture: ComponentFixture<SegureMessageChatPageComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const userFacadeServiceStub = () => ({
      getUserData$: () => ({ subscribe: f => f({}) })
    });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const globalNavServiceStub = () => ({});
    const secureMessagingFacadeServiceStub = () => ({
      conversationsArray$: { subscribe: f => f({}) },
      getInitialData$: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      clearSelectedConversation: () => ({}),
      startConversation: group => ({}),
      sendSecureMessage: message => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      markAsRead: body => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      requestForNewMessagesAndGroups$: {},
      mapToStorage: arg => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SegureMessageChatPageComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: GlobalNavService, useFactory: globalNavServiceStub },
        {
          provide: SecureMessagingFacadeService,
          useFactory: secureMessagingFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(SegureMessageChatPageComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`senderType has default value`, () => {
    expect(component.senderType).toEqual(SecureMessageTypes);
  });

  it(`getConversationGroupInitial has default value`, () => {
    expect(component.getConversationGroupInitial).toEqual(
      getConversationGroupInitial
    );
  });

  it(`getConversationGroupName has default value`, () => {
    expect(component.getConversationGroupName).toEqual(
      getConversationGroupName
    );
  });

  it(`getConversationDescription has default value`, () => {
    expect(component.getConversationDescription).toEqual(
      getConversationDescription
    );
  });

  it(`getAvatarBackgroundColor has default value`, () => {
    expect(component.getAvatarBackgroundColor).toEqual(
      generateColorHslFromText
    );
  });

  describe("onClickMakeNewConversation", () => {
    it("makes expected calls", () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const secureMessagingFacadeServiceStub: SecureMessagingFacadeService = fixture.debugElement.injector.get(
        SecureMessagingFacadeService
      );
      const secureMessageGroupInfoStub: SecureMessageGroupInfo = <any>{};
     jest.spyOn(changeDetectorRefStub, "detectChanges");
     jest.spyOn(
        secureMessagingFacadeServiceStub,
        "startConversation"
      );
      component.onClickMakeNewConversation(secureMessageGroupInfoStub);
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(
        secureMessagingFacadeServiceStub.startConversation
      ).toHaveBeenCalled();
    });
  });

  describe("markAsRead", () => {
    it("makes expected calls", () => {
      const secureMessagingFacadeServiceStub: SecureMessagingFacadeService = fixture.debugElement.injector.get(
        SecureMessagingFacadeService
      );
      const markAsReadValStub: MarkAsReadVal = <any>{};
     jest.spyOn(component, "modalHandler");
     jest.spyOn(secureMessagingFacadeServiceStub, "markAsRead");
     jest.spyOn(secureMessagingFacadeServiceStub, "mapToStorage");
      component.markAsRead(markAsReadValStub);
      expect(component.modalHandler).toHaveBeenCalled();
      expect(secureMessagingFacadeServiceStub.markAsRead).toHaveBeenCalled();
      expect(secureMessagingFacadeServiceStub.mapToStorage).toHaveBeenCalled();
    });
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(changeDetectorRefStub, "detectChanges");
      component.ngOnInit();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe("ionViewWillLeave", () => {
    it("makes expected calls", () => {
      const secureMessagingFacadeServiceStub: SecureMessagingFacadeService = fixture.debugElement.injector.get(
        SecureMessagingFacadeService
      );
     jest.spyOn(
        secureMessagingFacadeServiceStub,
        "getInitialData$"
      );
      component.ionViewWillLeave();
      expect(
        secureMessagingFacadeServiceStub.getInitialData$
      ).toHaveBeenCalled();
    });
  });

  describe("ngOnDestroy", () => {
    it("makes expected calls", () => {
      const secureMessagingFacadeServiceStub: SecureMessagingFacadeService = fixture.debugElement.injector.get(
        SecureMessagingFacadeService
      );
     jest.spyOn(component, "markAsRead");
     jest.spyOn(
        secureMessagingFacadeServiceStub,
        "clearSelectedConversation"
      );
      component.ngOnDestroy();
      expect(component.markAsRead).toHaveBeenCalled();
      expect(
        secureMessagingFacadeServiceStub.clearSelectedConversation
      ).toHaveBeenCalled();
    });
  });

  describe("showCreateNewConversationColumn", () => {
    it("makes expected calls", () => {
     jest.spyOn(
        component,
        "showSelectedConversationContentColumn"
      );
      component.showCreateNewConversationColumn();
      expect(
        component.showSelectedConversationContentColumn
      ).toHaveBeenCalled();
    });
  });

  describe("onClickSendButton", () => {
    it("makes expected calls", () => {
      const userFacadeServiceStub: UserFacadeService = fixture.debugElement.injector.get(
        UserFacadeService
      );
     jest.spyOn(component, "modalHandler");
     jest.spyOn(userFacadeServiceStub, "getUserData$");
      component.onClickSendButton();
      expect(component.modalHandler).toHaveBeenCalled();
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
    });
  });
});
