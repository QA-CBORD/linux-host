import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultPasswordChangeCs } from '@shared/model/content-strings/default-strings';

export class PasswordChangeCsModel extends ContentStringModel {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(nullable: NullableContent, args?: any) {
    super(nullable.getConfig(), defaultPasswordChangeCs);
  }

  get currentPassword(): string {
    return this.content.current_password;
  }
  get newPassword(): string {
    return this.content.new_password;
  }
}
