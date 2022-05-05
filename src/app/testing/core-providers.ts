import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { Platform } from '@ionic/angular';

export let sessionFacadeServiceMock: Partial<SessionFacadeService>;
export const platformMock: Partial<Platform> = { is: jest.fn() };

export const CoreProviders = [
  { provide: SessionFacadeService, useValue: sessionFacadeServiceMock },
  { provide: Platform, useValue: platformMock },
];
