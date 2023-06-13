import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from '../../services';
import { LevelsComponent } from './levels.component';

describe('LevelsComponent', () => {
  let component: LevelsComponent;
  let fixture: ComponentFixture<LevelsComponent>;

  beforeEach(() => {
    const rewardsServiceStub = () => ({
      rewardTrack: { pipe: () => ({}) },
      getTrackLevels: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LevelsComponent],
      providers: [{ provide: RewardsService, useFactory: rewardsServiceStub }]
    });
    fixture = TestBed.createComponent(LevelsComponent);
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
      spyOn(rewardsServiceStub, 'getTrackLevels').and.callThrough();
      component.ngOnInit();
      expect(rewardsServiceStub.getTrackLevels).toHaveBeenCalled();
    });
  });
});
