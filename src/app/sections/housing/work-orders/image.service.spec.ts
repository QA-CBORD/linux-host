import { TestBed } from "@angular/core/testing";
import { WorkOrderStateService } from "./work-order-state.service";
import { HousingProxyService } from "../housing-proxy.service";
import { DomSanitizer } from "@angular/platform-browser";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { ImageData } from "./work-orders.model";
import { ImageService } from "./image.service";

describe("ImageService", () => {
  let service: ImageService;

  beforeEach(() => {
    const workOrderStateServiceStub = () => ({
      destroyWorkOrderImageBlob: () => ({})
    });
    const housingProxyServiceStub = () => ({
      post: (workOrderImageURL, body) => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const domSanitizerStub = () => ({ sanitize: (uRL, arg) => ({}) });
    const environmentFacadeServiceStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        ImageService,
        {
          provide: WorkOrderStateService,
          useFactory: workOrderStateServiceStub
        },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(ImageService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });
});
