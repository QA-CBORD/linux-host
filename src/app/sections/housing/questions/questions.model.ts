import { FormGroup } from '@angular/forms';
import { QuestionBase } from './types/question-base';

export * from './types/question-header';
export * from './types/question-paragraph';
export * from './types/question-textbox';
export * from './types/question-textarea';
export * from './types/question-date';
export * from './types/question-checkbox-group';
export * from './types/question-dropdown';
export * from './types/question-reorder';
export * from './types/question-form-control';

export interface QuestionPage {
  form: FormGroup;
  questions: QuestionBase[];
}
