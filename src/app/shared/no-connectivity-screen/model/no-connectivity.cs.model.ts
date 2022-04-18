import { ContentStringModel, NullableContent } from "@shared/model/content-strings/content-string-models";
import { noConnectivityScreentDefaultStrings } from "@shared/model/content-strings/default-strings";

export class ConnectivityScreenCsModel extends ContentStringModel{
    constructor(contentWrapper: NullableContent){
        super(contentWrapper.getConfig(), noConnectivityScreentDefaultStrings);
    }
}