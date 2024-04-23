import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StProgressBarComponent } from './st-progress-bar.component';

describe('StProgressBarComponent', () => {
  let component: StProgressBarComponent;
  let fixture: ComponentFixture<StProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate width correctly', () => {
    component.currentPointsSpent = 50;
    component.nextLevelPoints = 100;
    expect(component.width).toEqual(50);

    component.currentPointsSpent = 150;
    component.nextLevelPoints = 100;
    expect(component.width).toEqual(100);

    component.currentPointsSpent = 50;
    component.nextLevelPoints = 0;
    expect(component.width).toEqual(100);
  });

  it('should calculate expToNextLvl correctly', () => {
    component.currentPointsSpent = 50;
    component.nextLevelPoints = 100;
    expect(component.expToNextLvl).toEqual('50/100XP');

    component.currentPointsSpent = 50;
    component.nextLevelPoints = 0;
    expect(component.expToNextLvl).toEqual('Max Level');
  });
});