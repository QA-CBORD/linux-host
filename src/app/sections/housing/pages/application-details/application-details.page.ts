import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ApplicationsService } from '../../applications/applications.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '../../housing.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';
import { QuestionComponent } from '../../questions/question.component';

import { ApplicationDetails, ApplicationStatus, PatronApplication } from '../../applications/applications.model';
import { QuestionsPage } from '../../questions/questions.model';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @ViewChild(StepperComponent) stepper: StepperComponent;

  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  applicationDetails$: Observable<ApplicationDetails>;

  pages$: Observable<QuestionsPage[]>;

  applicationKey: number;

  isSubmitted: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _applicationsService: ApplicationsService,
    private _router: Router,
    private _toastController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService
  ) {}

  ngOnInit(): void {
    this.applicationKey = parseInt(this._route.snapshot.paramMap.get('applicationKey'), 10);

    this._initApplicationDetailsObservable();
    this._initPagesObservable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  save(applicationDetails: ApplicationDetails): boolean {
    this._touch();

    const selectedStep: StepComponent = this.stepper.selected;
    const formValue: any = selectedStep.stepControl.value;

    this._update('save', this.applicationKey, applicationDetails, formValue);

    return false;
  }

  submit(applicationDetails: ApplicationDetails, form: FormGroup, isLastPage: boolean): void {
    this._touch();

    if (!this.isSubmitted && !form.valid) {
      return;
    }

    if (!isLastPage) {
      this._next(applicationDetails, form.value);
    } else {
      this._update('submit', this.applicationKey, applicationDetails, form.value);
    }
  }

  private _touch(): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  private _update(type: string, applicationKey: number, applicationDetails: ApplicationDetails, formValue: any): void {
    this._loadingService.showSpinner();

    const subscription: Subscription = this._applicationsService[`${type}Application`](
      applicationKey,
      applicationDetails,
      formValue,
      this.isSubmitted
    ).subscribe({
      next: () => this._handleSuccess(),
      error: (error: any) => this._handleErrors(error),
    });

    this._subscription.add(subscription);
  }

  private _initApplicationDetailsObservable(): void {
    this._loadingService.showSpinner();

    this.applicationDetails$ = this._housingService.getApplicationDetails(this.applicationKey).pipe(
      tap((applicationDetails: ApplicationDetails) => {
        const patronApplication: PatronApplication = applicationDetails.patronApplication;
        const status: ApplicationStatus = patronApplication && patronApplication.status;

        this.isSubmitted = status === ApplicationStatus.Submitted;
        this._loadingService.closeSpinner();
      }),
      catchError((error: any) => {
        this._loadingService.closeSpinner();

        return throwError(error);
      })
    );
  }

  private _initPagesObservable(): void {
    this.pages$ = this._applicationsService.getQuestions(this.applicationKey);
  }

  private _next(applicationDetails: ApplicationDetails, formValue: any): void {
    if (this.isSubmitted) {
      return this.stepper.next();
    }

    const nextSubscription: Subscription = this._applicationsService
      .next(this.applicationKey, applicationDetails, formValue)
      .subscribe({
        next: () => this.stepper.next(),
      });

    this._subscription.add(nextSubscription);
  }

  private _handleSuccess(): void {
    this._housingService.handleSuccess();
  }

  private _handleErrors(error: any): void {
    this._housingService.handleErrors(error);
  }
}
