import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from '../../services';
import { LevelsComponent } from './levels.component';
import { from, map, of } from 'rxjs';
import { tr } from 'date-fns/locale';
import { CommonModule } from '@angular/common';

describe('LevelsComponent', () => {
  let component: LevelsComponent;
  let fixture: ComponentFixture<LevelsComponent>;
  const rewardsService = {
    rewardTrack: of({
      userLevel: 1,
      trackLevels: [
        { level: 1, name: 'Level 1' },
        { level: 2, name: 'Level 2' },
      ],
    }),
    getTrackLevels: jest.fn(() => of([])),
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LevelsComponent],
      providers: [{ provide: RewardsService, useValue: rewardsService }],
      imports: [CommonModule]
    });
    fixture = TestBed.createComponent(LevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the expected values to observables', () => {
      const trackInfo = { currentLevel: 1, currentPoints: 100 };
      const levels = [{ level: 1, points: 100 }];
      const tarackLevels = jest.spyOn(rewardsService, 'getTrackLevels').mockReturnValue(map(() => levels) as any);
      expect(component.trackInfo$).toBeDefined();
      expect(component.currentLevelInfo$).toBeDefined();
      expect(component.levels$).toBeDefined();
      expect(component.nextLevelPoints$).toBeDefined();
      expect(tarackLevels).toHaveBeenCalled();
    }
    )
  });
});
