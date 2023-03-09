import { ContentStringInfo } from "@core/model/content/content-string-info.model";
import { RawContentStringObject } from "./content-string-models";

export const reduceToObject = (data: ContentStringInfo[], defaultValues={}): RawContentStringObject => {
    data = data || [];
    return !data.length && defaultValues || data.reduce((init, { name, value }) => ({ ...init, [name]: value }), {});
}
