import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import {
  IViewableValidator,
  CustomValidator,
  Cvalidators,
} from 'src/app/non-authorized/pages/registration/models/password-validation';

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

const defaultPasswordValidators: { [key: string]: IViewableValidator } = {
  at_least_one_number: {
    label: 'at least one numeric value',
    validator: Cvalidators.minOneDigit,
    supported: true,
  },

  at_least_one_letter: {
    label: 'at least one letter',
    validator: Cvalidators.minOneLetter,
    supported: true,
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
    label: 'At least one special character',
    validator: Cvalidators.minOneSpecialChar,
  },

  required_password_length: {
    label: 'must be at least 7 characters',
    validator: Cvalidators.min(7),
    supported: true,
  },
};

export const buildPasswordValidators = (contentStrings?: ContentStringInfo[]): InputValidator[] => {
  const validators = [];
  if (contentStrings && contentStrings.length) {
    contentStrings.forEach(({ name: key, value }) => {
      if (defaultPasswordValidators[key] && defaultPasswordValidators[key].supported) {
        validators.push(new InputValidator(defaultPasswordValidators[key].validator, value));
      }
    });
    return validators;
  }

  Object.keys(defaultPasswordValidators).forEach(key => {
    if (defaultPasswordValidators[key].supported) {
      const { validator, label } = defaultPasswordValidators[key];
      validators.push(new InputValidator(validator, label));
    }
  });
  return validators;
};

export const getDefaultPasswordValidators = (): CustomValidator[] => {
  return [Cvalidators.password(), ...buildPasswordValidators().map(item => item.validator)];
};
