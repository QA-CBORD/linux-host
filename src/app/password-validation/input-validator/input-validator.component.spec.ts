import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegistrationService } from '../../non-authorized/pages/registration/services/registration.service';
import { InputValidatorComponent } from './input-validator.component';

describe('InputValidatorComponent', () => {
  let component: InputValidatorComponent;
  let fixture: ComponentFixture<InputValidatorComponent>;

  beforeEach(() => {
    const registrationServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InputValidatorComponent],
      providers: [
        { provide: RegistrationService, useFactory: registrationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(InputValidatorComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`validators has default value`, () => {
    expect(component.validators).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'subscribe2ControlChanges').and.callThrough();
      component.ngOnInit();
      expect(component.subscribe2ControlChanges).toHaveBeenCalled();
    });
  });
});
