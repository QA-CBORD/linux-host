import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ApplicationsService } from '../../applications/applications.service';
import { HousingService } from '../../housing.service';
import { ApplicationDetails } from '../../applications/applications.model';
import { ApplicationsStateService } from '../../applications/applications-state.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { FormPaymentService } from '../form-payment/form-payment.service';
import { ApplicationDetailsPage } from './application-details.page';
import { QuestionComponent } from '@sections/housing/questions/question.component';

describe('ApplicationDetailsPage', () => {
  let component: ApplicationDetailsPage;
  let fixture: ComponentFixture<ApplicationDetailsPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { params: { applicationKey: {} } },
    });
    const modalControllerStub = () => ({
      create: () => ({ present: () => ({}) }),
    });
    const applicationsServiceStub = () => ({
      saveApplication: () => ({}),
      submitApplication: () => ({}),
      getQuestions: () => ({}),
      saveLocally: () => ({
        pipe: () => ({ subscribe: () => ({}) }),
      }),
    });
    const housingServiceStub = () => ({
      getApplicationDetails: () => ({ pipe: () => ({}) }),
      getRequestedRommate: () => ({}),
      handleSuccess: () => ({}),
      handleErrors: () => ({}),
    });
    const applicationsStateServiceStub = () => ({
      setRequestingRoommate: () => ({}),
      requestingRoommate: {
        length: {},
        forEach: () => ({}),
        filter: () => ({}),
      },
      applicationsState: {
        applicationDetails: { roommatePreferences: { some: () => ({}) } },
      },
      deleteRequestingRoommate: () => ({}),
      roommatePreferencesSelecteds: { find: () => ({}) },
    });
    const termsServiceStub = () => ({
      termId$: { pipe: () => ({ subscribe: () => ({}) }) },
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({}),
    });
    const formPaymentServiceStub = () => ({
      continueToFormPayment: () => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ApplicationDetailsPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: ApplicationsService, useFactory: applicationsServiceStub },
        { provide: HousingService, useFactory: housingServiceStub },
        {
          provide: ApplicationsStateService,
          useFactory: applicationsStateServiceStub,
        },
        { provide: TermsService, useFactory: termsServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: FormPaymentService, useFactory: formPaymentServiceStub },
      ],
    });
    fixture = TestBed.createComponent(ApplicationDetailsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('makes expected calls', () => {
      const applicationDetailsStub: ApplicationDetails = <any>{};
      jest.spyOn(component, 'updateApplicationService').mockReturnValue();
      component['questions'] = new QueryList<QuestionComponent>();
      component['stepper'] = <any>{
        selected: {
          stepControl: {
            value: 10,
          },
        },
      };
      component.save(applicationDetailsStub);
      expect(component.updateApplicationService).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('makes expected calls', () => {
      const formGroupStub: FormGroup = <any>{};
      const applicationsServiceStub: ApplicationsService = fixture.debugElement.injector.get(ApplicationsService);
      const applicationDetailsStub: ApplicationDetails = <any>{};
      jest.spyOn(applicationsServiceStub, 'saveLocally');
      component.onChange(applicationDetailsStub, formGroupStub);
      expect(applicationsServiceStub.saveLocally).toHaveBeenCalled();
    });
  });

  describe('requestingRoommate', () => {
    it('makes expected calls', () => {
      const applicationsStateServiceStub: ApplicationsStateService =
        fixture.debugElement.injector.get(ApplicationsStateService);
      jest.spyOn(applicationsStateServiceStub, 'setRequestingRoommate');
      component.requestingRoommate();
      expect(applicationsStateServiceStub.setRequestingRoommate).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('makes expected calls', () => {
      const housingServiceStub: HousingService = fixture.debugElement.injector.get(HousingService);
      jest.spyOn(housingServiceStub, 'handleSuccess');
      component.onCancel();
      expect(housingServiceStub.handleSuccess).toHaveBeenCalled();
    });
  });
});
