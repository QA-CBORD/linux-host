import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ConnectivityPageInfo } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { ConnectivityErrorType } from '@shared/ui-components/no-connectivity-screen/model/no-connectivity.cs.model';
import { of } from 'rxjs';
import { LockDownService } from './lock-down.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ToastService } from '@core/service/toast/toast.service';

describe(LockDownService, () => {
  let service: LockDownService;
  let _contentStringsFacadeService, _settingsFacadeService, _toastService;

  beforeEach(() => {
    _contentStringsFacadeService = {
      getContentStringValue$: jest.fn(),
    };
    _settingsFacadeService = {
      fetchSettingValue$: jest.fn(),
    };
    _toastService = {
      showError: jest.fn(() => Promise.resolve()),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ContentStringsFacadeService, useValue: _contentStringsFacadeService },
        { provide: SettingsFacadeService, useValue: _settingsFacadeService },
        { provide: ToastService, useValue: _toastService },
      ],
    });

    service = TestBed.inject(LockDownService);
  });

  it('should return the  the service', () => {
    expect(service).toBeTruthy();
  });

  it('should load string and setting in the service', async () => {
    const contentStringsSpy = jest.spyOn(_contentStringsFacadeService, 'getContentStringValue$').mockReturnValue(of('hello world'));
    const settingStringsSpy = jest.spyOn(_settingsFacadeService, 'fetchSettingValue$').mockReturnValue(of('1'));
    await service.loadStringsAndSettings();
    expect(contentStringsSpy).toHaveBeenCalledTimes(1);
    expect(settingStringsSpy).toHaveBeenCalledTimes(1);
    expect(service.lockDownFlag).toEqual(true);
    expect(service.lockDownMessage).toEqual('hello world');
  });

  it('should return if lockDown is Off', () => {
    const toastSpy = jest.spyOn(_toastService, 'showError').mockReturnValue('');
    expect(service.isLockDownOn()).toBeFalsy();
    expect(toastSpy).toHaveBeenCalledTimes(0);
    expect(service.lockDownFlag).toEqual(undefined);
    expect(service.lockDownMessage).toEqual(undefined);
  });

  it('should return if lockDown is On', async () => {
    const toastSpy = jest.spyOn(_toastService, 'showError').mockReturnValue('');
    jest.spyOn(_contentStringsFacadeService, 'getContentStringValue$').mockReturnValue(of('hello world'));
    jest.spyOn(_settingsFacadeService, 'fetchSettingValue$').mockReturnValue(of('1'));
    await service.loadStringsAndSettings();
    expect(service.isLockDownOn()).toBeTruthy();
    expect(toastSpy).toHaveBeenCalledTimes(1);
  });
});
