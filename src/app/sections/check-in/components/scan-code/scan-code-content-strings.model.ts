import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultScanCodeStrings } from '@shared/model/content-strings/default-strings';

export class ScanCodeCsModel extends ContentStringModel {
  constructor(nullable: NullableContent) {
    super(nullable.getConfig(), defaultScanCodeStrings);
  }

  get title(): string {
    return this.content.scan_code_title;
  }

  get prompt(): string {
    return this.content.scan_code_prompt;
  }

  get textBtn(): string {
    return this.content.scan_code_button_text;
  }
}
