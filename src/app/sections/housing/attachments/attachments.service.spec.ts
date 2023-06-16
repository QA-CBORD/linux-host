import { TestBed } from "@angular/core/testing";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { AttachmentsDetail } from "./attachments.model";
import { AttachmentsService } from "./attachments.service";

describe("AttachmentsService", () => {
  let service: AttachmentsService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({});
    const housingProxyServiceStub = () => ({
      get: apiUrl => ({ pipe: () => ({}) }),
      postAttachment: (attachmentUrl, dataAttachmentsDetail) => ({
        pipe: () => ({})
      }),
      post: (attachmentApiUrl, dataAttachmentsDetail) => ({ pipe: () => ({}) }),
      delete: requestUrl => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        AttachmentsService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub }
      ]
    });
    service = TestBed.inject(AttachmentsService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });

  describe("sendAttachmentData", () => {
    it("makes expected calls", () => {
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
      const attachmentsDetailStub: AttachmentsDetail = <any>{};
     jest.spyOn(housingProxyServiceStub, "post");
      service.sendAttachmentData(attachmentsDetailStub);
      expect(housingProxyServiceStub.post).toHaveBeenCalled();
    });
  });

  describe("getAttachmentTypes", () => {
    it("makes expected calls", () => {
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
     jest.spyOn(housingProxyServiceStub, "get");
      service.getAttachmentTypes();
      expect(housingProxyServiceStub.get).toHaveBeenCalled();
    });
  });

  describe("getUrlAttachmentFile", () => {
    it("makes expected calls", () => {
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
     jest.spyOn(housingProxyServiceStub, "get");
      service.getUrlAttachmentFile();
      expect(housingProxyServiceStub.get).toHaveBeenCalled();
    });
  });
});
