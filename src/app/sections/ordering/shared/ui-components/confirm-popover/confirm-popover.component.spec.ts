import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmPopoverComponent } from './confirm-popover.component';

describe('ConfirmPopoverComponent', () => {
  let component: ConfirmPopoverComponent;
  let fixture: ComponentFixture<ConfirmPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmPopoverComponent]
    });
    fixture = TestBed.createComponent(ConfirmPopoverComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
