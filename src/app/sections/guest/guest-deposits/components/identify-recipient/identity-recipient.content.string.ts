import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultIdentifyRecipientCs } from '@shared/model/content-strings/default-strings';

export class IdentifyRecipientCsModel extends ContentStringModel {
  constructor(nullable: NullableContent) {
    super(nullable.getConfig(), defaultIdentifyRecipientCs);
  }

  get title(): string {
    return this.content.screen_title;
  }

  get subTitle(): string {
    return this.content.sub_title;
  }

  get removeText(): string {
    return this.content.remove_recipient_btn_text;
  }

  get addNewRecipientText(): string {
    return this.content.add_new_recipient_text;
  }

  get addOtherRecipientText(): string {
    return this.content.add_other_recipient_Text;
  }

  get submitText(): string {
    return this.content.submit_btn;
  }

  get addNewRecipientFailureMessage(): string {
    return this.content.add_new_recipient_failure;
  }

  get removeDialogTitle(): string {
    return this.content.remove_recipient_dialog_title;
  }
  get removeDialogMessage(): string {
    return this.content.remove_recipient_dialog_msg;
  }
  get removeDialogCancel(): string {
    return this.content.remove_recipient_dialog_cancel;
  }
  get removeDialogConfirm(): string {
    return this.content.remove_recipient_dialog_confirm;
  }

  get shouldSaveForFuture(): string{
    return this.content.save_recipient_for_future;
  }
}
