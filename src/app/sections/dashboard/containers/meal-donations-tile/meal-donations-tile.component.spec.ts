import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDonationsTileComponent } from './meal-donations-tile.component';

describe('MealDonationsTileComponent', () => {
  let component: MealDonationsTileComponent;
  let fixture: ComponentFixture<MealDonationsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealDonationsTileComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDonationsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
