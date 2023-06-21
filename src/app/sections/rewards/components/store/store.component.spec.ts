import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from '../../services';
import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(() => {
    const rewardsServiceStub = () => ({
      getStoreRewards: () => ({}),
      rewardTrack: {},
      getStoreActiveRewards: () => ({}),
      getContentValueByName: activeRewardsLabel => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StoreComponent],
      providers: [{ provide: RewardsService, useFactory: rewardsServiceStub }]
    });
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const rewardsServiceStub: RewardsService = fixture.debugElement.injector.get(
        RewardsService
      );
     jest.spyOn(rewardsServiceStub, 'getStoreRewards');
     jest.spyOn(rewardsServiceStub, 'getStoreActiveRewards');
      component.ngOnInit();
      expect(rewardsServiceStub.getStoreRewards).toHaveBeenCalled();
      expect(rewardsServiceStub.getStoreActiveRewards).toHaveBeenCalled();
    });
  });
});
