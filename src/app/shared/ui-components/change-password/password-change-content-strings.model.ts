import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultPasswordChangeCs } from '@shared/model/content-strings/default-strings';

export class PasswordChangeCsModel extends ContentStringModel {

  constructor(nullable: NullableContent, args?: any) {
    super(nullable, defaultPasswordChangeCs);
  }

  get currentPassword(): string {
    return this.content.current_password;
  }
  get newPassword(): string {
    return this.content.new_password;
  }
}