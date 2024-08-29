import { ValidationController } from './input-validator.model';
import { Validation } from 'src/app/non-authorized/pages/registration/models/password-validation';

describe('ValidationController', () => {
  let validation: Validation;
  let validationController: ValidationController;

  beforeEach(() => {
    validation = {
      label: 'Test Label',
      validator: {
        test: jest.fn(),
      },
    };
    validationController = new ValidationController(validation);
  });

  it('should initialize properties correctly', () => {
    expect(validationController.label).toBe('Test Label');
    expect(validationController.src).toBe('/assets/icon/password-dot.svg');
  });

  it('should evaluate validation correctly and update src when criteria is met', () => {
    (validation.validator.test as jest.Mock).mockReturnValue(true);
    const result = validationController.test('testValue');
    expect(result).toBe(true);
    expect(validationController.src).toBe('/assets/icon/password-dot-complete.svg');
  });

  it('should evaluate validation correctly and update src when criteria is not met', () => {
    (validation.validator.test as jest.Mock).mockReturnValue(false);
    const result = validationController.test('testValue');
    expect(result).toBe(false);
    expect(validationController.src).toBe('/assets/icon/password-dot.svg');
  });
});
