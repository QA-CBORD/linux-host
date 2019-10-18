import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';
import { QuestionsStorageService } from '../../questions/questions-storage.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';
import { QuestionComponent } from '../../questions/question.component';

import { Application, ApplicationStatus } from '../../applications/applications.model';
import { QuestionPage } from '../../questions/questions.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit {
  @ViewChild(StepperComponent) stepper: StepperComponent;

  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  application$: Observable<Application>;

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

    this.pages$ = this._questionsService
      .getPages()
      .pipe(tap((pages: QuestionPage[]) => this._patchFormsFromState(pages)));

    this.application$ = this._applicationsService.getApplicationById(this.applicationId).pipe(
      filter(Boolean),
      tap((application: Application) => this._questionsService.parsePages(application))
    );
  }

  async save(): Promise<void> {
    const selectedIndex: number = this.stepper.selectedIndex;
    const selectedStep: StepComponent = this.stepper.steps.toArray()[selectedIndex];

    await this._questionsStorageService.updateQuestionsGroup(
      this.applicationId,
      selectedStep.stepControl.value,
      selectedIndex,
      ApplicationStatus.Pending
    );

    this._applicationsService.reloadApplications();

    this._router.navigate(['/housing/dashboard']);
  }

  async handleSubmit(form: FormGroup, index: number, isLastPage: boolean): Promise<void> {
    const status: ApplicationStatus = !isLastPage ? ApplicationStatus.Pending : ApplicationStatus.Submitted;

    this.questions.forEach((question: QuestionComponent) => question.touch());

    if (!form.valid) {
      return;
    }

    await this._questionsStorageService.updateQuestionsGroup(this.applicationId, form.value, index, status);

    if (!isLastPage) {
      this.stepper.next();
    } else {
      this._applicationsService.submitApplication(this.applicationId);
      this._router.navigate(['/housing/dashboard']);
    }
  }

  private async _patchFormsFromState(pages: QuestionPage[]): Promise<void> {
    const questions: any[] = await this._questionsStorageService.getQuestions(this.applicationId);
    const namesToTouch: Set<string> = new Set<string>();

    pages.forEach((page: QuestionPage, index: number) => {
      if (questions && questions[index]) {
        page.form.patchValue(questions[index]);

        const controls = page.form.controls;

        Object.keys(controls).forEach((controlName: string) => {
          const control: AbstractControl = controls[controlName];
          const hasValue: boolean = Array.isArray(control.value)
            ? !control.value.some((value: any) => value == null || value === '')
            : !(control.value == null || control.value === '');

          if (hasValue) {
            control.markAsDirty();
            control.markAsTouched();

            namesToTouch.add(controlName);
          }
        });
      }
    });

    this.questions.forEach((question: QuestionComponent) => {
      if (namesToTouch.has(question.name)) {
        question.check();
      }
    });
  }
}
