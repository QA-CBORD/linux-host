import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from '@sections/rewards/services';
import { RewardsPopoverComponent } from './rewards-popover.component';

describe('RewardsPopoverComponent', () => {
  let component: RewardsPopoverComponent;
  let fixture: ComponentFixture<RewardsPopoverComponent>;

  beforeEach(() => {
    const rewardsServiceStub = () => ({
      getContentValueByName: levelLabel => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RewardsPopoverComponent],
      providers: [{ provide: RewardsService, useFactory: rewardsServiceStub }]
    });
    fixture = TestBed.createComponent(RewardsPopoverComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
