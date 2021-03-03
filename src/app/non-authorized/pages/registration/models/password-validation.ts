export interface CustomValidator {
  test: (value) => boolean;
}

export class Cvalidators {
  static nullablePhone(): CustomValidator {
    return {
      test: value => {
        return !value || (/^[0-9]*$/.test(value) && (value.length >= 9 && value.length <= 10));
      },
    };
  }

  static min(min: number): CustomValidator {
    return {
      test: value => {
        return value && value.length >= min;
      },
    };
  }

  static password(): CustomValidator {
    return {
      test: value => value && (value.length >= 8 && value.length <= 12),
    };
  }

  static email(): CustomValidator {
    return {
      test: value => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value),
    };
  }

  static max(max: number): CustomValidator {
    return {
      test: value => {
        return value && value.length <= max;
      },
    };
  }

  static requiredRange(min: number, max: number): CustomValidator {
    return {
      test: value =>  value.length >= min && value.length <= max
    };
  }

  static minOneLowerCase: CustomValidator = {
    test: value => {
      return /[a-z]/.test(value);
    },
  };

  static minOneUpperCase: CustomValidator = {
    test: value => {
      return /[A-Z]/.test(value);
    },
  };

  static minOneDigit: CustomValidator = {
    test: value => {
      return /\d/.test(value);
    },
  };

  static required: CustomValidator = {
    test: value => {
      return !!value;
    },
  };

  static minOneSpecialChar: CustomValidator = {
    test: value => {
      const testResult = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
      return testResult;
    },
  };
}

export interface IViewableValidator {
  label: string;
  validator: CustomValidator;
}
