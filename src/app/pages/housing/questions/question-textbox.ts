export class QuestionTextbox {
  controlType: string = 'textbox';
  type: string;

  constructor(options) {
    this.type = options.subtype || '';
  }
}
