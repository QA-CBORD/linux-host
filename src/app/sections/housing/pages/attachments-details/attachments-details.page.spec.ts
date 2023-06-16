import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { LoadingService } from "@core/service/loading/loading.service";
import { TermsService } from "@sections/housing/terms/terms.service";
import { AttachmentsService } from "../../attachments/attachments.service";
import { Chooser } from "@awesome-cordova-plugins/chooser/ngx";
import { IdentityFacadeService } from "../../../../core/facades/identity/identity.facade.service";
import { AttachmentStateService } from "@sections/housing/attachments/attachments-state.service";
import { HousingService } from "@sections/housing/housing.service";
import { ToastService } from "@core/service/toast/toast.service";
import { FormsModule } from "@angular/forms";
import { AttachmentsDetailsPage } from "./attachments-details.page";

describe("AttachmentsDetailsPage", () => {
  let component: AttachmentsDetailsPage;
  let fixture: ComponentFixture<AttachmentsDetailsPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { params: { attachmentKey: {} } }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const alertControllerStub = () => ({
      create: object => ({ dismiss: () => ({}), present: () => ({}) })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const termsServiceStub = () => ({ termId$: { subscribe: f => f({}) } });
    const attachmentsServiceStub = () => ({
      getAttachmentFile: attachmentKey => ({ subscribe: f => f({}) }),
      getAttachmentTypes: () => ({ pipe: () => ({}) }),
      getUrlAttachmentFile: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      sendAttachmentImage: (formData, attachmentUrl) => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      sendAttachmentData: attachmentDetailsData => ({}),
      deleteAttachmentFile: attachmentKey => ({ subscribe: f => f({}) })
    });
    const chooserStub = () => ({
      getFile: () => ({ then: () => ({ finally: () => ({}) }) })
    });
    const identityFacadeServiceStub = () => ({
      updateVaultTimeout: object => ({})
    });
    const attachmentStateServiceStub = () => ({
      findAttachment: attachmentKey => ({}),
      setAttachmentTypes: res => ({}),
      attachmentTypes: { value: { find: () => ({ typeKey: {} }) } }
    });
    const housingServiceStub = () => ({ goToDashboard: () => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AttachmentsDetailsPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: TermsService, useFactory: termsServiceStub },
        { provide: AttachmentsService, useFactory: attachmentsServiceStub },
        { provide: Chooser, useFactory: chooserStub },
        {
          provide: IdentityFacadeService,
          useFactory: identityFacadeServiceStub
        },
        {
          provide: AttachmentStateService,
          useFactory: attachmentStateServiceStub
        },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AttachmentsDetailsPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`isSubmitted has default value`, () => {
    expect(component.isSubmitted).toEqual(false);
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      const attachmentsServiceStub: AttachmentsService = fixture.debugElement.injector.get(
        AttachmentsService
      );
      const attachmentStateServiceStub: AttachmentStateService = fixture.debugElement.injector.get(
        AttachmentStateService
      );
     jest.spyOn(component, "getAttachmentType");
     jest.spyOn(attachmentsServiceStub, "getAttachmentFile");
     jest.spyOn(attachmentStateServiceStub, "findAttachment");
      component.ngOnInit();
      expect(component.getAttachmentType).toHaveBeenCalled();
      expect(attachmentsServiceStub.getAttachmentFile).toHaveBeenCalled();
      expect(attachmentStateServiceStub.findAttachment).toHaveBeenCalled();
    });
  });

  describe("getAttachmentType", () => {
    it("makes expected calls", () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const attachmentsServiceStub: AttachmentsService = fixture.debugElement.injector.get(
        AttachmentsService
      );
      const attachmentStateServiceStub: AttachmentStateService = fixture.debugElement.injector.get(
        AttachmentStateService
      );
     jest.spyOn(loadingServiceStub, "showSpinner");
     jest.spyOn(loadingServiceStub, "closeSpinner");
     jest.spyOn(attachmentsServiceStub, "getAttachmentTypes");
     jest.spyOn(attachmentStateServiceStub, "setAttachmentTypes");
      component.getAttachmentType();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(attachmentsServiceStub.getAttachmentTypes).toHaveBeenCalled();
      expect(attachmentStateServiceStub.setAttachmentTypes).toHaveBeenCalled();
    });
  });

  describe("getAttachmentUrl", () => {
    it("makes expected calls", () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const attachmentsServiceStub: AttachmentsService = fixture.debugElement.injector.get(
        AttachmentsService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
     jest.spyOn(loadingServiceStub, "showSpinner");
     jest.spyOn(loadingServiceStub, "closeSpinner");
     jest.spyOn(attachmentsServiceStub, "getUrlAttachmentFile");
     jest.spyOn(toastServiceStub, "showToast");
      component.getAttachmentUrl();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(attachmentsServiceStub.getUrlAttachmentFile).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
    });
  });

  describe("backClicked", () => {
    it("makes expected calls", () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(routerStub, "navigate");
      component.backClicked();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe("selectFile", () => {
    it("makes expected calls", () => {
      const chooserStub: Chooser = fixture.debugElement.injector.get(Chooser);
      const identityFacadeServiceStub: IdentityFacadeService = fixture.debugElement.injector.get(
        IdentityFacadeService
      );
     jest.spyOn(component, "getAttachmentUrl");
     jest.spyOn(component, "getSizeFile");
     jest.spyOn(component, "getFileType");
     jest.spyOn(component, "alertAttachmentLimitSize");
     jest.spyOn(chooserStub, "getFile");
     jest.spyOn(identityFacadeServiceStub, "updateVaultTimeout");
      component.selectFile();
      expect(component.getAttachmentUrl).toHaveBeenCalled();
      expect(component.getSizeFile).toHaveBeenCalled();
      expect(component.getFileType).toHaveBeenCalled();
      expect(component.alertAttachmentLimitSize).toHaveBeenCalled();
      expect(chooserStub.getFile).toHaveBeenCalled();
      expect(identityFacadeServiceStub.updateVaultTimeout).toHaveBeenCalled();
    });
  });

  describe("deleteAttachment", () => {
    it("makes expected calls", () => {
      const alertControllerStub: AlertController = fixture.debugElement.injector.get(
        AlertController
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const attachmentsServiceStub: AttachmentsService = fixture.debugElement.injector.get(
        AttachmentsService
      );
      const housingServiceStub: HousingService = fixture.debugElement.injector.get(
        HousingService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
     jest.spyOn(alertControllerStub, "create");
     jest.spyOn(loadingServiceStub, "showSpinner");
     jest.spyOn(loadingServiceStub, "closeSpinner");
     jest.spyOn(attachmentsServiceStub, "deleteAttachmentFile");
     jest.spyOn(housingServiceStub, "goToDashboard");
     jest.spyOn(toastServiceStub, "showToast");
      component.deleteAttachment();
      expect(alertControllerStub.create).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(attachmentsServiceStub.deleteAttachmentFile).toHaveBeenCalled();
      expect(housingServiceStub.goToDashboard).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
    });
  });
});
