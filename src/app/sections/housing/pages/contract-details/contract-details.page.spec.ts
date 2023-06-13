import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContractsService } from "../../contracts/contracts.service";
import { LoadingService } from "@core/service/loading/loading.service";
import { HousingService } from "../../housing.service";
import { ContractDetails } from "../../contracts/contracts.model";
import { FormPaymentService } from "../form-payment/form-payment.service";
import { FormGroup } from "@angular/forms";
import { ApplicationsService } from "@sections/housing/applications/applications.service";
import { ContractDetailsPage } from "./contract-details.page";

describe("ContractDetailsPage", () => {
  let component: ContractDetailsPage;
  let fixture: ComponentFixture<ContractDetailsPage>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ markForCheck: () => ({}) });
    const activatedRouteStub = () => ({
      snapshot: { params: { contractKey: {}, contractElementKey: {} } }
    });
    const contractsServiceStub = () => ({
      sign: arg => ({}),
      submitContract: (contractKey, formKey) => ({ subscribe: f => f({}) }),
      getQuestions: contractKey => ({}),
      isSigned$: { subscribe: f => f({}) }
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const housingServiceStub = () => ({
      goToDashboard: () => ({}),
      getContractDetails: (contractKey, queryParams) => ({ pipe: () => ({}) }),
      handleErrors: error => ({})
    });
    const formPaymentServiceStub = () => ({
      continueToFormPayment: object => ({})
    });
    const applicationsServiceStub = () => ({ isView: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ContractDetailsPage],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: ContractsService, useFactory: contractsServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: FormPaymentService, useFactory: formPaymentServiceStub },
        { provide: ApplicationsService, useFactory: applicationsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ContractDetailsPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`isSubmitted has default value`, () => {
    expect(component.isSubmitted).toEqual(false);
  });

  it(`isSigned has default value`, () => {
    expect(component.isSigned).toEqual(true);
  });

  it(`canSubmit has default value`, () => {
    expect(component.canSubmit).toEqual(true);
  });

  describe("ngOnDestroy", () => {
    it("makes expected calls", () => {
      const contractsServiceStub: ContractsService = fixture.debugElement.injector.get(
        ContractsService
      );
      spyOn(contractsServiceStub, "sign").and.callThrough();
      component.ngOnDestroy();
      expect(contractsServiceStub.sign).toHaveBeenCalled();
    });
  });
});
