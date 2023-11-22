import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StBadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: StBadgeComponent;
  let fixture: ComponentFixture<StBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
