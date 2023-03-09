import { ContentStringModel, NullableContent } from "@shared/model/content-strings/content-string-models";
import { guestDashboardDefaultStrings } from "@shared/model/content-strings/default-strings";

export class GuestDashboardCsModel extends ContentStringModel{
    constructor(contentWrapper: NullableContent){
        super(contentWrapper.getConfig(), guestDashboardDefaultStrings);
    }
}
