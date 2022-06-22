import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import {
  SupportedInputValidators,
  Validation,
} from 'src/app/non-authorized/pages/registration/models/password-validation';

export class ValidationController {
  private readonly criteriMetIcon = '/assets/icon/password-dot-complete.svg';
  private readonly criteriaNotMetIcon = '/assets/icon/password-dot.svg';
  public src: string = this.criteriaNotMetIcon;
  public label: string;

  constructor(public validation: Validation) {
    this.label = validation.label;
  }

  test(value: string): boolean {
    return this.evaluate({ test: () => this.validation.validator.test(value) });
  }

  private evaluate(predicate: { test: () => boolean }): boolean {
    const criteriaMet = predicate.test();
    this.src = (criteriaMet && this.criteriMetIcon) || this.criteriaNotMetIcon;
    return criteriaMet;
  }
}

const passwordValidations: { [key: string]: Validation } = {
  at_least_one_number: {
    label: 'at least one numeric value',
    validator: SupportedInputValidators.minOneDigit,
    supported: true,
  },

  at_least_one_letter: {
    label: 'at least one letter',
    validator: SupportedInputValidators.minOneLetter,
    supported: true,
  },

  at_least_one_uppercase: {
    label: 'At least one upper case',
    validator: SupportedInputValidators.minOneUpperCase,
  },

  at_least_one_lowercase: {
    label: 'At least one lower case',
    validator: SupportedInputValidators.minOneLowerCase,
  },

  at_least_one_special_char: {
    label: 'At least one special character',
    validator: SupportedInputValidators.minOneSpecialChar,
  },

  required_password_length: {
    label: 'must be at least 7 characters',
    validator: SupportedInputValidators.min(7),
    supported: true,
  },
};

export const buildPasswordValidators = (contentStringModel?: ContentStringModel): ValidationController[] => {
  const validations = { ...passwordValidations };
  return Object.keys(validations)
    .filter(key => validations[key].supported)
    .map(key => {
      const label = (contentStringModel && contentStringModel.valueByKey(key)) || validations[key].label;
      const validation = { ...validations[key], label };
      return new ValidationController(validation);
    });
};
