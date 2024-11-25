import { ONE_LETTER_MIN } from '@core/utils/regexp-patterns';

export interface InputValidator {
  test: (value) => boolean;
}

export class SupportedInputValidators {

  static min(min: number): InputValidator {
    return {
      test: value => {
        return value && value.length >= min;
      },
    };
  }

  static email(): InputValidator {
    return {
      // eslint-disable-next-line no-useless-escape
      test: value => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value),
    };
  }

  static max(max: number): InputValidator {
    return {
      test: value => {
        return value && value.length <= max;
      },
    };
  }

  static minOneLowerCase: InputValidator = {
    test: value => {
      return /[a-z]/.test(value);
    },
  };

  static minOneLetter: InputValidator = {
    test: value => {
      return ONE_LETTER_MIN.test(value);
    },
  };

  static minOneUpperCase: InputValidator = {
    test: value => {
      return /[A-Z]/.test(value);
    },
  };

  static minOneDigit: InputValidator = {
    test: value => {
      return /\d/.test(value);
    },
  };

  static required: InputValidator = {
    test: value => {
      return !!value;
    },
  };

  static minOneSpecialChar: InputValidator = {
    test: value => {
      // eslint-disable-next-line no-useless-escape
      const testResult = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
      return testResult;
    },
  };
}

export interface Validation {
  label: string;
  validator: InputValidator;
  supported?: boolean;
}
