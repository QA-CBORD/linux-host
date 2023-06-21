import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StepperFooterComponent } from './stepper-footer.component';

describe('StepperFooterComponent', () => {
  let component: StepperFooterComponent;
  let fixture: ComponentFixture<StepperFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StepperFooterComponent]
    });
    fixture = TestBed.createComponent(StepperFooterComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
