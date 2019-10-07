import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';
import { QuestionsStorageService } from '../../questions/questions-storage.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';

import { PatronApplication } from '../../applications/applications.model';
import { QuestionPage } from '../../questions/questions.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit {
  @ViewChild(StepperComponent) stepper: StepperComponent;

  application$: Observable<PatronApplication>;

  pages$: Observable<QuestionPage[]>;

  applicationId: number;

  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService,
    private _router: Router,
    private _questionsStorageService: QuestionsStorageService
  ) {}

  ngOnInit() {
    this.applicationId = parseInt(this._route.snapshot.paramMap.get('applicationId'), 10);

    this.pages$ = this._questionsService.getPages().pipe(
      tap((pages: QuestionPage[]) =>
        pages.forEach(async (page: QuestionPage, index: number) => {
          const applicationForms: any[] = await this._questionsStorageService.getApplicationForms(this.applicationId);

          if (applicationForms && applicationForms[index]) {
            page.form.patchValue(applicationForms[index]);
          }
        })
      )
    );

    this.application$ = this._applicationsService.getPatronApplicationById(this.applicationId).pipe(
      filter(Boolean),
      tap((application: PatronApplication) => this._questionsService.parsePages(application))
    );
  }

  save(): void {
    const selectedIndex: number = this.stepper.selectedIndex;
    const selectedStep: StepComponent = this.stepper.steps.toArray()[selectedIndex];

    this._questionsStorageService.updateApplicationForm(
      selectedStep.stepControl.value,
      this.applicationId,
      selectedIndex
    );
  }

  handleSubmit(formValue: any, index: number, isLastPage: boolean): void {
    this._questionsStorageService.updateApplicationForm(formValue, this.applicationId, index);

    if (!isLastPage) {
      this.stepper.next();
    } else {
      this._applicationsService.submitPatronApplication(this.applicationId);
      this._router.navigate(['/housing/dashboard']);
    }
  }
}
