import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultLocationDisclosureStrings } from '@shared/model/content-strings/default-strings';

export class LocationDisclosureCsModel extends ContentStringModel {
  constructor(nullable: NullableContent) {
    super(nullable.getConfig(), defaultLocationDisclosureStrings);
  }

  get title(): string {
    return this.content.disclosure_title;
  }

  get text(): string {
    return this.content.disclosure_text;
  }

  get textBtn(): string {
    return this.content.disclosure_button_text;
  }

  get cancelBtn(): string {
    return this.content.disclosure_button_cancel;
  }
}
