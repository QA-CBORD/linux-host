import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './types/question-base';
import { QuestionHeader } from './questions.model';

@Component({
  selector: 'st-question',
  templateUrl: './question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  @Input() question: QuestionBase;

  @Input() parentGroup: FormGroup;

  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  getHeaderHTML(question: QuestionHeader): string {
    return `<${question.subtype}>${question.label}</${question.subtype}>`;
  }
}
