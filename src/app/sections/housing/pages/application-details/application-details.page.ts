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
import { Observable, Subscription, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';
import { QuestionsStorageService } from '../../questions/questions-storage.service';
import { ApplicationsStateService } from '../../applications/applications-state.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';
import { QuestionComponent } from '../../questions/question.component';

import { ApplicationStatus, ApplicationDetails, PatronApplication } from '../../applications/applications.model';
import { ApplicationPage } from '../../questions/questions.model';
import { Response, ResponseStatus } from '../../housing.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  private readonly _refresh$: Subject<void> = new Subject<void>();

  @ViewChild(StepperComponent) stepper: StepperComponent;

  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  applicationDetails$: Observable<ApplicationDetails>;

  pages$: Observable<ApplicationPage[]>;

  applicationKey: number;

  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService,
    private _router: Router,
    private _questionsStorageService: QuestionsStorageService,
    private _toastController: ToastController,
    private _applicationsStateService: ApplicationsStateService
  ) {}

  ngOnInit(): void {
    this.applicationKey = parseInt(this._route.snapshot.paramMap.get('applicationKey'), 10);

    this._initApplicationDetailsSubscription();
    this._initPagesSubscription();
    this._initRefreshSubscription();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  save(application: ApplicationDetails): void {
    const selectedStep: StepComponent = this.stepper.selected;
    const formValue: any = selectedStep.stepControl.value;

    const saveSubscription: Subscription = this._applicationsService
      .saveApplication(this.applicationKey, application, formValue)
      .subscribe({
        next: () => this._handleSuccess(),
        error: (error: any) => this._handleErrors(error),
      });

    this._subscription.add(saveSubscription);
  }

  submit(application: ApplicationDetails, form: FormGroup, isLastPage: boolean): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());

    if (!form.valid) {
      return;
    }

    if (!isLastPage) {
      this._next(application, form.value);
    } else {
      const submitSubscription: Subscription = this._applicationsService
        .submitApplication(this.applicationKey, application, form.value)
        .subscribe({
          next: () => this._handleSuccess(),
          error: (error: any) => this._handleErrors(error),
        });

      this._subscription.add(submitSubscription);
    }
  }

  private _initApplicationDetailsSubscription(): void {
    this.applicationDetails$ = this._applicationsService.getApplicationDetails(this.applicationKey);
  }

  private _initPagesSubscription(): void {
    this.pages$ = this._questionsService.pages$.pipe(
      tap((pages: ApplicationPage[]) =>
        this._questionsService._patchFormsFromState(this.applicationKey, pages, this._checkQuestions.bind(this))
      )
    );
  }

  private _initRefreshSubscription(): void {
    const refreshSubscription: Subscription = this._refresh$
      .pipe(switchMap(() => this._applicationsService.getApplications()))
      .subscribe();

    this._subscription.add(refreshSubscription);
  }

  private _next(application: ApplicationDetails, formValue: any): void {
    this._questionsStorageService
      .updateCreatedDateTime(this.applicationKey, application.patronApplication)
      .then((createdDateTime: string) => {
        const patronApplication: PatronApplication = new PatronApplication({
          ...application.patronApplication,
          createdDateTime,
          status: ApplicationStatus.Pending,
        });
        const applicationDetails: ApplicationDetails = new ApplicationDetails({ ...application, patronApplication });

        this._applicationsStateService.setApplication(this.applicationKey, applicationDetails);

        return this._questionsStorageService.updateQuestions(this.applicationKey, formValue, ApplicationStatus.Pending);
      })
      .then(() => this.stepper.next());
  }

  private _checkQuestions(namesToTouch: Set<string>): void {
    this.questions
      .filter((question: QuestionComponent) => namesToTouch.has(question.name))
      .forEach((question: QuestionComponent) => {
        question.check();
      });
  }

  private _handleSuccess(): void {
    this._refresh$.next();
    this._router.navigate(['/housing/dashboard']);
  }

  private _handleErrors(error: any): void {
    let message = 'Something went wrong. Try again later';

    if (error instanceof HttpErrorResponse) {
      const statusMessage: string = (error.error as Response).status.message;

      message = statusMessage || message;
    }

    this._toastController
      .create({
        message,
        position: 'top',
        duration: 3000,
        showCloseButton: true,
      })
      .then((toast: HTMLIonToastElement) => toast.present());
  }
}
