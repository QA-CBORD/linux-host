import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '@core/model/account/account.model';
import { DETAILS_FORM_CONTROL_NAMES, MerchantAccountInfoList } from '@sections/ordering';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { AccountType, DisplayName } from 'src/app/app.global';

@Component({
  selector: 'st-guest-add-funds',
  templateUrl: './guest-add-funds.component.html',
  styleUrls: ['./guest-add-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestAddFundsComponent implements OnInit {
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  @Input() applePayEnabled: boolean;
  @Input() accInfoList: MerchantAccountInfoList = {} as MerchantAccountInfoList;
  @Input() accounts: UserAccount[] = [];
  @Input() mealBased: boolean;

  applePayAccountType: Partial<UserAccount> = {
    accountType: AccountType.APPLEPAY,
    accountDisplayName: DisplayName.APPLEPAY,
    isActive: true,
  };

  detailsForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly globalNav: GlobalNavService) {}

  ngOnInit() {
    this.initForm();
    this.initContentStrings();
    this.globalNav.hideNavBar();
  }

  ngOnDestroy() {
    this.globalNav.showNavBar();
  }

  initForm() {
    this.detailsForm = this.fb.group({
      [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: ['', Validators.required],
    });
  }

  get controlsNames() {
    return DETAILS_FORM_CONTROL_NAMES;
  }

  get paymentMethod(): AbstractControl {
    return this.detailsForm.get(DETAILS_FORM_CONTROL_NAMES.paymentMethod);
  }

  onPaymentChanged({ detail: { value } }) {}

  private initContentStrings() {
    // this.contentStrings.buttonCancel = this.orderingService.getContentStringByName(
    //   ORDERING_CONTENT_STRINGS.buttonCancel
    // );
  }
}
