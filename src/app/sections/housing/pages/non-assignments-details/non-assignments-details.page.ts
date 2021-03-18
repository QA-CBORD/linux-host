import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, 
  OnDestroy, 
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import {
  Observable,
  Subscription,
  throwError
} from 'rxjs';
import {
  catchError,
  tap
} from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { FormTypes } from '@sections/housing/housing.model';
import { HousingService } from '@sections/housing/housing.service';
import { NonAssignmentDetails } from '@sections/housing/non-assignments/non-assignments.model';
import { NonAssignmentsService } from '@sections/housing/non-assignments/non-assignments.service';
import { QuestionComponent } from '@sections/housing/questions/question.component';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { QuestionsService } from '@sections/housing/questions/questions.service';
import { StepperComponent } from '@sections/housing/stepper/stepper.component';
import { TermsService } from '@sections/housing/terms/terms.service';

@Component({
  selector: 'st-non-assignments-details',
  templateUrl: './non-assignments-details.page.html',
  styleUrls: ['./non-assignments-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonAssignmentsDetailsPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  nonAssignmentDetails$: Observable<NonAssignmentDetails>;
  pages$: Observable<QuestionsPage[]>;
  
  nonAssignmentKey: number;
  termKey: number = 0;
  selectedAssetType$: Observable<number>;

  isSubmitted: boolean = false;
  canSubmit: boolean = true;
  
  constructor(
    private _termsService: TermsService,
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _nonAssignmentsService: NonAssignmentsService,
    private _router: Router,
    private _toasController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.nonAssignmentKey = parseInt(this._route.snapshot.paramMap.get('nonAssignmentKey'), 10);
    this._initNonAssignmentDetailsObservable();
    this._initPagesObservable();
    this._initTermSubscription();
    this._initSelectedAssetSubscription();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  submit(isLastPage: boolean): void {
    if (this.isSubmitted) {
      if (!isLastPage) {
        this._next();
        return;
      } else {
        return;
      }
    }

    if (!isLastPage) {
      this._next();
    } else {
      this._update();
    }
  }

  private _initPagesObservable(): void {
    this.pages$ = this._nonAssignmentsService.getQuestions(this.nonAssignmentKey);
  }

  private _initSelectedAssetSubscription(): void {
    this.selectedAssetType$ = this._nonAssignmentsService.getSelectedAssetType();
  }

  private _initTermSubscription() {
    const termSubs = this._termsService.termId$.subscribe(termId => this.termKey = termId);
    this._subscription.add(termSubs);
  }

  private _initNonAssignmentDetailsObservable(): void {
    this._loadingService.showSpinner();
    
    const queryParams: string[] = [`formTypeKey=${FormTypes.NON_ASSIGNMENTS}`];

    this.nonAssignmentDetails$ = this._housingService.getNonAssignmentDetails(this.nonAssignmentKey, queryParams)
      .pipe(
        tap((nonAssignmentDetails: NonAssignmentDetails) => {
          this.isSubmitted = false; //!!nonAssignmentDetails.nonAssignmentInfo.dateTimeSigned;
          this._loadingService.closeSpinner();
        }),
        catchError((error: any) => {
          this._loadingService.closeSpinner();
          return throwError(error);
        })
      );
  }

  private _next(): void {
    this.stepper.next();
  }

  private _handleSuccess(): void {
    this._housingService.handleSuccess();
  }

  private _handleErrors(error: any): void {
    this._housingService.handleErrors(error);
  }

  private _update(): void {
    this._loadingService.showSpinner();

  }
}
