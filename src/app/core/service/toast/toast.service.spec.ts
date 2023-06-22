import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    const toastControllerStub = () => ({
      create: object => ({
        setAttribute: () => ({}),
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({}),
        dismiss: () => ({})
      })
    });
    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: ToastController, useFactory: toastControllerStub }
      ]
    });
    service = TestBed.inject(ToastService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
