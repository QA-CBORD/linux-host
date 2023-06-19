import { TestBed } from '@angular/core/testing';
import { AndroidPermissionsService } from '@sections/dashboard/services/android-permissions.service';
import { LoadingService } from '../loading/loading.service';
import { CoordsService } from './coords.service';

describe('CoordsService', () => {
  let service: CoordsService;

  beforeEach(() => {
    const androidPermissionsServiceStub = () => ({
      checkLocationPermission: () => ({ then: () => ({}) }),
      permissionDismissed: {}
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        CoordsService,
        {
          provide: AndroidPermissionsService,
          useFactory: androidPermissionsServiceStub
        },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    service = TestBed.inject(CoordsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getCoords', () => {
    it('makes expected calls', () => {
      const androidPermissionsServiceStub: AndroidPermissionsService = TestBed.inject(
        AndroidPermissionsService
      );
     jest.spyOn(
        androidPermissionsServiceStub,
        'checkLocationPermission'
      );
      service.getCoords();
      expect(
        androidPermissionsServiceStub.checkLocationPermission
      ).toBeCalledTimes(0);
    });
  });
});
