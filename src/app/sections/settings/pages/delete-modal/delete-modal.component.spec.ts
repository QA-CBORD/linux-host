import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DeleteModalComponent } from './delete-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: data => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [DeleteModalComponent],
      providers: [
        { provide: ModalController, useFactory: modalControllerStub },
        {
          provide: TranslateService,
          useValue: {
            get: jest.fn().mockReturnValue(of('some message')),
            instant: (key: string) => key,
            onLangChange: of(),
            onTranslationChange: of(),
            onDefaultLangChange: of(),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('deletePhoto', () => {
    it('makes expected calls', () => {
      jest.spyOn(component, 'dismissModal');
      component.deletePhoto();
      expect(component.dismissModal).toHaveBeenCalled();
    });
  });
});
