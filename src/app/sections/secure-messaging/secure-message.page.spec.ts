import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LoadingService } from '../../core/service/loading/loading.service';
import { Router } from '@angular/router';
import { SecureMessagingFacadeService } from '@core/facades/secure-messaging/secure-messaging.facade.service';
import { SecureMessageConversation } from '@core/model/secure-messaging/secure-messaging.model';
import { SecureMessagePage } from './secure-message.page';

describe('SecureMessagePage', () => {
  let component: SecureMessagePage;
  let fixture: ComponentFixture<SecureMessagePage>;

  beforeEach(() => {
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const loadingServiceStub = () => ({
      showSpinner: object => ({}),
      closeSpinner: () => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const secureMessagingFacadeServiceStub = () => ({
      conversationsArray$: { pipe: () => ({}) },
      getInitialData$: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      pollForDataInterval: () => ({ subscribe: f => f({}) }),
      setSelectedConversation: conversation => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SecureMessagePage],
      providers: [
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: Router, useFactory: routerStub },
        {
          provide: SecureMessagingFacadeService,
          useFactory: secureMessagingFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(SecureMessagePage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickConversation', () => {
    it('makes expected calls', () => {
      const secureMessagingFacadeServiceStub: SecureMessagingFacadeService = fixture.debugElement.injector.get(
        SecureMessagingFacadeService
      );
      const secureMessageConversationStub: SecureMessageConversation = <any>{};
     jest.spyOn(component, 'startConversation');
     jest.spyOn(
        secureMessagingFacadeServiceStub,
        'setSelectedConversation'
      );
      component.onClickConversation(secureMessageConversationStub);
      expect(component.startConversation).toHaveBeenCalled();
      expect(
        secureMessagingFacadeServiceStub.setSelectedConversation
      ).toHaveBeenCalled();
    });
  });

  describe('startConversation', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(routerStub, 'navigate');
      component.startConversation();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
