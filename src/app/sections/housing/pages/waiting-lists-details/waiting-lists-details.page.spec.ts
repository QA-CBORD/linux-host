import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { FormGroup } from "@angular/forms";
import { ToastService } from "@core/service/toast/toast.service";
import { LoadingService } from "@core/service/loading/loading.service";
import { HousingService } from "../../housing.service";
import { WaitingListDetails } from "@sections/housing/waiting-lists/waiting-lists.model";
import { WaitingListsService } from "../../waiting-lists/waiting-lists.service";
import { WaitingListStateService } from "../../waiting-lists/waiting-list-state.service";
import { WaitingListsDetailsPage } from "./waiting-lists-details.page";

describe("WaitingListsDetailsPage", () => {
  let component: WaitingListsDetailsPage;
  let fixture: ComponentFixture<WaitingListsDetailsPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const routerStub = () => ({});
    const toastControllerStub = () => ({});
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const housingServiceStub = () => ({
      getWaitList: waitingKey => ({ pipe: () => ({}) }),
      goToDashboard: () => ({}),
      handleErrors: error => ({})
    });
    const waitingListsServiceStub = () => ({
      submitWaitingList: (applicationKey, formValue) => ({
        subscribe: f => f({})
      }),
      getQuestions: waitingKey => ({}),
      next: formValue => ({ subscribe: f => f({}) })
    });
    const waitingListStateServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WaitingListsDetailsPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: ToastController, useFactory: toastControllerStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: WaitingListsService, useFactory: waitingListsServiceStub },
        {
          provide: WaitingListStateService,
          useFactory: waitingListStateServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(WaitingListsDetailsPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
});
