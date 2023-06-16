import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AsyncPipe } from '@angular/common';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { ReportCardComponent } from './report-card.component';

describe('ReportCardComponent', () => {
  let component: ReportCardComponent;
  let fixture: ComponentFixture<ReportCardComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const userFacadeServiceStub = () => ({
      getUserState$: () => ({}),
      reportCard$: arg => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const modalControllerStub = () => ({ dismiss: () => ({}) });
    const settingsFacadeServiceStub = () => ({
      fetchSettingList: fEATURES => ({})
    });
    const asyncPipeStub = () => ({ transform: arg => ({}) });
    const contentStringsFacadeServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ReportCardComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: ModalController, useFactory: modalControllerStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: AsyncPipe, useFactory: asyncPipeStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(ReportCardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
      component.ngOnInit();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe('toggleStatus', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const userFacadeServiceStub: UserFacadeService = fixture.debugElement.injector.get(
        UserFacadeService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      const settingsFacadeServiceStub: SettingsFacadeService = fixture.debugElement.injector.get(
        SettingsFacadeService
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
     jest.spyOn(userFacadeServiceStub, 'reportCard$');
     jest.spyOn(toastServiceStub, 'showToast');
     jest.spyOn(modalControllerStub, 'dismiss');
     jest.spyOn(settingsFacadeServiceStub, 'fetchSettingList');
      component.toggleStatus();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(userFacadeServiceStub.reportCard$).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.fetchSettingList).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.close();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
