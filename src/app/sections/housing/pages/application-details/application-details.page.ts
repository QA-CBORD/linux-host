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
import { Observable, Subscription, Subject, throwError } from 'rxjs';
import { tap, switchMap, withLatestFrom, catchError } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ApplicationsService } from '../../applications/applications.service';
import { QuestionsStorageService } from '../../questions/questions-storage.service';
import { ApplicationsStateService } from '../../applications/applications-state.service';
import { TermsService } from '../../terms/terms.service';
import { LoadingService } from '../../../../core/service/loading/loading.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';
import { QuestionComponent } from '../../questions/question.component';

import { ApplicationStatus, ApplicationDetails, PatronApplication } from '../../applications/applications.model';
import { Response } from '../../housing.model';
import { QuestionsPage } from '../../questions/questions.model';

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

  pages$: Observable<QuestionsPage[]>;

  applicationKey: number;

  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _applicationsService: ApplicationsService,
    private _router: Router,
    private _questionsStorageService: QuestionsStorageService,
    private _toastController: ToastController,
    private _applicationsStateService: ApplicationsStateService,
    private _termsService: TermsService,
    private _loadingService: LoadingService
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

  save(application: ApplicationDetails): boolean {
    const selectedStep: StepComponent = this.stepper.selected;
    const formValue: any = selectedStep.stepControl.value;

    this._loadingService.showSpinner();

    const saveSubscription: Subscription = this._applicationsService
      .saveApplication(this.applicationKey, application, formValue)
      .subscribe({
        next: () => this._handleSuccess(),
        error: (error: any) => this._handleErrors(error),
      });

    this._subscription.add(saveSubscription);

    return false;
  }

  submit(application: ApplicationDetails, form: FormGroup, isLastPage: boolean): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());

    if (!form.valid) {
      return;
    }

    if (!isLastPage) {
      this._next(application, form.value);
    } else {
      this._loadingService.showSpinner();

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
    this._loadingService.showSpinner();

    this.applicationDetails$ = this._applicationsService.getApplicationDetails(this.applicationKey).pipe(
      tap(() => this._loadingService.closeSpinner()),
      catchError((error: any) => {
        this._loadingService.closeSpinner();

        return throwError(error);
      })
    );
  }

  private _initPagesSubscription(): void {
    this.pages$ = this._questionsService.getPages(this.applicationKey);
  }

  private _initRefreshSubscription(): void {
    const refreshSubscription: Subscription = this._refresh$
      .pipe(
        withLatestFrom(this._termsService.termId$),
        switchMap(([_, termId]: [void, number]) => this._applicationsService.getApplications(termId))
      )
      .subscribe();

    this._subscription.add(refreshSubscription);
  }

  private _next(application: ApplicationDetails, formValue: any): void {
    const updateCreatedDateTimeSubscription: Subscription = this._questionsStorageService
      .updateCreatedDateTime(this.applicationKey, application.patronApplication)
      .pipe(
        switchMap((createdDateTime: string) => {
          const status: ApplicationStatus =
            application.patronApplication && application.patronApplication.status
              ? application.patronApplication.status
              : ApplicationStatus.Pending;
          const patronApplication: PatronApplication = new PatronApplication({
            ...application.patronApplication,
            createdDateTime,
            status,
          });
          const applicationDetails: ApplicationDetails = new ApplicationDetails({ ...application, patronApplication });

          this._applicationsStateService.setApplication(this.applicationKey, applicationDetails);

          return this._questionsStorageService.updateQuestions(this.applicationKey, formValue, status);
        })
      )
      .subscribe({
        next: () => this.stepper.next(),
      });

    this._subscription.add(updateCreatedDateTimeSubscription);
  }

  private _handleSuccess(): void {
    this._refresh$.next();
    this._loadingService.closeSpinner();
    this._router.navigate(['/housing/dashboard']);
  }

  private _handleErrors(error: any): void {
    let message = 'Something went wrong. Try again later';

    this._loadingService.closeSpinner();

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
