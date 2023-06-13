import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { QuestionBaseOptionValue } from './types/question-base';
import { QuestionHeader } from './questions.model';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { ToastService } from '../../../core/service/toast/toast.service';
import { WorkOrderStateService } from '../work-orders/work-order-state.service';
import { ContractListStateService } from '../contract-list/contract-list-state.service';
import { LocalFile } from '../work-orders/work-orders.model';
import { Photo } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera';
import { CameraService } from '@sections/settings/pages/services/camera.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { PhotoUploadService } from '@sections/settings/pages/services/photo-upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ContractsService } from '../contracts/contracts.service';
import { montDayYearHour } from '../../../shared/constants/dateFormats.constant';
import { monthDayYear } from '../../../shared/constants/dateFormats.constant';
import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ markForCheck: () => ({}) });
    const applicationsStateServiceStub = () => ({
      setRequestedRoommates: array => ({}),
      setRoommatesPreferences: array => ({}),
      emptyRequestedRoommate: () => ({}),
      deleteRoommatePreferencesSelecteds: () => ({}),
      roommateSearchOptions: {}
    });
    const termsServiceStub = () => ({ termId$: { subscribe: f => f({}) } });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const workOrderStateServiceStub = () => ({
      destroyWorkOrderImage: () => ({}),
      setWorkOrderImage: image => ({}),
      setWorkOrderImageBlob: formData => ({}),
      workOrderDetails: { getValue: () => ({ facilityTree: {} }) },
      setSelectedFacilityTree: object => ({}),
      workOrderImage$: { subscribe: f => f({}) }
    });
    const contractListStateServiceStub = () => ({
      getContractDetails: () => ({ fullName: {}, facilityKey: {} })
    });
    const cameraServiceStub = () => ({ getPhoto: object => ({}) });
    const sessionFacadeServiceStub = () => ({ getIsWeb: () => ({}) });
    const photoUploadServiceStub = () => ({
      presentPhotoTypeSelection: () => ({})
    });
    const domSanitizerStub = () => ({
      bypassSecurityTrustResourceUrl: arg => ({})
    });
    const contractsServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [QuestionComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        {
          provide: ApplicationsStateService,
          useFactory: applicationsStateServiceStub
        },
        { provide: TermsService, useFactory: termsServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        {
          provide: WorkOrderStateService,
          useFactory: workOrderStateServiceStub
        },
        {
          provide: ContractListStateService,
          useFactory: contractListStateServiceStub
        },
        { provide: CameraService, useFactory: cameraServiceStub },
        { provide: SessionFacadeService, useFactory: sessionFacadeServiceStub },
        { provide: PhotoUploadService, useFactory: photoUploadServiceStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: ContractsService, useFactory: contractsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`dateTimeFormat has default value`, () => {
    expect(component.dateTimeFormat).toEqual(montDayYearHour);
  });

  it(`dateFormat has default value`, () => {
    expect(component.dateFormat).toEqual(monthDayYear);
  });

  it(`controlName has default value`, () => {
    expect(component.controlName).toEqual(`name`);
  });

  it(`images has default value`, () => {
    expect(component.images).toEqual([]);
  });

  describe('saveImage', () => {
    it('makes expected calls', () => {
      const workOrderStateServiceStub: WorkOrderStateService = fixture.debugElement.injector.get(
        WorkOrderStateService
      );
      const photoStub: Photo = <any>{};
      spyOn(component, 'readAsBase64').and.callThrough();
      spyOn(component, 'sanitizeUrl').and.callThrough();
      spyOn(workOrderStateServiceStub, 'setWorkOrderImage').and.callThrough();
      component.saveImage(photoStub);
      expect(component.readAsBase64).toHaveBeenCalled();
      expect(component.sanitizeUrl).toHaveBeenCalled();
      expect(workOrderStateServiceStub.setWorkOrderImage).toHaveBeenCalled();
    });
  });

  describe('readAsBase64', () => {
    it('makes expected calls', () => {
      const photoStub: Photo = <any>{};
      const sessionFacadeServiceStub: SessionFacadeService = fixture.debugElement.injector.get(
        SessionFacadeService
      );
      spyOn(sessionFacadeServiceStub, 'getIsWeb').and.callThrough();
      component.readAsBase64(photoStub);
      expect(sessionFacadeServiceStub.getIsWeb).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      const applicationsStateServiceStub: ApplicationsStateService = fixture.debugElement.injector.get(
        ApplicationsStateService
      );
      const workOrderStateServiceStub: WorkOrderStateService = fixture.debugElement.injector.get(
        WorkOrderStateService
      );
      spyOn(
        applicationsStateServiceStub,
        'setRequestedRoommates'
      ).and.callThrough();
      spyOn(
        applicationsStateServiceStub,
        'setRoommatesPreferences'
      ).and.callThrough();
      spyOn(
        applicationsStateServiceStub,
        'emptyRequestedRoommate'
      ).and.callThrough();
      spyOn(
        applicationsStateServiceStub,
        'deleteRoommatePreferencesSelecteds'
      ).and.callThrough();
      spyOn(
        workOrderStateServiceStub,
        'destroyWorkOrderImage'
      ).and.callThrough();
      component.ngOnDestroy();
      expect(
        applicationsStateServiceStub.setRequestedRoommates
      ).toHaveBeenCalled();
      expect(
        applicationsStateServiceStub.setRoommatesPreferences
      ).toHaveBeenCalled();
      expect(
        applicationsStateServiceStub.emptyRequestedRoommate
      ).toHaveBeenCalled();
      expect(
        applicationsStateServiceStub.deleteRoommatePreferencesSelecteds
      ).toHaveBeenCalled();
      expect(
        workOrderStateServiceStub.destroyWorkOrderImage
      ).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'setFacility').and.callThrough();
      component.ngOnInit();
      expect(component.setFacility).toHaveBeenCalled();
    });
  });

  describe('check', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      spyOn(changeDetectorRefStub, 'markForCheck').and.callThrough();
      component.check();
      expect(changeDetectorRefStub.markForCheck).toHaveBeenCalled();
    });
  });

  describe('touch', () => {
    it('makes expected calls', () => {
      spyOn(component, 'check').and.callThrough();
      component.touch();
      expect(component.check).toHaveBeenCalled();
    });
  });

  describe('presentPhotoTypeSelection', () => {
    it('makes expected calls', () => {
      const photoUploadServiceStub: PhotoUploadService = fixture.debugElement.injector.get(
        PhotoUploadService
      );
      spyOn(component, 'onGetPhoto').and.callThrough();
      spyOn(
        photoUploadServiceStub,
        'presentPhotoTypeSelection'
      ).and.callThrough();
      component.presentPhotoTypeSelection();
      expect(component.onGetPhoto).toHaveBeenCalled();
      expect(
        photoUploadServiceStub.presentPhotoTypeSelection
      ).toHaveBeenCalled();
    });
  });

  describe('setFacility', () => {
    it('makes expected calls', () => {
      const workOrderStateServiceStub: WorkOrderStateService = fixture.debugElement.injector.get(
        WorkOrderStateService
      );
      const contractListStateServiceStub: ContractListStateService = fixture.debugElement.injector.get(
        ContractListStateService
      );
      spyOn(
        workOrderStateServiceStub,
        'setSelectedFacilityTree'
      ).and.callThrough();
      spyOn(
        contractListStateServiceStub,
        'getContractDetails'
      ).and.callThrough();
      component.setFacility();
      expect(
        workOrderStateServiceStub.setSelectedFacilityTree
      ).toHaveBeenCalled();
      expect(
        contractListStateServiceStub.getContractDetails
      ).toHaveBeenCalled();
    });
  });
});
