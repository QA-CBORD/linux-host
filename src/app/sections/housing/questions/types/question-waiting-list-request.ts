import { define, isDefined } from '@sections/housing/utils';
import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter = 0;

export interface QuestionWaitingListRequestOptions extends QuestionFormControlOptions {
    attributeSelection?: boolean;
    facilitySelection?: boolean;
}

export class QuestionWaitingListRequest extends QuestionFormControl implements QuestionWaitingListRequestOptions {
    attributeSelection?: boolean;
    facilitySelection?: boolean;

    constructor(options: QuestionWaitingListRequestOptions) {
        if (!isDefined(options) || typeof options !== 'object') {
            options = {} as QuestionWaitingListRequestOptions;
        }

        super(options);

        this.type = options.type || 'text';
        this.name = options.name || `text-${counter++}`;
        this.source = String(options.source);
        this.attributeSelection = define(options.attributeSelection, Boolean(options.attributeSelection));
        this.facilitySelection = define(options.facilitySelection, Boolean(options.facilitySelection));
    }
}
