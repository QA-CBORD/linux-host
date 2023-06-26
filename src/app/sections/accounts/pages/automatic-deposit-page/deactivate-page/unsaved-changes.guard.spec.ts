import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AutomaticDepositPageComponent } from '@sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component';
import { AutoDepositService } from '@sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service';
import { PopoverController } from '@ionic/angular';
import { UnsavedChangesGuard } from './unsaved-changes.guard';

describe('UnsavedChangesGuard', () => {
  let service: UnsavedChangesGuard;

  beforeEach(() => {
    const autoDepositServiceStub = () => ({
      settings$: { pipe: () => ({ toPromise: () => ({}) }) }
    });
    const popoverControllerStub = () => ({
      create: object => ({
        present: () => ({}),
        onDidDismiss: () => ({ then: () => ({}) })
      })
    });
    TestBed.configureTestingModule({
      providers: [
        UnsavedChangesGuard,
        { provide: AutoDepositService, useFactory: autoDepositServiceStub },
        { provide: PopoverController, useFactory: popoverControllerStub }
      ]
    });
    service = TestBed.inject(UnsavedChangesGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
