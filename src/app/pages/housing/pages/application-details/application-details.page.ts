import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';

import { Application } from '../../applications/applications.model';
import { QuestionPage } from '../../questions/questions.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit {
  application$: Observable<Application>;

  pages$: Observable<QuestionPage[]>;

  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService
  ) {}

  ngOnInit() {
    const applicationId: number = parseInt(this._route.snapshot.paramMap.get('applicationId'), 10);

    this.pages$ = this._questionsService.getPages();

    this.application$ = this._applicationsService
      .getApplicationById(applicationId)
      .pipe(tap((application: Application) => this._questionsService.parsePages(application)));
  }

  handleSubmit(): void {
    // Code to submit form.
  }
}
