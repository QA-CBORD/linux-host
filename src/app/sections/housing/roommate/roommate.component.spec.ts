import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoommateComponent } from './roommate.component';

describe('RoommateComponent', () => {
  let component: RoommateComponent;
  let fixture: ComponentFixture<RoommateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoommateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoommateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
