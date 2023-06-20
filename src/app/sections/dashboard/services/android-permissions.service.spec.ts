import { TestBed } from '@angular/core/testing';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { AndroidPermissionsService } from './android-permissions.service';

describe('AndroidPermissionsService', () => {
  let service: AndroidPermissionsService;

  beforeEach(() => {
    const androidPermissionsStub = () => ({
      checkPermission: aCCESS_FINE_LOCATION => ({}),
      PERMISSION: { ACCESS_FINE_LOCATION: {}, ACCESS_COARSE_LOCATION: {} },
      requestPermissions: array => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        AndroidPermissionsService,
        { provide: AndroidPermissions, useFactory: androidPermissionsStub }
      ]
    });
    service = TestBed.inject(AndroidPermissionsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`permissionDismissed has default value`, () => {
    expect(service.permissionDismissed).toEqual(false);
  });

  describe('checkLocationPermission', () => {
    it('makes expected calls', () => {
      const androidPermissionsStub: AndroidPermissions = TestBed.inject(
        AndroidPermissions
      );
     jest.spyOn(androidPermissionsStub, 'checkPermission');
      service.checkLocationPermission();
      expect(androidPermissionsStub.checkPermission).toHaveBeenCalled();
    });
  });

  describe('requestLocationPermissions', () => {
    it('makes expected calls', () => {
      const androidPermissionsStub: AndroidPermissions = TestBed.inject(
        AndroidPermissions
      );
     jest.spyOn(androidPermissionsStub, 'requestPermissions');
      service.requestLocationPermissions();
      expect(androidPermissionsStub.requestPermissions).toHaveBeenCalled();
    });
  });
});
