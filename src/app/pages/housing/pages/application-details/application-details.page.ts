import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { QuestionsService } from '../../services/questions/question-service.service';
import { ApplicationsService } from '../../applications/applications.service';

import { QuestionDetails } from '../../Models/questionDetail';
import { Application } from '../../applications/applications.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
})
export class ApplicationDetailsPage implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService
  ) {}

  application: Application;
  questions: QuestionDetails[];
  public appForm: FormGroup;

  ngOnInit() {
    this.appForm = this.GetFormGroup();

    const applicationId: number = parseInt(this._route.snapshot.paramMap.get('applicationId'), 10);

    this._applicationsService
      .getApplicationById(applicationId)
      .subscribe((application: Application) => (this.application = application));

    this.questions = this._questionsService.getQuestions(applicationId);
  }

  GetFormGroup() {
    const group: any = {};

    this.questions.forEach(question => {
      group[question.key] = question.required
        ? new FormControl('' || '', Validators.required)
        : new FormControl('' || '');
    });

    return new FormGroup(group);
  }

  SubmitClick() {
    let finalJsonStr = JSON.stringify(this.appForm.value);
    let reorderStr = '';
    this.questions
      .filter(item => item.controlType === 'reorder')
      .forEach((item, index) => {
        reorderStr = '"' + item.key + '"' + ':' + JSON.stringify(item.reorder.options);
        finalJsonStr = finalJsonStr.replace('"' + item.key + '"' + ':' + '""', reorderStr);
      });
    console.log(finalJsonStr);
    console.log(JSON.parse(finalJsonStr));
  }

  doReorder(ev: any) {
    const reorderQuestion = this.questions.filter(item => item.controlType === 'reorder')[0];
    const temp = reorderQuestion.reorder.options.splice(ev.detail.from, 1)[0];
    reorderQuestion.reorder.options.splice(ev.detail.to, 0, temp);
    for (let i = 0; i < reorderQuestion.reorder.options.length; i++) {
      if (i < 2) {
        reorderQuestion.reorder.options[i].preference = (i + 1).toString();
      } else {
        reorderQuestion.reorder.options[i].preference = '';
      }
    }
    ev.detail.complete();
  }
}
