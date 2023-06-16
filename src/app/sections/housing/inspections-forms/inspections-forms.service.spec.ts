import { TestBed } from "@angular/core/testing";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { Inspection } from "./inspections-forms.model";
import { InspectionsStateService } from "./inspections-forms-state.service";
import { InspectionService } from "./inspections-forms.service";

describe("InspectionService", () => {
  let service: InspectionService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({});
    const housingProxyServiceStub = () => ({
      putInspection: (inspectiontUrl, inspectionData) => ({ pipe: () => ({}) }),
      post: (inspectiontUrl, inspectionData) => ({ pipe: () => ({}) })
    });
    const inspectionsStateServiceStub = () => ({
      getInspectionDetailsForm: () => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        InspectionService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub },
        {
          provide: InspectionsStateService,
          useFactory: inspectionsStateServiceStub
        }
      ]
    });
    service = TestBed.inject(InspectionService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });

  describe("submitInspection", () => {
    it("makes expected calls", () => {
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
      const inspectionStub: Inspection = <any>{};
     jest.spyOn(housingProxyServiceStub, "putInspection");
     jest.spyOn(housingProxyServiceStub, "post");
      service.submitInspection(inspectionStub);
      expect(housingProxyServiceStub.putInspection).toHaveBeenCalled();
      expect(housingProxyServiceStub.post).toHaveBeenCalled();
    });
  });

  describe("getFormDefinitionInspection", () => {
    it("makes expected calls", () => {
      const inspectionsStateServiceStub: InspectionsStateService = TestBed.inject(
        InspectionsStateService
      );
     jest.spyOn(
        inspectionsStateServiceStub,
        "getInspectionDetailsForm"
      );
      service.getFormDefinitionInspection();
      expect(
        inspectionsStateServiceStub.getInspectionDetailsForm
      ).toHaveBeenCalled();
    });
  });
});
