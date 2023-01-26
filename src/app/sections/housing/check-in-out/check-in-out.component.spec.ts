import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckInOutComponent } from './check-in-out.component';

describe('CheckInOutComponent', () => {
  let component: CheckInOutComponent;
  let fixture: ComponentFixture<CheckInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckInOutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rooms Tab', () => {
    it('Check in/out accordeon should exist', () => {
      expect(component).toBeTruthy();
    });
  });
});
