import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RewardsTileComponent } from './rewards-tile.component';
import { RewardsService } from './services/rewards.service';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';

class MockRewardsService {
  rewardTrack$ = of("");
  getUserRewardTrackInfo = () => of("");

}

describe('RewardsTileComponent', () => {
  let component: RewardsTileComponent;
  let fixture: ComponentFixture<RewardsTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RewardsTileComponent],
      providers: [{ provide: RewardsService, useClass: MockRewardsService }],
      imports: [IonicModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
