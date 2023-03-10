import { QuestionBase, QuestionBaseOptions } from './question-base';

export interface QuestionFormControlOptions extends QuestionBaseOptions {
  name?: string;
  required?: boolean;
  consumerKey?: number;
  preferenceKey?: number;
  facilityKey?: number;
  dataType?: string;
  source?: string;
  readonly?: boolean;
  workOrderFieldKey?:string;
  workOrderField?:string;
}

export class QuestionFormControl extends QuestionBase implements QuestionFormControlOptions {
  name: string;
  required: boolean;
  consumerKey: number;
  preferenceKey: number;
  facilityKey: number;
  dataType?: string;
  source?: string;
  readonly?: boolean;
  workOrderFieldKey?:string;
  workOrderField?:string;

  constructor(options: QuestionFormControlOptions = {}) {
    super(options);

    this.name = options.name;
    this.required = !!options.required;
    this.consumerKey = options.consumerKey >= 0 ? options.consumerKey : null;
    this.preferenceKey = options.preferenceKey >= 0 ? options.preferenceKey : null;
    this.facilityKey = options.facilityKey >= 0 ? options.facilityKey : null;
    this.readonly = options.readonly;
    this.workOrderFieldKey = options.workOrderFieldKey;
    this.workOrderField = options.workOrderField;

    if (options.dataType) {
      this.dataType = String(options.dataType);
    }

    if (options.source) {
      this.source = String(options.source);
    }
  }
}
