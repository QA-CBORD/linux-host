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
import { IonContent, ToastController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from '@core/service/toast/toast.service';

import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '../../housing.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';
import { QuestionComponent } from '../../questions/question.component';

import { QuestionsPage } from '../../questions/questions.model';
import { WaitingListDetails } from '@sections/housing/waiting-lists/waiting-lists.model';
import { WaitingListsService } from '../../waiting-lists/waiting-lists.service';
import { WaitingListStateService } from '../../waiting-lists/waiting-list-state.service';

@Component({
  selector: 'st-waiting-lists-details',
  templateUrl: './waiting-lists-details.page.html',
  styleUrls: ['./waiting-lists-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingListsDetailsPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @ViewChild('content') private content: IonContent;
  
  @ViewChild(StepperComponent) stepper: StepperComponent;

  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  waitingListDetails$: Observable<WaitingListDetails>;

  pages$: Observable<QuestionsPage[]>;

  waitingKey: number;

  isSubmitted: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _waitingListService: WaitingListsService,
    private _router: Router,
    private _toastController: ToastController,
    private _toastService: ToastService,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _waitingListState: WaitingListStateService
  ) {
  }

  ngOnInit(): void {
    this.waitingKey = parseInt(this._route.snapshot.paramMap.get('waitingListsKey'), 10);
    this._initWaitingListDetailsObservable();
    this._initPagesObservable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  save(applicationDetails: WaitingListDetails): boolean {
    this._touch();

    const selectedStep: StepComponent = this.stepper.selected;
    const formValue = selectedStep.stepControl.value;

    this._update(this.waitingKey, applicationDetails, formValue);

    return false;
  }

  submit(waitingListDetails: WaitingListDetails, form: FormGroup, isLastPage: boolean): void {
    this._touch();

    if (!this.isSubmitted && form.invalid) {
      return;
    }

    if (!isLastPage) {
      this._next(form.value);
    } else {
      this._update(this.waitingKey, waitingListDetails, form.value);
    }
  }
  
  goToDashboard(): void {
    this._housingService.goToDashboard();
  }
  
  private _touch(): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  private _update(applicationKey: number, applicationDetails: WaitingListDetails, formValue): void {
    if(applicationDetails.facilities)
      {
        const facilityKey: number = 
          parseInt(formValue[Object.keys(formValue).find(value => value.includes('facility-selection'))]) || null;
        
        if(!facilityKey){
          this._toastService.showToast({
          message: "Select a building to add yourself to the building's waiting list"});
          return null;
        }
      }
      
    if(Object.keys(formValue).find(value => value.includes('attribute-selection')))
    {
      const attributeValue: string = 
          formValue[Object.keys(formValue).find(value => value.includes('attribute-selection'))] || null;
        
        if(!attributeValue){
          this._toastService.showToast({
          message: 'Select a value to add yourself to the waiting list'});
          return null;
        }
    }
    this._loadingService.showSpinner();
    const subscription: Subscription = this._waitingListService.submitWaitingList(
      applicationKey,
      formValue
    ).subscribe({
      next: () => this._handleSuccess(),
      error: (error: Error) => this._handleErrors(error),
    });

    this._subscription.add(subscription);
  }

  private _initWaitingListDetailsObservable(): void {
    this._loadingService.showSpinner();

    this.waitingListDetails$ = this._housingService.getWaitList(this.waitingKey).pipe(
      tap(() => {
        this.isSubmitted = true;
        this._loadingService.closeSpinner();
      }),
      catchError((error: Error) => {
        this._loadingService.closeSpinner();

        return throwError(error);
      })
    );

  }

  private _initPagesObservable(): void {
    this.pages$ = this._waitingListService.getQuestions(this.waitingKey);
  }

  private _next(formValue): void {
    this.content.scrollToTop();

    if (this.isSubmitted) {
      return this.stepper.next();
    }
    const nextSubscription: Subscription = this._waitingListService
      .next(formValue)
      .subscribe({
        next: () => this.stepper.next(),
      });

    this._subscription.add(nextSubscription);
  }

  private _handleSuccess(): void {
    this._housingService.goToDashboard();
  }

  private _handleErrors(error: Error): void {
    this._housingService.handleErrors(error);
  }
}
