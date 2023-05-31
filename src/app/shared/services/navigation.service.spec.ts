import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { NavigationExtras, Router } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { of } from 'rxjs';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';

describe(NavigationService, () => {
  let service: NavigationService;
  let _routerMock, _authFacadeMock;

  beforeEach(() => {
    _authFacadeMock = {
      isGuestUser: jest.fn(() => of(true)),
    };
    _routerMock = {
      url: ANONYMOUS_ROUTES.noConnectivity,
      navigateAnonymous: jest.fn(() => of(true)),
      navigateByUrl: jest.fn(() => of(true)),
      navigate: jest.fn()
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: _routerMock },
        { provide: AuthFacadeService, useValue: _authFacadeMock },
      ],
    });

    service = TestBed.inject(NavigationService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to the specific route', () => {
    const spy1 = jest.spyOn(_authFacadeMock as any, 'isGuestUser');
    expect(service.navigate([ANONYMOUS_ROUTES.pin])).toBeTruthy();
    expect(service.navigate([ANONYMOUS_ROUTES.external, '1', '2'], { more: '1' } as Partial<NavigationExtras>)).toBeTruthy();
    expect(service.navigate([ANONYMOUS_ROUTES.external, '1', '2'])).toBeTruthy();
    expect(service.navigate([ANONYMOUS_ROUTES.external, '1'])).toBeTruthy();

    expect(spy1).toHaveBeenCalledTimes(4);
  });

  it('should navigate to a anonimous route', () => {
    expect(service.navigateAnonymous(ANONYMOUS_ROUTES.entry)).toBeTruthy();
  });

  it('should navigate by using an Url', () => {
    expect(service.navigateByUrl(ANONYMOUS_ROUTES.pin, { fragment: 'test' })).toBeTruthy();
  });

  it('should return the same url as router url', () => {
    expect(service.getUrl()).toEqual(_routerMock.url);
  });

  it('should validate if URL include chunck', () => {
    expect(service.isRoute(ANONYMOUS_ROUTES.noConnectivity)).toBeTruthy();
  });

  it('should validate if URL is trackable', () => {
    Object.defineProperty(service, 'history', { value: [LOCAL_ROUTING.attachments, LOCAL_ROUTING.checkInOut] });
    const spy1 = jest.spyOn(service as any, 'removeParams');
    const spy2 = jest.spyOn(service as any, 'isUrlAllowed');
    const spy3 = jest.spyOn(service as any, 'isPreviousUrl');

    service.trackPath(`${LOCAL_ROUTING.roomsSearch}?test=0`);
    service.trackPath(LOCAL_ROUTING.dashboard);
    expect(spy1).toBeCalledTimes(2);
    expect(spy2).toBeCalledTimes(2);
    expect(spy3).toBeCalledTimes(2);
  });

  it('should return the previous URL', () => {
    Object.defineProperty(service, 'history', { value: [LOCAL_ROUTING.attachments, LOCAL_ROUTING.checkInOut] });
    expect(service.getPreviousTrackedUrl()).toEqual(LOCAL_ROUTING.attachments);
  });
});
