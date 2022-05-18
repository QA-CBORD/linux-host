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

export interface QuestionsPage {
  form: FormGroup;
  questions: QuestionBase[];
}

export enum QUESTIONS_SOURCES {
  PATRON = 'PATRON',
  FACILITY = 'FACILITY',
  FACILITY_CORE = 'FACILITY_CORE',
  CORE = 'CORE',
  FACILITY_TYPE = 'FACILITY_TYPE',
  ASSET_TYPE = 'ASSET_TYPE',
  CELL_PROVIDER = 'CELL_PROVIDER',
  CONTRACT_DETAILS = 'CONTRACT_DETAILS',
  ADDRESS_TYPES = 'ADDRESS_TYPES',
  WORK_ORDER = 'WORK_ORDER'
}

export enum QUESTIONS_TYPES {
  FACILITY = 'FACILITY'
}
