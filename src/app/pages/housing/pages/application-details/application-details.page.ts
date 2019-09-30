import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';

import { Application } from '../../applications/applications.model';
import { QuestionBase } from '../../questions/types/question-base';
import { QuestionPage } from '../../questions/questions.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit {
  application: Application;

  pages$: Observable<QuestionPage[]>;

  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService,
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const applicationId: number = parseInt(this._route.snapshot.paramMap.get('applicationId'), 10);

    this.pages$ = this._questionsService.getPages();

    this._applicationsService
      .getApplicationById(applicationId)
      .pipe(
        tap((application: Application) => {
          const questions: QuestionBase[] = this._questionsService.parseQuestions(application.applicationFormJson);
          const pages: QuestionPage[] = this._questionsService.splitByPages(questions);

          this._questionsService.setPages(pages);
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
}
