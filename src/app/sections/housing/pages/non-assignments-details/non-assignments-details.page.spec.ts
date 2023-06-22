import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { LoadingService } from "@core/service/loading/loading.service";
import { HousingService } from "@sections/housing/housing.service";
import { NonAssignmentDetails } from "@sections/housing/non-assignments/non-assignments.model";
import { NonAssignmentsService } from "@sections/housing/non-assignments/non-assignments.service";
import { TermsService } from "@sections/housing/terms/terms.service";
import { ToastService } from "@core/service/toast/toast.service";
import { NonAssignmentsStateService } from "@sections/housing/non-assignments/non-assignments-state.service";
import { FormGroup } from "@angular/forms";
import { NonAssignmentsDetailsPage } from "./non-assignments-details.page";

describe("NonAssignmentsDetailsPage", () => {
  let component: NonAssignmentsDetailsPage;
  let fixture: ComponentFixture<NonAssignmentsDetailsPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const alertControllerStub = () => ({
      create: object => ({
        dismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const platformStub = () => ({ pause: { subscribe: f => f({}) } });
    const toastControllerStub = () => ({});
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const housingServiceStub = () => ({
      getNonAssignmentDetails: (nonAssignmentKey, queryParams) => ({
        pipe: () => ({})
      }),
      goToDashboard: () => ({})
    });
    const nonAssignmentsServiceStub = () => ({
      getSelectedAssetType: () => ({ subscribe: f => f({}) }),
      getQuestions: nonAssignmentKey => ({}),
      next: (nonAssignmentKey, formValue) => ({ subscribe: f => f({}) }),
      submitContract: (
        nonAssignmentKey,
        nonAssignmentDetails,
        selectedAssetKey,
        termKey,
        formValue
      ) => ({ subscribe: f => f({}) })
    });
    const termsServiceStub = () => ({ termId$: { subscribe: f => f({}) } });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const nonAssignmentsStateServiceStub = () => ({
      setSelectedAssetType: array => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NonAssignmentsDetailsPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: Platform, useFactory: platformStub },
        { provide: ToastController, useFactory: toastControllerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: HousingService, useFactory: housingServiceStub },
        {
          provide: NonAssignmentsService,
          useFactory: nonAssignmentsServiceStub
        },
        { provide: TermsService, useFactory: termsServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        {
          provide: NonAssignmentsStateService,
          useFactory: nonAssignmentsStateServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(NonAssignmentsDetailsPage);
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
