import { ContentStringInfo } from '@core/model/content/content-string-info.model';

export interface CustomValidator {
  test: (value) => boolean;
}

export const buildPasswordValidators = (contentStrings?: ContentStringInfo[]): InputValidator[] => {
  if (contentStrings && contentStrings.length) {
    return contentStrings.map(({ name: key, value }) => {
      return defaultPasswordValidators[key] && new InputValidator(defaultPasswordValidators[key].validator, value);
    });
  }
  const defaultValidators: InputValidator[] = [];
  for (const key in defaultPasswordValidators) {
    const { validator, label } = defaultPasswordValidators[key];
    defaultValidators.push(new InputValidator(validator, label));
  }
  return defaultValidators;
};

export class Cvalidators {
  static nullablePhone(): CustomValidator {
    return {
      test: value => {
        return !value || (/^[0-9]*$/.test(value) && (value.length >= 9 && value.length <=10));
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
      return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
    },
  };
}

export interface IViewableValidator {
  label: string;
  validator: CustomValidator;
}

const defaultPasswordValidators: { [key: string]: IViewableValidator } = {
  at_least_one_number: {
    label: 'At least one numeric value',
    validator: Cvalidators.minOneDigit,
  },
  at_least_one_uppercase: {
    label: 'At least one upper case',
    validator: Cvalidators.minOneUpperCase,
  },

  at_least_one_lowercase: {
    label: 'At least one lower case',
    validator: Cvalidators.minOneLowerCase,
  },

  at_least_one_special_char: {
    label: 'At least one special character [!@#$%^&*()_+-=]',
    validator: Cvalidators.minOneSpecialChar,
  },
};

export const getDefaultPasswordValidators = (): CustomValidator[] => {
  return [Cvalidators.password(), ...buildPasswordValidators().map(item => item.validator)];
};

export class InputValidator implements IViewableValidator {
  private readonly criteriMetIcon = '/assets/icon/password-dot-complete.svg';
  private readonly criteriaNotMetIcon = '/assets/icon/password-dot.svg';
  public src: string;

  constructor(public validator: CustomValidator, public label: string) {
    this.src = this.criteriaNotMetIcon;
  }

  test(value: string): boolean {
    return this.evaluate({ test: () => this.validator.test(value) });
  }

  private evaluate(predicate: { test: () => boolean }): boolean {
    const passwordCriteriaMet = predicate.test();
    this.src = (passwordCriteriaMet && this.criteriMetIcon) || this.criteriaNotMetIcon;
    return passwordCriteriaMet;
  }
}
