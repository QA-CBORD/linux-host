import { TestBed } from '@angular/core/testing';
import { RegistrationService } from './registration.service';
import { RegistrationServiceFacade } from './registration-service-facade';

describe('RegistrationServiceFacade', () => {
  let service: RegistrationServiceFacade;

  beforeEach(() => {
    const registrationServiceStub = () => ({
      getStringModel$: (preLogin, object) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        RegistrationServiceFacade,
        { provide: RegistrationService, useFactory: registrationServiceStub }
      ]
    });
    service = TestBed.inject(RegistrationServiceFacade);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
