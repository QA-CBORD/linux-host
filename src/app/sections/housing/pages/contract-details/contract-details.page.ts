import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { ContractsService } from '../../contracts/contracts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '../../housing.service';
import { StepperComponent } from '../../stepper/stepper.component';
import { QuestionComponent } from '../../questions/question.component';
import { QuestionsPage } from '../../questions/questions.model';
import { ContractDetails } from '../../contracts/contracts.model';
import { IonContent } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { FormPaymentService, FormType } from '../form-payment/form-payment.service';

@Component({
  selector: 'st-contract-details',
  templateUrl: './contract-details.page.html',
  styleUrls: ['./contract-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractDetailsPage implements OnInit, OnDestroy {
  @ViewChild('content') private content: IonContent;
  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;
  contractDetails$: Observable<ContractDetails>;
  pages$: Observable<QuestionsPage[]>;
  contractKey: number;
  contractElementKey: number;
  isSubmitted = false;
  isSigned = true;
  canSubmit = true;

  constructor(
    private _route: ActivatedRoute,
    private _contractsService: ContractsService,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _changeDetector: ChangeDetectorRef,
    private formPaymentService: FormPaymentService
  ) {}

  ngOnInit(): void {
    this.contractKey = parseInt(this._route.snapshot.params.contractKey);
    this.contractElementKey = parseInt(this._route.snapshot.params.contractElementKey);
    this._initContractDetailsObservable();
    this._initPagesObservable();
    this._initIsSignedObservable();
  }

  ngOnDestroy(): void {
    this._contractsService.sign(false);
  }

  submitForm(contractDetails: ContractDetails, form: FormGroup, isLastPage: boolean): void {
    if (!this.isSubmitted) {
      if (!isLastPage) {
        this._next();
      } else if (this.isPaymentDue(contractDetails)) {
        this.continueToPayment(contractDetails, form.value);
      } else {
        this._update(this.contractElementKey);
      }
    }
  }

  isPaymentDue(contractDetails: ContractDetails) {
    return contractDetails.amount > 0;
  }

  private async continueToPayment(contractDetails: ContractDetails, form: FormControl) {
    this.formPaymentService.continueToFormPayment(
      contractDetails,
      form,
      `${this.contractElementKey}`,
      FormType.WorkOrder
    );
  }

  private _update(contractKey: number): void {
    this._loadingService.showSpinner();
    this._contractsService.submitContract(contractKey).pipe(take(1)).subscribe({
      next: () => this._handleSuccess(),
      error: (error: Error) => this._handleErrors(error),
    });
  }

  private _initContractDetailsObservable(): void {
    this._loadingService.showSpinner();
    const queryParams: string[] = [`contractKey=${this.contractElementKey}`];
    this.contractDetails$ = this._housingService.getContractDetails(this.contractKey, queryParams).pipe(
      tap((contractDetails: ContractDetails) => {
        this.isSubmitted = !!contractDetails.contractInfo.dateTimeSigned;
        this.canSubmit = !this.isSubmitted && this.isSigned;
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
    this.content.scrollToTop();
    this.stepper.next();
  }

  private _handleSuccess(): void {
    this._housingService.handleSuccess();
  }

  private _handleErrors(error: any): void {
    this._housingService.handleErrors(error);
  }

  private _initIsSignedObservable() {
    this._contractsService.isSigned$.pipe(take(1)).subscribe((isSigned: boolean) => {
      this.isSigned = isSigned;
      this.canSubmit = !this.isSubmitted && isSigned;
      this._changeDetector.markForCheck();
    });
  }
}
