import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { LoadingService } from "@core/service/loading/loading.service";
import { HousingService } from "@sections/housing/housing.service";
import { TermsService } from "@sections/housing/terms/terms.service";
import { ToastService } from "@core/service/toast/toast.service";
import { FormGroup } from "@angular/forms";
import { WorkOrderDetails } from "../../work-orders/work-orders.model";
import { WorkOrdersService } from "../../work-orders/work-orders.service";
import { WorkOrderDetailsPage } from "./work-order-details.page";

describe("WorkOrderDetailsPage", () => {
  let component: WorkOrderDetailsPage;
  let fixture: ComponentFixture<WorkOrderDetailsPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { params: { workOrderKey: {}, termKey: {} } }
    });
    const alertControllerStub = () => ({
      create: object => ({
        dismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const platformStub = () => ({ pause: { subscribe: f => f({}) } });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const housingServiceStub = () => ({
      getWorkOrders: (termKey, workOrderKey) => ({ pipe: () => ({}) }),
      goToDashboard: () => ({})
    });
    const termsServiceStub = () => ({ termId$: { subscribe: f => f({}) } });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const workOrdersServiceStub = () => ({
      getQuestions: workOrderKey => ({}),
      next: () => ({ subscribe: f => f({}) }),
      submitWorkOrder: (workOrderDetails, formValue) => ({
        subscribe: f => f({})
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WorkOrderDetailsPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: Platform, useFactory: platformStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: TermsService, useFactory: termsServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: WorkOrdersService, useFactory: workOrdersServiceStub }
      ]
    });
    fixture = TestBed.createComponent(WorkOrderDetailsPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`termKey has default value`, () => {
    expect(component.termKey).toEqual(0);
  });

  it(`isSubmitted has default value`, () => {
    expect(component.isSubmitted).toEqual(false);
  });

  it(`canSubmit has default value`, () => {
    expect(component.canSubmit).toEqual(true);
  });
});
