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
import { Response } from '../../housing.model';

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

    this.pages$ = this._questionsService
      .getPages()
      .pipe(
        tap((pages: ApplicationPage[]) =>
          this._questionsService._patchFormsFromState(pages, this.applicationKey, this._checkQuestions.bind(this))
        )
      );

    this.applicationDetails$ = this._applicationsService.getApplicationDetails(this.applicationKey);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  save(application: ApplicationDetails): void {
    const selectedIndex: number = this.stepper.selectedIndex;
    const selectedStep: StepComponent = this.stepper.steps.toArray()[selectedIndex];

    const saveSubscription: Subscription = this._applicationsService
      .saveApplication(application, selectedStep.stepControl.value)
      .pipe(switchMap(() => this._applicationsService.getApplications()))
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
      this._next(application, form.value);
    } else {
      const submitSubscription: Subscription = this._applicationsService
        .submitApplication(application, form.value)
        .pipe(switchMap(() => this._applicationsService.getApplications()))
        .subscribe({
          next: () => this._router.navigate(['/housing/dashboard']),
          error: (error: any) => this._handleErrors(error),
        });

      this._subscription.add(submitSubscription);
    }
  }

  private _next(application: ApplicationDetails, form: any): void {
    const applicationKey: number = application.applicationDefinition.key;

    this._applicationsService
      .getCreatedDateTime(application.applicationDefinition.key, application.patronApplication)
      .then((createdDateTime: string) => {
        this._applicationsService.updateCreatedDateTime(this.applicationKey, createdDateTime);

        return createdDateTime;
      })
      .then((createdDateTime: string) => {
        const patronApplication: PatronApplication = {
          ...application.patronApplication,
          createdDateTime,
          status: ApplicationStatus.Pending,
        };
        const applicationDetails: ApplicationDetails = { ...application, patronApplication };

        this._applicationsStateService.updateApplication(applicationKey, applicationDetails);

        return this._questionsStorageService.updateQuestions(this.applicationKey, form, ApplicationStatus.Pending);
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

  private _handleErrors(error: any): void {
    const message = error && (error as Response).status ? error.status.message : 'Error';

    this._toastController
      .create({
        message,
        position: 'top',
        duration: 3000,
      })
      .then((toast: HTMLIonToastElement) => toast.present());
  }
}
