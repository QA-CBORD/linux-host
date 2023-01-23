import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { ApplicationsService } from '../../applications/applications.service';
import { HousingService } from '../../housing.service';
import { StepperComponent } from '../../stepper/stepper.component';
import { QuestionComponent } from '../../questions/question.component';
import { ApplicationDetails, ApplicationStatus, RoommatePreferences } from '../../applications/applications.model';
import { QuestionsPage } from '../../questions/questions.model';
import { ApplicationsStateService } from '../../applications/applications-state.service';
import { RequestingRoommateModalComponent } from '@shared/ui-components/requesting-roommate-modal/requesting-roommate-modal.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { CurrentForm } from '../form-payment/form-payment.component';
import { FormPaymentService, FormType } from '../form-payment/form-payment.service';
import { RequestedRoommatesComponent } from '../roommate-search/pages/search-by/requested-roommates/requested-roommates.component';

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
export class ApplicationDetailsPage implements OnInit {
  @ViewChild('content') private page: IonContent;
  @ViewChild(StepperComponent) private stepper: StepperComponent;
  @ViewChildren(QuestionComponent) private questions: QueryList<QuestionComponent>;
  @ViewChild(RequestedRoommatesComponent, { static: false }) requestedRoommatesComponent: RequestedRoommatesComponent;
  isSubmitted: boolean;
  applicationDetails$: Observable<ApplicationDetails>;
  pages$: Observable<QuestionsPage[]>;

  constructor(
    private route: ActivatedRoute,
    private applicationsService: ApplicationsService,
    private applicationsStateService: ApplicationsStateService,
    private loadingService: LoadingService,
    private housingService: HousingService,
    private modalController: ModalController,
    private termService: TermsService,
    private formPaymentService: FormPaymentService,
  ) {}

  async ngOnInit() {
    this.applicationDetails$ = this.initApplicationDetails$();
    this.pages$ = this.getPages$();
  }

  ionViewWillEnter() {
    this.requestedRoommatesComponent?.updateRequestedRoommates();
  }

  save(applicationDetails: ApplicationDetails) {
    this.updateQuestions();
    this.updateApplicationService(this.stepper.selected.stepControl.value, applicationDetails);
  }

  updateApplicationService(
    formValue: FormControl,
    applicationDetails: ApplicationDetails,
    type: UpdateType = UpdateType.SAVE
  ) {
    this._updateApplicationService(type, {
      key: this.getApplicationKey(),
      details: applicationDetails,
      formValue,
      isSubmitted: this.isSubmitted,
      type: FormType.Application,
    })
      .pipe(take(1))
      .subscribe({
        next: () => this._handleSuccess(),
        error: (error: Error) => this._handleErrors(error),
      });
  }

  async submitForm(applicationDetails: ApplicationDetails, form: FormGroup, isLastPage: boolean): Promise<void> {
    this.updateQuestions();
    if (!this.isSubmitted && form.invalid) return;
    if (!isLastPage) return this.nextPage();
    if (this.isPaymentDue(applicationDetails) && !this.isSubmitted)
      return await this.continueToPayment(applicationDetails, form.value);
    this.updateApplicationService(form.value, applicationDetails, UpdateType.SUBMIT);
  }

  requestingRoommate() {
    const requestingRoommate = this.getRequestingRoommate();
    this.applicationsStateService.setRequestingRoommate(requestingRoommate);
    if (this.applicationsStateService.requestingRoommate.length && requestingRoommate.length) {
      this.requestingRoommateModal(requestingRoommate);
    }
  }

  private async requestingRoommateModal(requestingRoommate: RoommatePreferences[]) {
    const RequestingRoommateModal = await this.modalController.create({
      component: RequestingRoommateModalComponent,
      componentProps: { requestingRoommate },
    });
    await RequestingRoommateModal.present();
  }

  private getRequestingRoommate() {
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
    return requestingRoommate;
  }

  private updateQuestions() {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  private _updateApplicationService(type: string, application: CurrentForm) {
    this.loadingService.showSpinner();
    if (/save/.test(type)) {
      return this.applicationsService.saveApplication(application);
    }
    if (/submit/.test(type)) {
      return this.applicationsService.submitApplication(application);
    }
  }

  private initApplicationDetails$() {
    this.loadingService.showSpinner();
    return this.housingService.getApplicationDetails(this.getApplicationKey()).pipe(
      tap((applicationDetails: ApplicationDetails) => {
        this.isSubmitted = applicationDetails.patronApplication?.status === ApplicationStatus.Submitted;
        this.termService.termId$
          .pipe(
            switchMap(termId => this.housingService.getRequestedRommate(termId)),
            take(1)
          )
          .subscribe(() => this.loadingService.closeSpinner());
        if (!this.isSubmitted && this.applicationsStateService.requestingRoommate != null) {
          return this.requestingRoommate();
        }
      }),
      catchError(error => {
        this.loadingService.closeSpinner();
        return throwError(error);
      })
    );
  }

  private getPages$() {
    return this.applicationsService.getQuestions(this.getApplicationKey());
  }

  private nextPage(): void {
    this.page.scrollToTop();
    this.stepper.next();
  }

  isRoommateSearch(question: string): boolean {
    return question === 'Search for a roommate';
  }

  onCancel() {
    this.housingService.handleSuccess();
  }

  onChange(applicationDetails: ApplicationDetails, formValue: FormGroup) {
    this.applicationsService
    .saveLocally(this.getApplicationKey(), applicationDetails, formValue.value)
    .pipe(take(1)).subscribe();
  }

  onBack() {
    this.page.scrollToTop();
  }

  private _handleSuccess() {
    this.housingService.handleSuccess();
  }

  private _handleErrors(error: Error) {
    this.housingService.handleErrors(error);
  }

  private getApplicationKey() {
    return this.route.snapshot.params.applicationKey;
  }

  private async continueToPayment(appDetails: ApplicationDetails, form: FormControl) {
    this.formPaymentService.continueToFormPayment({
      details: appDetails,
      formValue: form,
      key: this.getApplicationKey(),
      type: FormType.Application,
    });
  }

  private isPaymentDue(applicationDetails: ApplicationDetails): boolean {
    return applicationDetails.applicationDefinition.amount > 0;
  }
}
