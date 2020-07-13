import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StActivateLocationItemComponent } from './st-activate-location-item.component';

describe('StActivateLocationItemComponent', () => {
  let component: StActivateLocationItemComponent;
  let fixture: ComponentFixture<StActivateLocationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StActivateLocationItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StActivateLocationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
