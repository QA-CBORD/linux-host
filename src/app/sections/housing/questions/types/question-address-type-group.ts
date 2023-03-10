import { isDefined } from '@sections/housing/utils';
import { QuestionBase, QuestionBaseOptions, QuestionBaseOptionValue } from './question-base';


export interface QuestionAddressTypeGroupOptions extends QuestionBaseOptions {
    required: boolean;
    inline: boolean;
    name: string;
    other: boolean;
    values: QuestionBaseOptionValue[];
    consumerKey: number;
    readonly: boolean;
    addressTypeId: number;
    dataType: string[];
    source: string;
}

export class QuestionAddressTypeGroup extends QuestionBase implements QuestionAddressTypeGroupOptions {
    required: boolean;
    inline: boolean;
    name: string;
    other: boolean;
    values: QuestionBaseOptionValue[];
    consumerKey: number;
    readonly: boolean;
    addressTypeId: number;
    dataType: string[];
    source: string;

    constructor(options: QuestionAddressTypeGroupOptions) {
        if (!isDefined(options) || typeof options !== 'object') {
            options = {} as QuestionAddressTypeGroupOptions;
        }

        super(options);

        this.type = 'address-group';
        this.name = String(options.name);
        this.values = Array.isArray(options.values)
            ? options.values : [];
        this.readonly = Boolean(options.readonly);
        this.consumerKey = Number(options.consumerKey);
        this.inline = Boolean(options.inline);
        this.other = Boolean(options.other);
        this.required = Boolean(options.required);
        this.source = String(options.source);
        this.addressTypeId = Number(options.addressTypeId);
        this.dataType = Array.isArray(options.dataType)
            ? options.dataType : [];
    }
  }
