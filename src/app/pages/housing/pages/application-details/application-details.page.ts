import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';

import { Application } from '../../applications/applications.model';
import { QuestionBase } from '../../questions/types/question-base';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit {
  application: Application;

  questions$: Observable<QuestionBase[]>;

  applicationForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService,
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const applicationId: number = parseInt(this._route.snapshot.paramMap.get('applicationId'), 10);

    this.questions$ = this._questionsService.getQuestions();

    this._applicationsService
      .getApplicationById(applicationId)
      .pipe(
        tap((application: Application) => {
          const questions: QuestionBase[] = this._questionsService.parseQuestions(application.applicationFormJson);

          this.applicationForm = this._questionsService.toFormGroup(questions);

          this._questionsService.setQuestions(questions);
        })
      )
      .subscribe(this._handleSuccess.bind(this));
  }

  handleSubmit(): void {
    // Code to submit form.
  }

  private _handleSuccess(application: Application): void {
    this.application = application;
    this._changeDetector.markForCheck();
  }

  // SubmitClick() {
  //   let finalJsonStr = JSON.stringify(this.appForm.value);
  //   let reorderStr = '';
  //   this.questions
  //     .filter(item => item.controlType === 'reorder')
  //     .forEach((item, index) => {
  //       reorderStr = '"' + item.key + '"' + ':' + JSON.stringify(item.reorder.options);
  //       finalJsonStr = finalJsonStr.replace('"' + item.key + '"' + ':' + '""', reorderStr);
  //     });
  //   console.log(finalJsonStr);
  //   console.log(JSON.parse(finalJsonStr));
  // }

  // doReorder(ev: any) {
  //   const reorderQuestion = this.questions.filter(item => item.controlType === 'reorder')[0];
  //   const temp = reorderQuestion.reorder.options.splice(ev.detail.from, 1)[0];
  //   reorderQuestion.reorder.options.splice(ev.detail.to, 0, temp);
  //   for (let i = 0; i < reorderQuestion.reorder.options.length; i++) {
  //     if (i < 2) {
  //       reorderQuestion.reorder.options[i].preference = (i + 1).toString();
  //     } else {
  //       reorderQuestion.reorder.options[i].preference = '';
  //     }
  //   }
  //   ev.detail.complete();
  // }
}
