import { ContentStringModel, NullableContent } from "@shared/model/content-strings/content-string-models";
import { guestAddFundsDefaultStrings } from "@shared/model/content-strings/default-strings";

export class GuestAddFundsCsModel extends ContentStringModel {
    constructor(contentWrapper: NullableContent) {
        super(contentWrapper, guestAddFundsDefaultStrings);
    }
}