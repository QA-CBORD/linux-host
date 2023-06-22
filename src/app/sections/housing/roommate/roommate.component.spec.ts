import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RoommateComponent } from './roommate.component';

describe('RoommateComponent', () => {
  let component: RoommateComponent;
  let fixture: ComponentFixture<RoommateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RoommateComponent]
    });
    fixture = TestBed.createComponent(RoommateComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
