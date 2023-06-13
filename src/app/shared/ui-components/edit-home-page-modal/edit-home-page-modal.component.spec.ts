import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { EditHomePageModalComponent } from './edit-home-page-modal.component';

describe('EditHomePageModalComponent', () => {
  let component: EditHomePageModalComponent;
  let fixture: ComponentFixture<EditHomePageModalComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: () => ({}) });
    const tileConfigFacadeServiceStub = () => ({
      tileSettings$: {},
      updateConfigState: config => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EditHomePageModalComponent],
      providers: [
        { provide: ModalController, useFactory: modalControllerStub },
        {
          provide: TileConfigFacadeService,
          useFactory: tileConfigFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(EditHomePageModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickedClose', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      spyOn(modalControllerStub, 'dismiss').and.callThrough();
      component.onClickedClose();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onClickedDone', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      spyOn(modalControllerStub, 'dismiss').and.callThrough();
      component.onClickedDone();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
