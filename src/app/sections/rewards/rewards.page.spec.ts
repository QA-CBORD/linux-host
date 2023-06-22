import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RewardsService } from './services';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { RewardsPage } from './rewards.page';

describe('RewardsPage', () => {
  let component: RewardsPage;
  let fixture: ComponentFixture<RewardsPage>;

  beforeEach(() => {
    const platformStub = () => ({ ready: () => ({ then: () => ({}) }) });
    const rewardsServiceStub = () => ({
      getUserOptInStatus: () => ({}),
      getRewardsTabsConfig: () => ({}),
      getContentValueByName: headerTitle => ({})
    });
    const nativeProviderStub = () => ({ isWeb: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RewardsPage],
      providers: [
        { provide: Platform, useFactory: platformStub },
        { provide: RewardsService, useFactory: rewardsServiceStub },
        { provide: NativeProvider, useFactory: nativeProviderStub }
      ]
    });
    fixture = TestBed.createComponent(RewardsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('isShowToolbar', () => {
    it('makes expected calls', () => {
      const nativeProviderStub: NativeProvider = fixture.debugElement.injector.get(
        NativeProvider
      );
     jest.spyOn(nativeProviderStub, 'isWeb');
      component.isShowToolbar();
      expect(nativeProviderStub.isWeb).toHaveBeenCalled();
    });
  });
});
