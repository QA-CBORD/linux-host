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
import { from, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ApplicationsService } from '../../applications/applications.service';
import { LoadingService } from '@core/service/loading/loading.service';
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

  // private _initSubscription(): void {
  //   const dashboardSubscription: Subscription = merge(
  //     this._housingService.refreshDefinitions$,
  //     this._termsService.termId$
  //   )
  //     .pipe(
  //       switchMap((termId: number) => {
  //         this._loadingService.showSpinner();
  //         return merge(
  //           this._housingService.getDefinitions(termId),
  //           this._housingService.getRoomSelects(termId),
  //           this._housingService.getPatronContracts(termId),
  //           this._housingService.getCheckInOuts(termId),
  //           this._housingService.getInspections(termId)
  //         )
  //       })
  //     )
  //     .subscribe({
  //       next: (response: DefinitionsResponse) => this._handleSuccess(response),
  //       error: () => this._loadingService.closeSpinner(),
  //     });

  //   this._subscription.add(dashboardSubscription);
  // }
  constructor(
    private _route: ActivatedRoute,
    private _applicationsService: ApplicationsService,
    private _applicationsStateService: ApplicationsStateService,
    private _router: Router,
    private _toastController: ToastController,
    private loadingService: LoadingService,
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
    const accounts = [
      // {
      //   id: 'T:1:2fea7cac-1939-488f-b97a-9e5a508ce216:802',
      //   institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
      //   paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
      //   userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
      //   isActive: true,
      //   accountDisplayName: 'Bonus Bucks',
      //   paymentSystemType: 1,
      //   accountTender: '802',
      //   accountType: 3,
      //   depositAccepted: true,
      //   lastFour: null,
      //   nameOnMedia: null,
      //   expirationMonth: null,
      //   expirationYear: null,
      //   billingAddressId: null,
      //   balance: 177040.08,
      // },
      // {
      //   id: 'T:1:2fea7cac-1939-488f-b97a-9e5a508ce216:3',
      //   institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
      //   paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
      //   userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
      //   isActive: true,
      //   accountDisplayName: 'Points',
      //   paymentSystemType: 1,
      //   accountTender: '3',
      //   accountType: 3,
      //   depositAccepted: true,
      //   lastFour: null,
      //   nameOnMedia: null,
      //   expirationMonth: null,
      //   expirationYear: null,
      //   billingAddressId: null,
      //   balance: 192462.36,
      // },
      // {
      //   id: 'T:1:2fea7cac-1939-488f-b97a-9e5a508ce216:801',
      //   institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
      //   paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
      //   userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
      //   isActive: true,
      //   accountDisplayName: 'Dining Dollars',
      //   paymentSystemType: 1,
      //   accountTender: '801',
      //   accountType: 3,
      //   depositAccepted: true,
      //   lastFour: null,
      //   nameOnMedia: null,
      //   expirationMonth: null,
      //   expirationYear: null,
      //   billingAddressId: null,
      //   balance: 100.43,
      // },
      // {
      //   id: 'T:1:2fea7cac-1939-488f-b97a-9e5a508ce216:800',
      //   institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
      //   paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
      //   userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
      //   isActive: true,
      //   accountDisplayName: 'GET Meals',
      //   paymentSystemType: 1,
      //   accountTender: '800',
      //   accountType: 1,
      //   depositAccepted: false,
      //   lastFour: null,
      //   nameOnMedia: null,
      //   expirationMonth: null,
      //   expirationYear: null,
      //   billingAddressId: null,
      //   balance: 0,
      // },
      // {
      //   id: 'T:1:2fea7cac-1939-488f-b97a-9e5a508ce216:6',
      //   institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
      //   paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
      //   userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
      //   isActive: true,
      //   accountDisplayName: 'Charge',
      //   paymentSystemType: 1,
      //   accountTender: '6',
      //   accountType: 2,
      //   depositAccepted: false,
      //   lastFour: null,
      //   nameOnMedia: null,
      //   expirationMonth: null,
      //   expirationYear: null,
      //   billingAddressId: null,
      //   balance: 0,
      // },
      {
        id: '9e5ef9c6-290b-49f5-8f55-9f80360ece21',
        institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
        paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
        userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
        isActive: true,
        accountDisplayName: 'dev_opusaepayChild1 2222 getaws401',
        paymentSystemType: 4,
        accountTender: '4',
        accountType: 2,
        depositAccepted: false,
        lastFour: '2222',
        nameOnMedia: 'dev_opusaepayChild1 2222 getaws401',
        expirationMonth: null,
        expirationYear: null,
        billingAddressId: '94db9245-2e22-4d21-9aa4-3df962fd03a0',
        balance: null,
      },
      {
        id: '9e0201e1-7cae-4a1d-b90d-dbca812b7f99',
        institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
        paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
        userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
        isActive: true,
        accountDisplayName: 'dev_opusaepayChild2 2224 getaws401',
        paymentSystemType: 4,
        accountTender: '4',
        accountType: 2,
        depositAccepted: false,
        lastFour: '2224',
        nameOnMedia: 'dev_opusaepayChild2 2224 getaws401',
        expirationMonth: null,
        expirationYear: null,
        billingAddressId: '978ab08d-d7cf-4d14-88ce-77bc64991ca1',
        balance: null,
      },
      {
        id: '75504ba0-ea12-42c6-b91c-398a395c8baa',
        institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
        paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
        userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
        isActive: true,
        accountDisplayName: 'dev_opusaepayChild3 2220 getaws401',
        paymentSystemType: 4,
        accountTender: '4',
        accountType: 2,
        depositAccepted: false,
        lastFour: '2220',
        nameOnMedia: 'dev_opusaepayChild3 2220 getaws401',
        expirationMonth: null,
        expirationYear: null,
        billingAddressId: '64e3f59b-8615-4934-bed9-ee670c764f75',
        balance: null,
      },
      {
        id: 'fb1b959b-ae60-44cf-ade8-dda9757c0853',
        institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
        paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
        userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
        isActive: true,
        accountDisplayName: 'Mbn',
        paymentSystemType: 4,
        accountTender: '4',
        accountType: 2,
        depositAccepted: false,
        lastFour: '2220',
        nameOnMedia: 'Mbn',
        expirationMonth: null,
        expirationYear: null,
        billingAddressId: 'baf2da95-540a-4990-afdd-9c22ec59f00c',
        balance: null,
      },
      {
        id: '0dfda223-c612-4207-a5e1-17577ce0f9e9',
        institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
        paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
        userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
        isActive: true,
        accountDisplayName: 'Mbn 2',
        paymentSystemType: 4,
        accountTender: '4',
        accountType: 2,
        depositAccepted: false,
        lastFour: '2226',
        nameOnMedia: 'Mbn 2',
        expirationMonth: null,
        expirationYear: null,
        billingAddressId: 'dec16038-906e-4d84-a614-d9807f664097',
        balance: null,
      },
      {
        id: '5aa00c66-e69e-4451-8108-a0e98dbb496d',
        institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
        paymentSystemId: 'ddeed14e-0d94-4bc6-b511-3a6e75a83509',
        userId: '2fea7cac-1939-488f-b97a-9e5a508ce216',
        isActive: true,
        accountDisplayName: 'Test card',
        paymentSystemType: 4,
        accountTender: '4',
        accountType: 2,
        depositAccepted: false,
        lastFour: '2227',
        nameOnMedia: 'Test card',
        expirationMonth: null,
        expirationYear: null,
        billingAddressId: 'df7c6603-475b-4897-89bf-48680357b370',
        balance: null,
      },
    ];

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
      {
        id: '88238368-8189-4c45-bbe4-4eec36b1d422',
        name: 'user_info_text',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value:
          'Credit card information is handled by USAePay. After adding a new card, you will be redirected back to this screen.',
        description: 'message to user.',
      },
      {
        id: '794ba1c6-e064-457b-ae61-ac2481862b52',
        name: 'no_card_found',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: "oops. It seems you don't have any credit card added.",
        description: 'message when user has no credit card registered',
      },
      {
        id: 'd6fe12c3-4ce4-4e2d-9da6-23ad11fd6ec4',
        name: 'added_success_msg',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: 'Your credit card has been added successfully.',
        description: 'a message that displays when cc added successfully.',
      },
      {
        id: '31871876-be6c-41ec-8dbb-46478e79e4d5',
        name: 'error_loading_cards',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: 'An error occurred while loading your credit card accounts.',
        description: 'message to show when credit card loading service fails.',
      },
      {
        id: '81430112-1bad-4004-8e26-28de29bd35fa',
        name: 'remove_success_msg',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: 'Your credit card has been removed successfully.',
        description: 'a message that displays when cc successfully removed',
      },
      {
        id: '99b637dd-e73d-4d84-97ef-8397017c51ad',
        name: 'add_new_card_btn_text',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: 'Add New Card-OP',
        description: 'add card button text',
      },
      {
        id: 'f6004eeb-b58a-48db-ba4a-ab8ae769f647',
        name: 'remove_card_btn',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: 'Remove Card',
        description: 'remove_card button text',
      },
      {
        id: '05c53f2d-a9f3-4b00-ad52-ec486cb038d5',
        name: 'remove_failure_msg',
        domain: 'patron-ui',
        category: 'creditCardMgmt',
        locale: null,
        contentMediaType: 1,
        value: 'We could not remove your credit card, please try again later.',
        description: 'a message that displays could not remove cc',
      },
    ];
    const parseAccountData = (account: UserAccount) => {
      const { accountTender, lastFour } = account;
      const creditCardTypeNumber = parseInt(accountTender) - 1;
      const display = `${CREDITCARD_TYPE[creditCardTypeNumber]} ending in ${lastFour}`;
      const iconSrc = CREDITCARD_ICONS[creditCardTypeNumber];
      return { display, account, iconSrc };
    };

    // const contentStringsData = await this.contentString
    //   .fetchContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.creditCardMgmt)
    //   .toPromise();

    let userAccounts = [];
    try {
      userAccounts = await firstValueFrom(of(accounts)).then(accounts => accounts.map(acc => parseAccountData(acc)));
    } catch (ignored) {
      // fallback on empty userAccounts array
    } finally {
      await this.loadingService.closeSpinner();
    }

    if (applicationDetails.applicationDefinition.accountCodeKey) {
      const modal = await this.modalController.create({
        component: CreditCardMgmtComponent,
        animated: false,
        backdropDismiss: false,
        componentProps: { contentStrings: reduceToObject(cString, defaultCreditCardMgmtCs), userAccounts },
      });
      await modal.present();

      //  return modal.onDidDismiss().then(({ role }) => role === BUTTON_TYPE.OKAY);
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
    this.loadingService.showSpinner();

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
    this.loadingService.showSpinner();

    this.applicationDetails$ = this._housingService.getApplicationDetails(this.applicationKey).pipe(
      tap((applicationDetails: ApplicationDetails) => {
        const patronApplication: PatronApplication = applicationDetails.patronApplication;
        const status: ApplicationStatus = patronApplication && patronApplication.status;
        this.isSubmitted = status === ApplicationStatus.Submitted;

        if (!this.isSubmitted && this._applicationsStateService.requestingRoommate != null) {
          this.loadingService.closeSpinner();
          this.Showmodal();
        } else {
          this._subscription.add(
            this._termService.termId$.subscribe(termId =>
              this._housingService.getRequestedRommate(termId).subscribe(x => this.loadingService.closeSpinner())
            )
          );
        }
      }),
      catchError((error: any) => {
        this.loadingService.closeSpinner();

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
    let requestingRoommate = this._applicationsStateService.requestingRoommate.filter(result => {
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
}
