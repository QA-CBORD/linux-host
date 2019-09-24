import { QuestionTextbox } from './question-textbox';
import { QuestionDropdown } from './question-dropdown';
import { QuestionTextarea } from './question-textarea';
import { ReorderQuestion } from './question-reorder';

export class QuestionDetails {
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    placeholder: string;
    textbox: QuestionTextbox;
    dropdown: QuestionDropdown;
    textarea: QuestionTextarea;
    reorder: ReorderQuestion;

    constructor(options: any) {
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
                this.textbox = new QuestionTextbox(options);
                break;
            case 'select':
                this.dropdown = new QuestionDropdown(options);
                break;
            case 'textarea':
                this.textarea = new QuestionTextarea(options);
                break;
           case 'reorder':
               this.reorder = new ReorderQuestion(options);
               break;
            case '':
                break;
        }
    }
}
