import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultPreloginCs } from '@shared/model/content-strings/default-strings';

export class PreloginCsModel extends ContentStringModel {
  constructor(nullable: NullableContent) {
    super(nullable.getConfig(), defaultPreloginCs);
    this.configure();
  }

  get continueAsGuest(): string {
    return this.content.continue_as_guest;
  }

  get continueAsNonGuest(): string {
    return this.content.continue_as_nonguest;
  }

  get instructions(): string {
    return this.content.pre_login_instruction;
  }

  protected configure(): void {
    const [asStudent, asPatient] = this.continueAsNonGuest.split('|');
    const isAccuteCare = this.params && this.params.acuteCare;
    this.content.continue_as_nonguest = (isAccuteCare && asPatient) || asStudent;
  }
}
