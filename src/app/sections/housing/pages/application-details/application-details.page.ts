import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApplicationsService } from '../../applications/applications.service';
import { HousingService } from '../../housing.service';
import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';
import { QuestionComponent } from '../../questions/question.component';
import { ApplicationDetails, ApplicationStatus } from '../../applications/applications.model';
import { QuestionsPage } from '../../questions/questions.model';
import { ApplicationsStateService } from '../../applications/applications-state.service';
import { RequestingRoommateModalComponent } from '@shared/ui-components/requesting-roommate-modal/requesting-roommate-modal.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { ApplicationPaymentComponent } from '../application-payment/application-payment.component';
import { CREDITCARD_ICONS, CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { UserAccount } from '@core/model/account/account.model';
import { reduceToObject } from '@shared/model/content-strings/content-string-utils';
import { defaultCreditCardMgmtCs } from '@shared/model/content-strings/default-strings';
import { LoadingService } from '@core/service/loading/loading.service';
import { Location } from '@angular/common';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';

enum UpdateType {
  SUBMIT = 'submit',
  SAVE = 'save',
}

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit, OnDestroy {
  @ViewChild('content') private content: IonContent;
  @ViewChild(StepperComponent) private stepper: StepperComponent;
  @ViewChildren(QuestionComponent) private questions: QueryList<QuestionComponent>;
  private _subscription: Subscription = new Subscription();
  private applicationKey: number;
  private isSubmitted: boolean;
  applicationDetails$: Observable<ApplicationDetails>;
  pages$: Observable<QuestionsPage[]>;

  constructor(
    private _route: ActivatedRoute,
    private _location: Location,
    private _applicationsService: ApplicationsService,
    private _applicationsStateService: ApplicationsStateService,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private modalController: ModalController,
    private _termService: TermsService,
    private readonly creditCardService: CreditCardService
  ) {}

  async ngOnInit() {
    this._setApplicationKey();
    this._initApplicationDetails$();
    this._initPages$();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  save(applicationDetails: ApplicationDetails) {
    this._updateQuestions();
    const selectedStep: StepComponent = this.stepper.selected;
    const formValue = selectedStep.stepControl.value;
    this._updateSubscription(UpdateType.SAVE, this.applicationKey, applicationDetails, formValue);
  }

  async submit(applicationDetails: ApplicationDetails, form: FormGroup, isLastPage: boolean): Promise<void> {

    this._updateQuestions();

    if (!this.isSubmitted && form.invalid) return;

    if (!isLastPage) return this._next(applicationDetails, form.value);
    
    if (this.isPaymentDue(applicationDetails)) return await this.continueToPayment(applicationDetails);
     
    this._updateSubscription(UpdateType.SUBMIT, this.applicationKey, applicationDetails, form.value);
  
  }

  async showModal() {
    this._applicationsStateService.requestingRoommate.forEach((restingroommate, index) => {
      return this._applicationsStateService.applicationsState.applicationDetails.roommatePreferences.some(
        requested => requested.patronKeyRoommate === restingroommate.patronKeyRoommate
      )
        ? this._applicationsStateService.deleteRequestingRoommate(index)
        : undefined;
    });
    const requestingRoommate = this._applicationsStateService.requestingRoommate.filter(result => {
      if (
        this._applicationsStateService.roommatePreferencesSelecteds.find(
          value => result.preferenceKey === value.preferenceKey && value.patronKeyRoommate === 0
        )
      ) {
        return result;
      }
    });
    this._applicationsStateService.setRequestingRoommate(requestingRoommate);

    const RequestingRoommateModal = await this.modalController.create({
      component: RequestingRoommateModalComponent,
      componentProps: { requestingRoommate },
    });
    await RequestingRoommateModal.present();
  }

  filterAccountsByPaymentSystem(accounts: UserAccount[], paymentSistems: number[]): UserAccount[] {
    return accounts.filter(({ paymentSystemType: type }) => paymentSistems.includes(type));
  }
  private _updateQuestions(): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  private _updateSubscription(
    type: string,
    applicationKey: number,
    applicationDetails: ApplicationDetails,
    formValue: any
  ): void {
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

  private _initApplicationDetails$(): void {
    this._loadingService.showSpinner();

    this.applicationDetails$ = this._housingService.getApplicationDetails(this.applicationKey).pipe(
      tap((applicationDetails: ApplicationDetails) => {
        this.isSubmitted = applicationDetails.patronApplication?.status === ApplicationStatus.Submitted;
        if (!this.isSubmitted && this._applicationsStateService.requestingRoommate != null) {
          this._loadingService.closeSpinner();
          this.showModal();
        } else {
          this._subscription.add(
            this._termService.termId$.subscribe(termId =>
              this._housingService.getRequestedRommate(termId).subscribe(() => this._loadingService.closeSpinner())
            )
          );
        }
      }),
      catchError(error => {
        this._loadingService.closeSpinner();

        return throwError(error);
      })
    );
  }

  private _initPages$(): void {
    this.pages$ = this._applicationsService.getQuestions(this.applicationKey);
  }

  private _next(applicationDetails: ApplicationDetails, formValue: any): void {
    this.content.scrollToTop();

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

  private _setApplicationKey() {
    this.applicationKey = this._route.snapshot.params.applicationKey;
  }

  private onBack() {
    this._location.back();
  }

  private async continueToPayment(appDetails: ApplicationDetails) {

    const accounts = await this.creditCardService.retrieveAccounts();
    const modal = await this.modalController.create({
      component: ApplicationPaymentComponent,
      animated: false,
      backdropDismiss: true,
      componentProps: { userAccounts: accounts, amount: appDetails.applicationDefinition.amount.toString() },
    });
    await modal.present();
  }

  private isPaymentDue(applicationDetails: ApplicationDetails) {
    return applicationDetails.applicationDefinition.accountCodeKey;
  }
}
