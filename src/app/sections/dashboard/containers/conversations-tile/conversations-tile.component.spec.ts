import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SecureMessagingFacadeService } from '@core/facades/secure-messaging/secure-messaging.facade.service';
import { ConversationsTileComponent } from './conversations-tile.component';

describe('ConversationsTileComponent', () => {
  let component: ConversationsTileComponent;
  let fixture: ComponentFixture<ConversationsTileComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const secureMessagingFacadeServiceStub = () => ({
      getInitialData$: () => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConversationsTileComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        {
          provide: SecureMessagingFacadeService,
          useFactory: secureMessagingFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(ConversationsTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`lastTwoMessagesArray has default value`, () => {
    expect(component.lastTwoMessagesArray).toEqual([]);
  });

  it(`conversationDisplayedAmount has default value`, () => {
    expect(component.conversationDisplayedAmount).toEqual(2);
  });

  it(`conversationSkeletonArray has default value`, () => {
    expect(component.conversationSkeletonArray).toEqual([]);
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'initializePage');
      component.ngOnInit();
      expect(component.initializePage).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
      component.refresh();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe('initializePage', () => {
    it('makes expected calls', () => {
      const secureMessagingFacadeServiceStub: SecureMessagingFacadeService = fixture.debugElement.injector.get(
        SecureMessagingFacadeService
      );
     jest.spyOn(component, 'refresh');
     jest.spyOn(
        secureMessagingFacadeServiceStub,
        'getInitialData$'
      );
      component.initializePage();
      expect(component.refresh).toHaveBeenCalled();
      expect(
        secureMessagingFacadeServiceStub.getInitialData$
      ).toHaveBeenCalled();
    });
  });
});
