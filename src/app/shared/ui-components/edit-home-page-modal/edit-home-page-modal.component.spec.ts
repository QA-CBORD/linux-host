import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { EditHomePageModalComponent } from './edit-home-page-modal.component';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from '@sections/notifications/notifications.component.spec';
import { of } from 'rxjs';

let accessibility = {
  readAloud: jest.fn()
};


describe('EditHomePageModalComponent', () => {
  let component: EditHomePageModalComponent;
  let fixture: ComponentFixture<EditHomePageModalComponent>;

  beforeEach(async () => {
    const modalControllerStub = () => ({ dismiss: () => ({}) });
    const tileConfigFacadeServiceStub = () => ({
      tileSettings$: of([{ title: "test1", isEnable: true }, { title: "test2", isEnable: true }]),
      updateConfigState: config => ({})
    });

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EditHomePageModalComponent],
      imports: [TranslateModule, IonicModule],
      providers: [
        { provide: ModalController, useFactory: modalControllerStub },
        {
          provide: TileConfigFacadeService,
          useFactory: tileConfigFacadeServiceStub,
        },
        {
          provide: AccessibilityService,
          useValue: accessibility,
        },
        { provide: TranslateService, useClass: TranslateServiceStub },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHomePageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickedClose', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      jest.spyOn(modalControllerStub, 'dismiss');
      component.onClickedClose();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onClickedDone', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      jest.spyOn(modalControllerStub, 'dismiss');
      component.onClickedDone();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('doReorder', () => {
    it('should have an accessible drag and drop', async () => {
      const event = { detail: { from: 0, to: 1, complete: () => true } };
      const spy = jest.spyOn(accessibility, 'readAloud');
      await component.doReorder(event);
      expect(spy).toHaveBeenCalled();
    });

    it('should have move item to position 2', async () => {
      const event = { detail: { from: 0, to: 1, complete: () => true } };
      component['translateService'].instant = jest.fn().mockReturnValue("Moved ${item} to position");
      const spy = jest.spyOn(accessibility, 'readAloud');
      await component.doReorder(event);
      expect(spy).toHaveBeenCalledWith("Moved test1 to position 2");
    });
  });
});
