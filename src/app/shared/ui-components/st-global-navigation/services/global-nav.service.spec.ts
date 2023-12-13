import { TestBed } from '@angular/core/testing';
import { GlobalNavService } from './global-nav.service';
import { firstValueFrom, map, reduce, scan } from 'rxjs';
import { combineLatest } from 'rxjs';

describe('GlobalNavService', () => {
  let service: GlobalNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalNavService);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('NavBar', () => {
    it('should show', async () => {
      service.showNavBar();
      const isShown = await firstValueFrom(service.isNavBarShown$);
      expect(isShown).toBe(true);
    });

    it('should hide', async () => {
      service.hideNavBar();
      const isShown = await firstValueFrom(service.isNavBarShown$);
      expect(isShown).toBe(false);
    });
    it('should expand', async () => {
      service.expandNavBarMenu();
      const isExpanded = await firstValueFrom(
        combineLatest([service.isNavBarMenuExpanded$]).pipe(
          map(state => state.reduce((acc, stateItem) => acc && stateItem, true))
        )
      );
      expect(isExpanded).toBe(true);
    });
    it('should collapse', async () => {
      service.collapseNavBarMenu();
      const isExpanded = await firstValueFrom(
        combineLatest([service.isNavBarMenuExpanded$, service.isBackdropShown$]).pipe(
          map(state => state.reduce((acc, stateItem) => acc && stateItem, false))
        )
      );
      expect(isExpanded).toBe(false);
    });
    it('should notify backdrop state', async () => {
      service.notifyBackdropShown();
      let isBackdropShown = await firstValueFrom(service.isBackdropShown$);
      expect(isBackdropShown).toBe(true);
      service.notifyBackdropHidden();
      isBackdropShown = await firstValueFrom(service.isBackdropShown$);
      expect(isBackdropShown).toBe(false);
    });
  });
});
