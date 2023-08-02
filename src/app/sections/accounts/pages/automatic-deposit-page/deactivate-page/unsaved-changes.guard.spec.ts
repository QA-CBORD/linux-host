import { TestBed } from '@angular/core/testing';
import { Params, RouterStateSnapshot } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AutoDepositService } from '@sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service';
import { UnsavedChangesGuard } from './unsaved-changes.guard';

const autoDepositServiceStub = () => ({
  settings$: jest.fn()
});
const popoverControllerStub = () => ({
  create: jest.fn(()=> ({
    present: () => ({}),
    onDidDismiss: () => ({ then: () => ({}) }),
  })),
});

describe('UnsavedChangesGuard', () => {
  let service: UnsavedChangesGuard;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      providers: [
        UnsavedChangesGuard,
        { provide: AutoDepositService, useFactory: autoDepositServiceStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
      ],
    });
    service = TestBed.inject(UnsavedChangesGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when nextState root query params contain skip', async () => {
    const result = await service.canDeactivate(null, null, null, {
      root: {
        queryParams: { skip: true },
        url: [],
        params: {} as Params,
        fragment: '',
        data: null,
        outlet: '',
        routeConfig: {},
        component: null,
        title: '',
        root: null,
        parent: null,
        firstChild: null,
        children: null,
        paramMap: null,
        pathFromRoot: null,
        queryParamMap: null
      },
      url: '',
    } as RouterStateSnapshot);
    expect(result).toBe(true);
  });
});
