import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckInOutItemsComponent } from './check-in-out-items.component';

describe('CheckInOutItemsComponent', () => {
  let component: CheckInOutItemsComponent;
  let fixture: ComponentFixture<CheckInOutItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckInOutItemsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule, RouterTestingModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInOutItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Check in/out list item', () => {
    it('Check in/out component item should exist', () => {
      expect(component).toBeTruthy();
    });
  });
});
