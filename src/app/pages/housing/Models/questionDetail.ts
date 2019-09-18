import { TextboxQuestion } from './question-textbox';
import { DropdownQuestion } from './question-dropdown';
import { TextareaQuestion } from './question-textarea';
import { ReorderQuestion } from './question-reorder';

export class QuestionDetails {
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    placeholder: string;
    textbox: TextboxQuestion;
    dropdown: DropdownQuestion;
    textarea: TextareaQuestion;
    reorder: ReorderQuestion;

    constructor(options) {
        this.key = options.name;
        this.label = options.label;
        this.required = options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.type  || '';
        this.placeholder = options.placeholder === '' ? options.label : options.placeholder;
        this.PopulateControlType(options);
    }

    private PopulateControlType(options: {}) {
        switch (this.controlType) {
            case 'text':
                this.textbox = new TextboxQuestion(options);
                break;
            case 'select':
                this.dropdown = new DropdownQuestion(options);
                break;
            case 'textarea':
                this.textarea = new TextareaQuestion(options);
                break;
           case 'reorder':
               this.reorder = new ReorderQuestion(options);
               break;
            case '':
                break;
        }
    }
}
