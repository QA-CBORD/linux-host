import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RewardsService } from './services';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { RewardsPage } from './rewards.page';
import { Observable, of } from 'rxjs';
import { TabsConfig } from '@core/model/tabs/tabs.model';
import { OPT_IN_STATUS } from './rewards.config';
describe('RewardsPage', () => {
  const rxjs = jest.requireActual('rxjs');
  let component: RewardsPage;
  let fixture: ComponentFixture<RewardsPage>;
  const muckTabsConfig: TabsConfig = {
    tabs: [],
  };

  const platform = {
    ready: jest.fn(() => Promise.resolve()),
  };
  beforeEach(() => {
    const rewardsServiceStub = () => ({
      getUserOptInStatus: () => ({}),
      getRewardsTabsConfig: () => ({}),
      getContentValueByName: headerTitle => ({}),
    });
    const nativeProviderStub = () => ({ isWeb: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RewardsPage],
      providers: [
        { provide: Platform, useValue: platform },
        { provide: RewardsService, useFactory: rewardsServiceStub },
        { provide: NativeProvider, useFactory: nativeProviderStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RewardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('isShowToolbar', () => {
    it('makes expected calls', () => {
      const nativeProviderStub: NativeProvider = fixture.debugElement.injector.get(NativeProvider);
      jest.spyOn(nativeProviderStub, 'isWeb');
      component.isShowToolbar();
      expect(nativeProviderStub.isWeb).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    //TODO: Fix this test (onInit is not called when using platform ready)
    // it('makes expected calls', () => {
    //   component.ngOnInit();
    //   expect(jest.spyOn(component as any, 'setContentStrings')).toHaveBeenCalled();
    //   expect(jest.spyOn(component as any, 'initComponent')).toHaveBeenCalled();
    // });
  });

  //TODO: Fix this test when removing platfotm ready implementation
  // describe('initComponent', () => {
  //   it('makes expected calls', () => {
  //     const rewardsServiceStub: RewardsService = fixture.debugElement.injector.get(RewardsService);
  //     jest
  //       .spyOn(rxjs, 'combineLatest')
  //       .mockReturnValue(of([OPT_IN_STATUS.yes, muckTabsConfig] as [OPT_IN_STATUS, TabsConfig]));
  //     jest.spyOn(rewardsServiceStub, 'getUserOptInStatus').mockReturnValue(of(OPT_IN_STATUS.yes));
  //     jest.spyOn(rewardsServiceStub, 'getRewardsTabsConfig').mockReturnValue(of(muckTabsConfig));
  //     component['initComponent']();
  //     expect(component.optInStatus).toEqual(OPT_IN_STATUS.yes);
  //     expect(component.tabsConfig).toEqual(muckTabsConfig);
  //   });
  // });
  describe('setContentStrings', () => {
    it('makes expected calls', () => {
      const rewardsServiceStub: RewardsService = fixture.debugElement.injector.get(RewardsService);
      jest.spyOn(rewardsServiceStub, 'getContentValueByName');
      component['setContentStrings']();
      expect(rewardsServiceStub.getContentValueByName).toHaveBeenCalled();
    });
  });
});
