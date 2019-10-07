import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './types/question-base';
import { QuestionHeader } from './questions.model';

@Component({
  selector: 'st-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  @Input() question: QuestionBase;

  @Input() parentGroup: FormGroup;

  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  getHeaderHTML(question: QuestionHeader): string {
    const headerWight: number = parseInt(question.subtype.slice(1), 10);
    const headerClass: string =
      headerWight > 1 ? 'question__secondary-header ion-text-uppercase' : 'question__primary-header';

    return `<${question.subtype} class="${headerClass}">${question.label}</${question.subtype}>`;
  }
}
