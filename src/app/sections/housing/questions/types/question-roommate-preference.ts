import { define, isDefined } from '@sections/housing/utils';
import { QuestionBaseOptionValue } from './question-base';

import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter = 0;

export interface ActionFunc {
    (metaData: string): void
}

export interface QuestionRoommatePreferenceOptions extends QuestionFormControlOptions {
    inline?: boolean;
    roommateSelection: boolean;
    values: QuestionBaseOptionValue[];
    prefRank?: number;
    searchOptions: string;
    showOptions: string;
}

export interface QuestionActionButtonOptions extends QuestionFormControlOptions {
    buttonText: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    metadata?: {};
    action: () => void;
}

export class QuestionRoommatePreference extends QuestionFormControl implements QuestionRoommatePreferenceOptions {
    inline?: boolean;
    roommateSelection: boolean;
    values: QuestionBaseOptionValue[];
    prefRank?: number;
    searchOptions: string;
    showOptions: string;

    constructor(options: QuestionRoommatePreferenceOptions) {
        if (!isDefined(options) || typeof options !== 'object') {
        options = {} as QuestionRoommatePreferenceOptions;
        }

        super(options);

        this.type = options.type || 'text';
        this.name = options.name || `text-${counter++}`;
        this.source = options.source;
        this.roommateSelection = define(options.roommateSelection, Boolean(options.roommateSelection));
        this.values = options.values || [];
        this.prefRank = define(options.prefRank, Number(options.prefRank));
        this.showOptions = String(options.showOptions);
        this.searchOptions = String(options.searchOptions);
    }
}

export class QuestionActionButton extends QuestionFormControl implements QuestionActionButtonOptions {
    // eslint-disable-next-line @typescript-eslint/ban-types
    metadata?: {};
    action: () => void;
    buttonText: string;

    constructor(options: QuestionActionButtonOptions) {
        if (!isDefined(options) || typeof options !== 'object') {
            options = {} as QuestionActionButtonOptions;
        }

        super(options);

        this.type = 'action-button';
        this.name = options.name || `text-${counter++}`;
        this.source =options.source;
        this.action = options.action;
        this.metadata = options.metadata || {};
        this.buttonText = String(options.buttonText);
    }
}
