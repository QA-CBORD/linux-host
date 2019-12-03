import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewChildren,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';
import { QuestionsStorageService } from '../../questions/questions-storage.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';
import { QuestionComponent } from '../../questions/question.component';

import { ApplicationStatus, ApplicationDetails, PatronApplication } from '../../applications/applications.model';
import { QuestionPage } from '../../questions/questions.model';
import { Response } from '../../housing.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit, OnDestroy {
  @ViewChild(StepperComponent) stepper: StepperComponent;

  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  applicationDetails$: Observable<ApplicationDetails>;

  pages$: Observable<QuestionPage[]>;

  applicationId: number;

  private _subscription: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService,
    private _router: Router,
    private _questionsStorageService: QuestionsStorageService,
    private _toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.applicationId = parseInt(this._route.snapshot.paramMap.get('applicationId'), 10);

    this.pages$ = this._questionsService
      .getPages()
      .pipe(
        tap((pages: QuestionPage[]) =>
          this._questionsService._patchFormsFromState(pages, this.applicationId, this._checkQuestions.bind(this))
        )
      );

    this.applicationDetails$ = this._applicationsService.getApplicationDetails(this.applicationId);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  save(application: ApplicationDetails): void {
    const selectedIndex: number = this.stepper.selectedIndex;
    const selectedStep: StepComponent = this.stepper.steps.toArray()[selectedIndex];

    const saveSubscription: Subscription = this._applicationsService
      .saveApplication(application, selectedStep.stepControl.value)
      .subscribe({
        next: () => this._router.navigate(['/housing/dashboard']),
        error: (error: HttpErrorResponse) => this._handleErrors(error.error),
      });

    this._subscription.add(saveSubscription);
  }

  submit(application: ApplicationDetails, form: FormGroup, isLastPage: boolean): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());

    if (!form.valid) {
      return;
    }

    if (!isLastPage) {
      this._next(application.patronApplication, form.value);
    } else {
      const submitSubscription: Subscription = this._applicationsService
        .submitApplication(application, form.value)
        .subscribe({
          next: () => this._router.navigate(['/housing/dashboard']),
          error: (error: HttpErrorResponse) => this._handleErrors(error.error),
        });

      this._subscription.add(submitSubscription);
    }
  }

  private _next(application: PatronApplication, form: any): void {
    this._applicationsService
      .updateCreatedDateTime(this.applicationId, application)
      .then(() =>
        this._questionsStorageService.updateQuestionsGroup(this.applicationId, form, ApplicationStatus.Pending)
      )
      .then(() => this.stepper.next());
  }

  private _checkQuestions(namesToTouch: Set<string>): void {
    this.questions
      .filter((question: QuestionComponent) => namesToTouch.has(question.name))
      .forEach((question: QuestionComponent) => {
        question.check();
      });
  }

  private _handleErrors(error: Response): void {
    this._toastController
      .create({
        message: error.status.message,
        position: 'top',
        duration: 3000,
      })
      .then((toast: HTMLIonToastElement) => toast.present());
  }
}
