import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';

import { StepperComponent } from '../../stepper/stepper.component';

import { PatronApplication } from '../../applications/applications.model';
import { QuestionPage } from '../../questions/questions.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit {
  application$: Observable<PatronApplication>;

  pages$: Observable<QuestionPage[]>;

  applicationId: number;

  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.applicationId = parseInt(this._route.snapshot.paramMap.get('applicationId'), 10);

    this.pages$ = this._questionsService.getPages();

    this.application$ = this._applicationsService
      .getPatronApplicationById(this.applicationId)
      .pipe(tap((application: PatronApplication) => this._questionsService.parsePages(application)));
  }

  handleSubmit(stepper: StepperComponent, formValue: any, isLastPage: boolean): void {
    if (!isLastPage) {
      stepper.next();
    } else {
      this._applicationsService.submitPatronApplication(this.applicationId);
      this._router.navigate(['/housing/dashboard']);
    }
  }
}
