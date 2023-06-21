import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MealDonationsTileComponent } from './meal-donations-tile.component';

describe('MealDonationsTileComponent', () => {
  let component: MealDonationsTileComponent;
  let fixture: ComponentFixture<MealDonationsTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MealDonationsTileComponent]
    });
    fixture = TestBed.createComponent(MealDonationsTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
