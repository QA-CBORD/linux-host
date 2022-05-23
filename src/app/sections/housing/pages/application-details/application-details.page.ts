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
import { ToastController, ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { from, merge, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { ApplicationsService } from '../../applications/applications.service';
import { HousingService } from '../../housing.service';

import { StepperComponent } from '../../stepper/stepper.component';
import { StepComponent } from '../../stepper/step/step.component';
import { QuestionComponent } from '../../questions/question.component';

import { ApplicationDetails, ApplicationStatus, PatronApplication } from '../../applications/applications.model';
import { QuestionsPage } from '../../questions/questions.model';
import { ApplicationsStateService } from '../../applications/applications-state.service';
import { RequestingRoommateModalComponent } from '@shared/ui-components/requesting-roommate-modal/requesting-roommate-modal.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { ApplicationPaymentComponent } from '../application-payment/application-payment.component';
import { CreditCardMgmtComponent } from '@sections/settings/creditCards/credit-card-mgmt/credit-card-mgmt.component';
import { CREDITCARD_ICONS, CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { UserAccount } from '@core/model/account/account.model';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { PaymentSystemType } from 'src/app/app.global';
import { firstValueFrom } from '@shared/utils';
import { contentStringsByCategory } from '@sections/settings/helpers/setting-item.helper';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { AccountsService } from '@sections/dashboard/services';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { reduceToObject } from '@shared/model/content-strings/content-string-utils';
import { defaultCreditCardMgmtCs } from '@shared/model/content-strings/default-strings';
import { DefinitionsResponse } from '@sections/housing/housing.model';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-application-details',
  templateUrl: './application-details.page.html',
  styleUrls: ['./application-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailsPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @ViewChild('content') private content: any;

  @ViewChild(StepperComponent) stepper: StepperComponent;

  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  applicationDetails$: Observable<ApplicationDetails>;

  pages$: Observable<QuestionsPage[]>;

  applicationKey: number;

  isSubmitted: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _applicationsService: ApplicationsService,
    private _applicationsStateService: ApplicationsStateService,
    private _router: Router,
    private _toastController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private modalController: ModalController,
    private _termService: TermsService,
    private readonly accountService: AccountsService,
    private contentString: ContentStringsFacadeService
  ) {}

  async ngOnInit() {
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

  async submit(applicationDetails: ApplicationDetails, form: FormGroup, isLastPage: boolean): Promise<void> {
    const cString = [
      {
        id: 'a246b105-f0a7-48cd-a84c-3e97652f4895',
        name: 'screen_title',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: 'Payment Methods-OP',
        description: 'credit card mgmt page title',
      },
      {
        id: '00320662-c51d-4e38-a8e4-65d93dbe5adc',
        name: 'cancel_remove_card_btn',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: 'Cancel',
        description: 'cancel_remove_card button text',
      },
    ];

    if (applicationDetails.applicationDefinition.accountCodeKey) {
      const accounts = await firstValueFrom(this.accountService.getUserAccounts([PaymentSystemType.USAEPAY]))
        .then(accounts => accounts.map(acc => this.buildStr(acc)))
        .finally(() => this._loadingService.closeSpinner());

      const modal = await this.modalController.create({
        component: ApplicationPaymentComponent,
        animated: false,
        backdropDismiss: true,
        componentProps: { contentStrings: reduceToObject(cString, defaultCreditCardMgmtCs), userAccounts: accounts },
      });
      await modal.present();
    }

    // this._touch();

    // if (!this.isSubmitted && !form.valid) {
    //   return;
    // }

    // if (!isLastPage) {
    //   this._next(applicationDetails, form.value);
    // } else {
    //   this._update('submit', this.applicationKey, applicationDetails, form.value);
    // }
  }

  filterAccountsByPaymentSystem(accounts: UserAccount[], paymentSistems: number[]): UserAccount[] {
    return accounts.filter(({ paymentSystemType: type }) => paymentSistems.includes(type));
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

        if (!this.isSubmitted && this._applicationsStateService.requestingRoommate != null) {
          this._loadingService.closeSpinner();
          this.Showmodal();
        } else {
          this._subscription.add(
            this._termService.termId$.subscribe(termId =>
              this._housingService.getRequestedRommate(termId).subscribe(() => this._loadingService.closeSpinner())
            )
          );
        }
      }),
      catchError((error: any) => {
        this._loadingService.closeSpinner();

        return throwError(error);
      })
    );
  }

  async Showmodal() {
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

  private _initPagesObservable(): void {
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

  private _initSubscription(): void {
    const dashboardSubscription: Subscription = merge(
      this._housingService.refreshDefinitions$,
      this._termService.termId$
    )
      .pipe(
        switchMap((termId: number) => {
          this._loadingService.showSpinner();
          return merge(
            this._housingService.getDefinitions(termId),
            this._housingService.getRoomSelects(termId),
            this._housingService.getPatronContracts(termId),
            this._housingService.getCheckInOuts(termId),
            this._housingService.getInspections(termId)
          );
        })
      )
      .subscribe({
        next: (response: DefinitionsResponse) => this._handleSuccess(),
        error: () => this._loadingService.closeSpinner(),
      });

    this._subscription.add(dashboardSubscription);
  }

  private buildStr(account: UserAccount) {
    const { accountTender, lastFour } = account;
    const creditCardTypeNumber = parseInt(accountTender) - 1;
    const display = `${CREDITCARD_TYPE[creditCardTypeNumber]} ending in ${lastFour}`;
    const iconSrc = CREDITCARD_ICONS[creditCardTypeNumber];
    return {
      display,
      account,
      iconSrc,
    };
  }
}
