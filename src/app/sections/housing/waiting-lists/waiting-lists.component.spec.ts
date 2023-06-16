import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { WaitingListStateService } from './waiting-list-state.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '../housing.service';
import { WaitingListsService } from './waiting-lists.service';
import { ToastService } from '@core/service/toast/toast.service';
import { WaitingList } from './waiting-lists.model';
import { WaitingListsComponent } from './waiting-lists.component';

describe('WaitingListsComponent', () => {
  let component: WaitingListsComponent;
  let fixture: ComponentFixture<WaitingListsComponent>;

  beforeEach(() => {
    const alertControllerStub = () => ({
      create: object => ({
        dismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const platformStub = () => ({ pause: { subscribe: f => f({}) } });
    const waitingListStateServiceStub = () => ({});
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const housingServiceStub = () => ({
      goToDashboard: () => ({}),
      refreshDefinitions: () => ({})
    });
    const waitingListsServiceStub = () => ({
      removeFromWaitingList: patronWaitingListKey => ({ subscribe: f => f({}) })
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WaitingListsComponent],
      providers: [
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: Platform, useFactory: platformStub },
        {
          provide: WaitingListStateService,
          useFactory: waitingListStateServiceStub
        },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: WaitingListsService, useFactory: waitingListsServiceStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    fixture = TestBed.createComponent(WaitingListsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('removePatronWaitingList', () => {
    it('makes expected calls', () => {
      const alertControllerStub: AlertController = fixture.debugElement.injector.get(
        AlertController
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const housingServiceStub: HousingService = fixture.debugElement.injector.get(
        HousingService
      );
      const waitingListsServiceStub: WaitingListsService = fixture.debugElement.injector.get(
        WaitingListsService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      const waitingListStub: WaitingList = <any>{};
     jest.spyOn(alertControllerStub, 'create');
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
     jest.spyOn(housingServiceStub, 'goToDashboard');
     jest.spyOn(housingServiceStub, 'refreshDefinitions');
     jest.spyOn(waitingListsServiceStub, 'removeFromWaitingList');
     jest.spyOn(toastServiceStub, 'showToast');
      component.removePatronWaitingList(waitingListStub);
      expect(alertControllerStub.create).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(housingServiceStub.goToDashboard).toHaveBeenCalled();
      expect(housingServiceStub.refreshDefinitions).toHaveBeenCalled();
      expect(waitingListsServiceStub.removeFromWaitingList).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
    });
  });
});
