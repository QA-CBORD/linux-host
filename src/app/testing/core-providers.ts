import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { Platform } from '@ionic/angular';
import { Subject, of } from 'rxjs';
import { StorageStateService } from '@core/states/storage/storage-state.service';

export let sessionFacadeServiceMock: Partial<SessionFacadeService>;
export const platformMock: Partial<Platform> = { is: jest.fn(), pause: new Subject() };
export const routerMock: Partial<Router> = {
  navigate: jest.fn(),
};
export const mockStorageStateService = {
  getStateEntityByKey$: jest.fn().mockReturnValue(of({})),
};

export const CoreProviders = [
  { provide: APP_BASE_HREF, useValue: '/' },
  { provide: Platform, useValue: platformMock },
  { provide: SessionFacadeService, useValue: sessionFacadeServiceMock },
  {
    provide: Router,
    useValue: routerMock,
  },
  { provide: StorageStateService, useValue: mockStorageStateService },
];
