import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  const toastControllerStub = {
    create: jest.fn().mockReturnValue({
      setAttribute: () => ({}),
      onDidDismiss: jest.fn().mockResolvedValue({}),
      present: () => ({}),
      dismiss: () => ({}),
    }),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, { provide: ToastController, useValue: toastControllerStub }],
    });
    service = TestBed.inject(ToastService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should create toast', async () => {
    const onDismiss = jest.fn();
    await service.showSuccessToast({ message: 'test', onDismiss });
    expect(toastControllerStub.create).toHaveBeenCalled();
  });

  it('should create error toast', async () => {
    await service.showError('test');
    expect(toastControllerStub.create).toHaveBeenCalled();
  });
});
