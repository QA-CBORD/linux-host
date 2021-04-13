import { ContentStringModel, RawContentStringObject } from '@shared/model/content-strings/content-string-models';
import { defaultPasswordValidationStrings } from '@shared/model/content-strings/default-strings';

export class PasswordValidationCsModel extends ContentStringModel {
  constructor(public content: RawContentStringObject) {
    super(content, defaultPasswordValidationStrings);
  }

  get minOneLetter(): string {
    return this.content.at_least_one_letter;
  }

  get minOneLowerCaseLetter(): string {
    return this.content.at_least_one_lowercase;
  }

  get minOneNumber(): string {
    return this.content.at_least_one_number;
  }

  get minOneSpecialCharacter(): string {
    return this.content.at_least_one_special_char;
  }

  get minOneUpperCaseLetter(): string {
    return this.content.at_least_one_uppercase;
  }

  get requiredPasswordLength(): string {
    return this.content.required_password_length;
  }
}
