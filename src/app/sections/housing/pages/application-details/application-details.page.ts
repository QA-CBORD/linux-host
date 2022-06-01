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
import { QuestionComponent } from '../../questions/question.component';
import { ApplicationDetails, ApplicationStatus } from '../../applications/applications.model';
import { QuestionsPage } from '../../questions/questions.model';
import { ApplicationsStateService } from '../../applications/applications-state.service';
import { RequestingRoommateModalComponent } from '@shared/ui-components/requesting-roommate-modal/requesting-roommate-modal.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { ApplicationPaymentComponent } from '../application-payment/application-payment.component';
import { UserAccount } from '@core/model/account/account.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { Location } from '@angular/common';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { reduceToObject } from '@shared/model/content-strings/content-string-utils';
import { defaultCreditCardMgmtCs } from '@shared/model/content-strings/default-strings';

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
  @ViewChild('content') private page: IonContent;
  @ViewChild(StepperComponent) private stepper: StepperComponent;
  @ViewChildren(QuestionComponent) private questions: QueryList<QuestionComponent>;
  private subscription: Subscription = new Subscription();
  private applicationKey: number;
  private isSubmitted: boolean;
  applicationDetails$: Observable<ApplicationDetails>;
  pages$: Observable<QuestionsPage[]>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private applicationsService: ApplicationsService,
    private applicationsStateService: ApplicationsStateService,
    private loadingService: LoadingService,
    private housingService: HousingService,
    private modalController: ModalController,
    private termService: TermsService,
    private creditCardService: CreditCardService
  ) {}

  async ngOnInit() {
    this.setApplicationKey();
    this.initApplicationDetails$();
    this.initPages$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(applicationDetails: ApplicationDetails) {
    this.updateQuestions();
    this.updateSubscription(this.stepper.selected.stepControl.value, applicationDetails);
  }

  updateSubscription(formValue: any, applicationDetails: ApplicationDetails, type: UpdateType = UpdateType.SAVE) {
    this._updateSubscription(type, this.applicationKey, applicationDetails, formValue);
  }

  async submitForm(applicationDetails: ApplicationDetails, form: FormGroup, isLastPage: boolean): Promise<void> {

    this.updateQuestions();
    if (!this.isSubmitted && form.invalid) return;
    if (!isLastPage) return this.nextPage(applicationDetails, form.value); 
    if (this.isPaymentDue(applicationDetails) && !this.isSubmitted) return await this.continueToPayment(applicationDetails);  
    this.updateSubscription(form.value, applicationDetails, UpdateType.SUBMIT);
  }

  async showModal() {
    this.applicationsStateService.requestingRoommate.forEach((restingroommate, index) => {
      return this.applicationsStateService.applicationsState.applicationDetails.roommatePreferences.some(
        requested => requested.patronKeyRoommate === restingroommate.patronKeyRoommate
      )
        ? this.applicationsStateService.deleteRequestingRoommate(index)
        : null;
    });
    const requestingRoommate = this.applicationsStateService.requestingRoommate.filter(result => {
      if (
        this.applicationsStateService.roommatePreferencesSelecteds.find(
          value => result.preferenceKey === value.preferenceKey && value.patronKeyRoommate === 0
        )
      ) {
        return result;
      }
    });
    this.applicationsStateService.setRequestingRoommate(requestingRoommate);

    const RequestingRoommateModal = await this.modalController.create({
      component: RequestingRoommateModalComponent,
      componentProps: { requestingRoommate },
    });
    await RequestingRoommateModal.present();
  }

  filterAccountsByPaymentSystem(accounts: UserAccount[], paymentSistems: number[]): UserAccount[] {
    return accounts.filter(({ paymentSystemType: type }) => paymentSistems.includes(type));
  }

  onBack() {
    this.location.back();
  }

  private updateQuestions(): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  private _updateSubscription(
    type: string,
    applicationKey: number,
    applicationDetails: ApplicationDetails,
    formValue: any
  ): void {
    this.loadingService.showSpinner();

    const subscription: Subscription = this.applicationsService[`${type}Application`](
      applicationKey,
      applicationDetails,
      formValue,
      this.isSubmitted
    ).subscribe({
      next: () => this._handleSuccess(),
      error: (error: any) => this._handleErrors(error),
    });

    this.subscription.add(subscription);
  }

  private initApplicationDetails$(): void {
    this.loadingService.showSpinner();

    this.applicationDetails$ = this.housingService.getApplicationDetails(this.applicationKey).pipe(
      tap((applicationDetails: ApplicationDetails) => {
        this.isSubmitted = applicationDetails.patronApplication?.status === ApplicationStatus.Submitted;
        if (!this.isSubmitted && this.applicationsStateService.requestingRoommate != null) {
          this.loadingService.closeSpinner();
          this.showModal();
        } else {
          this.subscription.add(
            this.termService.termId$.subscribe(termId =>
              this.housingService.getRequestedRommate(termId).subscribe(() => this.loadingService.closeSpinner())
            )
          );
        }
      }),
      catchError(error => {
        this.loadingService.closeSpinner();
        return throwError(error);
      })
    );
  }

  private initPages$(): void {
    this.pages$ = this.applicationsService.getQuestions(this.applicationKey);
  }

  private nextPage(applicationDetails: ApplicationDetails, formValue: any): void {
    this.page.scrollToTop();

    if (this.isSubmitted) {
      return this.stepper.next();
    }

    const nextSubscription: Subscription = this.applicationsService
      .next(this.applicationKey, applicationDetails, formValue)
      .subscribe({
        next: () => this.stepper.next(),
      });

    this.subscription.add(nextSubscription);
  }

  private _handleSuccess(): void {
    this.housingService.handleSuccess();
  }

  private _handleErrors(error: any): void {
    this.housingService.handleErrors(error);
  }

  private setApplicationKey() {
    this.applicationKey = this.route.snapshot.params.applicationKey;
  }

  private async continueToPayment(appDetails: ApplicationDetails) {
    const userAccounts = await this.creditCardService.retrieveAccounts();
    const modal = await this.modalController.create({
      component: ApplicationPaymentComponent,
      animated: false,
      backdropDismiss: false,
      componentProps: { contentStrings: reduceToObject([], defaultCreditCardMgmtCs), userAccounts, appDetails },
    });
    await modal.present();
  }

  private isPaymentDue(applicationDetails: ApplicationDetails) {
    return applicationDetails.applicationDefinition.accountCodeKey;
  }
}
