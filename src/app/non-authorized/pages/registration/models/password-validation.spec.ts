import { SupportedInputValidators, InputValidator } from './password-validation';

let validator: InputValidator;

describe('SupportedInputValidators', () => {
  describe('min', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.min(3);
    });

    it('should return true if the value has at least 3 characters', () => {
      const result = validator.test('123');
      expect(result).toBeTruthy();
    });

    it('should return false if the value has less than 3 characters', () => {
      const result = validator.test('12');
      expect(result).toBeFalsy();
    });

    it('should return false if the value is empty', () => {
      const result = validator.test('');
      expect(result).toBeFalsy();
    });

    it('should return false if the value is null', () => {
      const result = validator.test(null);
      expect(result).toBeFalsy();
    });

    it('should return false if the value is undefined', () => {
      const result = validator.test(undefined);
      expect(result).toBeFalsy();
    });
  });

  describe('email', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.email();
    });

    it('should return true if the value is a valid email', () => {
      const result = validator.test('' + Math.random() + '@gmail.com');
      expect(result).toBeTruthy();
    });
  });

  describe('max', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.max(3);
    });

    it('should return true if the value has at most 3 characters', () => {
      const result = validator.test('123');
      expect(result).toBeTruthy();
    });

    it('should return false if the value has more than 3 characters', () => {
      const result = validator.test('1234');
      expect(result).toBeFalsy();
    });
  
  });

  describe('minOneLowerCase', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.minOneLowerCase;
    });

    it('should return true if the value contains at least one lowercase letter', () => {
      const result = validator.test('Password123');
      expect(result).toBeTruthy();
    });

    it('should return false if the value does not contain any lowercase letter', () => {
      const result = validator.test('PASSWORD123');
      expect(result).toBeFalsy();
    });

    it('should return false if the value is empty', () => {
      const result = validator.test('');
      expect(result).toBeFalsy();
    });
  });

  describe('minOneLetter', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.minOneLetter;
    });

    it('should return true if the value contains at least one letter', () => {
      const result = validator.test('Password123');
      expect(result).toBeTruthy();
    });

    it('should return false if the value does not contain any letter', () => {
      const result = validator.test('123');
      expect(result).toBeFalsy();
    });
  });

  describe('minOneUpperCase', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.minOneUpperCase;
    });

    it('should return true if the value contains at least one uppercase letter', () => {
      const result = validator.test('Password123');
      expect(result).toBeTruthy();
    });

    it('should return false if the value does not contain any uppercase letter', () => {
      const result = validator.test('password123');
      expect(result).toBeFalsy();
    });
  });

  describe('minOneDigit', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.minOneDigit;
    });

    it('should return true if the value contains at least one digit', () => {
      const result = validator.test('Password123');
      expect(result).toBeTruthy();
    });
  });

  describe('required', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.required;
    });

    it('should return true if the value is not empty', () => {
      const result = validator.test('Password123');
      expect(result).toBeTruthy();
    });

    it('should return false if the value is empty', () => {
      const result = validator.test('');
      expect(result).toBeFalsy();
    });
  });

  describe('minOneSpecialChar', () => {
    beforeAll(() => {
      validator = SupportedInputValidators.minOneSpecialChar;
    });

    it('should return true if the value contains at least one special character', () => {
      const result = validator.test('Password123!');
      expect(result).toBeTruthy();
    });

    it('should return false if the value does not contain any special character', () => {
      const result = validator.test('Password123');
      expect(result).toBeFalsy();
    });
  });
});
