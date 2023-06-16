import { TestBed } from "@angular/core/testing";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { CheckInOutSlot } from "./check-in-out.model";
import { CheckInOutService } from "./check-in-out.service";

describe("CheckInOutService", () => {
  let service: CheckInOutService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({});
    const housingProxyServiceStub = () => ({
      post: (_checkInOutUrl, spot) => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        CheckInOutService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub }
      ]
    });
    service = TestBed.inject(CheckInOutService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });

  describe("selectSpot", () => {
    it("makes expected calls", () => {
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
      const checkInOutSlotStub: CheckInOutSlot = <any>{};
     jest.spyOn(housingProxyServiceStub, "post");
      service.selectSpot(checkInOutSlotStub);
      expect(housingProxyServiceStub.post).toHaveBeenCalled();
    });
  });
});
