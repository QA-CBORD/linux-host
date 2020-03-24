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
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { QuestionsService } from '../../questions/questions.service';
import { ContractsService } from '../../contracts/contracts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '../../housing.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { QuestionComponent } from '../../questions/question.component';

import { Response } from '../../housing.model';
import { QuestionsPage } from '../../questions/questions.model';
import { SignContractEvent } from '@sections/housing/sign-contract/sign-contract.model';
import { ContractDetails } from '../../contracts/contracts.model';

@Component({
  selector: 'st-contract-details',
  templateUrl: './contract-details.page.html',
  styleUrls: ['./contract-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractDetailsPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @ViewChild(StepperComponent) stepper: StepperComponent;

  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  contractDetails$: Observable<ContractDetails>;

  pages$: Observable<QuestionsPage[]>;

  contractKey: number;

  contractElementKey: number;

  isSubmitted: boolean;

  isSigned: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _questionsService: QuestionsService,
    private _contractsService: ContractsService,
    private _router: Router,
    private _toastController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService
  ) {}

  ngOnInit(): void {
    this.contractKey = parseInt(this._route.snapshot.paramMap.get('contractKey'), 10);
    this.contractElementKey = parseInt(this._route.snapshot.paramMap.get('contractElementKey'), 10);

    this._initContractDetailsObservable();
    this._initPagesObservable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  submit(isLastPage: boolean): void {
    if (this.isSubmitted) {
      return;
    }

    if (!isLastPage) {
      this._next();
    } else {
      this._update(this.contractElementKey);
    }
  }

  signContract(signContractEvent: SignContractEvent): void {
    this.isSigned = signContractEvent.isSigned;
  }

  private _update(contractKey: number): void {
    this._loadingService.showSpinner();

    const subscription: Subscription = this._contractsService.submitContract(contractKey).subscribe({
      next: () => this._handleSuccess(),
      error: (error: any) => this._handleErrors(error),
    });

    this._subscription.add(subscription);
  }

  private _initContractDetailsObservable(): void {
    this._loadingService.showSpinner();

    const queryParams: string[] = [`contractKey=${this.contractElementKey}`];

    this.contractDetails$ = this._housingService.getContractDetails(this.contractKey, queryParams).pipe(
      tap((contractDetails: ContractDetails) => {
        this.isSubmitted = !!contractDetails.contractInfo.dateTimeSigned;
        this._loadingService.closeSpinner();
      }),
      catchError((error: any) => {
        this._loadingService.closeSpinner();

        return throwError(error);
      })
    );
  }

  private _initPagesObservable(): void {
    this.pages$ = this._contractsService.getQuestions(this.contractKey);
  }

  private _next(): void {
    this.stepper.next();
  }

  private _handleSuccess(): void {
    this._loadingService.closeSpinner();
    this._router.navigate(['/housing/dashboard']).then(() => this._housingService.refreshDefinitions());
  }

  private _handleErrors(error: any): void {
    this._housingService.handleErrors(error);
  }
}
