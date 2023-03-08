import { ContentStringModel, NullableContent } from "@shared/model/content-strings/content-string-models";
import { defaultCreditCardMgmtCs } from "@shared/model/content-strings/default-strings";



export class creditCardMgmtCsModel extends ContentStringModel {
    constructor(nullable: NullableContent) {
      super(nullable.getConfig(), defaultCreditCardMgmtCs);
    }

    get settingTitle(): string {
      return this.content.screen_title;
    }

    get settingSubTitle(): string {
      return this.content.sub_title;
    }

  }
