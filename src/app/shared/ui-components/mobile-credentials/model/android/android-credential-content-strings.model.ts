import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultMobileCredentialCs } from '@shared/model/content-strings/default-strings';


export class NfcDialogCsModel extends ContentStringModel {
  constructor(nullable: NullableContent, args?: any) {
    super(nullable, defaultMobileCredentialCs.nfc_dialog_defaults);
  }

  get acceptBtnTxt(): string {
    return this.content.nfc_off_dialog_accept;
  }

  get cancelBtnTxt(): string {
    return this.content.nfc_off_dialog_cancel;
  }

  get messageTxt(): string {
    return this.content.nfc_off_dialog_text;
  }

  get title(): string {
    return this.content.nfc_off_dialog_title;
  }
}

export class AndroidCredentialCsModel extends ContentStringModel {
  private nfcDialogCsModel: NfcDialogCsModel;

  constructor(nullable: NullableContent, args?: any) {
    super(nullable, defaultMobileCredentialCs);
    this.nfcDialogCsModel = new NfcDialogCsModel(this.content);
  }

  get nfcDialogCs(): NfcDialogCsModel {
    return this.nfcDialogCsModel;
  }

  get terms(): string {
    return this.content.terms;
  }

  get usageInstructions(): string {
    return this.content['usage-instructions'];
  }
}
