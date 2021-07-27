import { ContentStringModel, NullableContent } from "@shared/model/content-strings/content-string-models";
import { checkingDefaultCs } from "@shared/model/content-strings/default-strings";

export class CheckingContentCsModel extends ContentStringModel {
    constructor(nullable: NullableContent) {
        super(nullable.getConfig(), checkingDefaultCs);
      }
}