import { TestBed } from '@angular/core/testing';
import { AndroidPermissionsService } from './android-permissions.service';
import { registerPlugin } from '@capacitor/core';
const AndroidPermissionsPlugin = registerPlugin<any>('AndroidPermissionsPlugin');

describe('AndroidPermissionsService', () => {
  let service: AndroidPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AndroidPermissionsService
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
});
