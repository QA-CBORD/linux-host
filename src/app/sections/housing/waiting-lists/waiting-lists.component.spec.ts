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
});
