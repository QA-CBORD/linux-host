import { AbstractControl, ValidationErrors } from '@angular/forms';
import { numericValidator, integerValidator } from './index';

describe('Validators', () => {
  describe('numericValidator', () => {
    let control: AbstractControl;
    let errors: ValidationErrors | null;

    beforeEach(() => {
      errors = null;
    });

    it('should return null if control value is numeric', () => {
      control = { value: '123' } as AbstractControl;

      errors = numericValidator()(control);
      expect(errors).toBeNull();
    });

    it('should return numeric error if control value is not numeric', () => {
      control = { value: 'abc' } as AbstractControl;
      errors = numericValidator()(control);
      expect(errors).toEqual({ numeric: true });
    });

    it('should return null if control value is empty', () => {
      control = { value: null } as AbstractControl;
      errors = numericValidator()(control);
      expect(errors).toBeNull();
    });
  });

  describe('integerValidator', () => {
    let control: AbstractControl;
    let errors: ValidationErrors | null;

    beforeEach(() => {
      control = { value: null } as AbstractControl;
      errors = null;
    });

    it('should return null if control value is integer', () => {
      control = { value: '123' } as AbstractControl;
      errors = integerValidator()(control);
      expect(errors).toBeNull();
    });

    it('should return integer error if control value is not integer', () => {
      control = { value: '1.23' } as AbstractControl;
      errors = integerValidator()(control);
      expect(errors).toEqual({ integer: true });
    });

    it('should return null if control value is empty', () => {
      errors = integerValidator()(control);
      expect(errors).toBeNull();
    });
  });
});
