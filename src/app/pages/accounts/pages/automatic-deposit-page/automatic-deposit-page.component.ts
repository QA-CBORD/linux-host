import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SettingService } from '../../services/setting.service';
import { map, take, tap } from 'rxjs/operators';
import { SYSTEM_SETTINGS_CONFIG } from '../../accounts.config';
import { AutoDepositService } from './service/auto-deposit.service';
import {
    AUTO_DEPOSIT_PAYMENT_TYPES,
    AUTO_DEPOST_SUCCESS_MESSAGE_TITLE,
    DEPOSIT_FREQUENCY, getLowBalanceSuccessBodyMessage, getMonthlySuccessBodyMessage, getWeeklySuccessBodyMessage
} from './auto-deposit.config';
import { WEEK } from '../../../../core/utils/date-helper';
import { UserAutoDepositSettingInfo } from './models/auto-deposit-settings';
import { errorDecorator, parseArray, validateMonthRange } from '../../../../core/utils/general-helpers';
import { PopoverComponent } from "./components/popover/popover.component";
import { PopoverController } from "@ionic/angular";

@Component({
    selector: 'st-automatic-deposit-page',
    templateUrl: './automatic-deposit-page.component.html',
    styleUrls: ['./automatic-deposit-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomaticDepositPageComponent implements OnInit {
    automaticDepositForm: FormGroup;
    activeType: number;
    activeFrequency: string;
    autoDepositSettings: UserAutoDepositSettingInfo;
    customActionSheetOptions: { [key: string]: string } = {
        cssClass: 'custom-deposit-actionSheet',
    };

    constructor(
        private readonly fb: FormBuilder,
        private readonly settingService: SettingService,
        private readonly autoDepositService: AutoDepositService,
        private readonly popoverCtrl: PopoverController
    ) {
    }

    ngOnInit() {
        this.autoDepositSettings = this.autoDepositService.userAutoDepositInfo;
        this.initForm();
    }

    //-------------------- Constants block --------------------------//

    get controlNames() {
        return AUTOMATIC_DEPOSIT_CONTROL_NAMES;
    }

    get autoDepositTypes() {
        return AUTO_DEPOSIT_PAYMENT_TYPES;
    }

    get frequency() {
        return DEPOSIT_FREQUENCY;
    }

    get weekArray(): string[] {
        return WEEK;
    }

    //-------------------- Constants block end--------------------------//

    //-------------------- Controls getter block --------------------------//

    get amountToDeposit(): AbstractControl {
        return this.automaticDepositForm.get(this.controlNames.amountToDeposit);
    }

    get dayOfMonth(): AbstractControl {
        return this.automaticDepositForm.get(this.controlNames.dayOfMonth);
    }

    get dayOfWeek(): AbstractControl {
        return this.automaticDepositForm.get(this.controlNames.dayOfWeek);
    }

    get paymentMethod(): AbstractControl {
        return this.automaticDepositForm.get(this.controlNames.paymentMethod);
    }

    get account(): AbstractControl {
        return this.automaticDepositForm.get(this.controlNames.account);
    }

    get lowBalanceAmount(): AbstractControl {
        return this.automaticDepositForm.get(this.controlNames.lowBalanceAmount);
    }

    //-------------------- Controls getter block end--------------------------//

    //-------------------- Dynamic form settings block --------------------------//

    get lowBalanceValues(): Observable<string[]> {
        return this.settingService.settings$.pipe(
            map(settings => {
                const settingInfo = this.settingService.getSettingByName(
                    settings,
                    SYSTEM_SETTINGS_CONFIG.lowBalanceAmounts.name
                );

                return settingInfo && parseArray<string>(settingInfo.value);
            })
        );
    }

    get amountToDepositValues(): Observable<string[]> {
        return this.settingService.settings$.pipe(
            map(settings => {
                const settingInfo = this.settingService.getSettingByName(
                    settings,
                    SYSTEM_SETTINGS_CONFIG.billMeFreeFormAmounts.name
                );

                return settingInfo && parseArray<string>(settingInfo.value);
            })
        );
    }

    get isAllowFreeFormBillMe(): Observable<boolean> {
        return this.settingService.settings$.pipe(
            map(settings => {
                const settingInfo = this.settingService.getSettingByName(
                    settings,
                    SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled.name
                );

                return settingInfo && Boolean(Number(settingInfo.value));
            })
        );
    }

    get isLowBalanceFreeInput(): Observable<boolean> {
        return this.settingService.settings$.pipe(
            map(settings => {
                const settingInfo = this.settingService.getSettingByName(
                    settings,
                    SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormEnabled.name
                );

                return settingInfo && Boolean(Number(settingInfo.value));
            })
        );
    }

    //-------------------- Dynamic form settings block end--------------------------//

    private set _activeType(type: number) {
        this.activeType = type;
    }

    parseFloat(val: string): number {
        return parseFloat(val);
    }

    // -------------------- Events handlers block--------------------------//

    onTypeChangedHandler(type: number) {
        const isAutomaticDepositOff = type === this.autoDepositTypes.automaticDepositOff;
        const isFormInit =
            type !== this.autoDepositTypes.automaticDepositOff &&
            this.activeType === this.autoDepositTypes.automaticDepositOff;

        if (isAutomaticDepositOff) {
            this.automaticDepositForm = null;
            return (this._activeType = type);
        } else if (isFormInit) {
            this.initForm();
        }

        this.updateFormState(type);
    }

    onFrequencyChanged(event: string) {
        this.activeFrequency = event;
        this.updateFormState(this.activeType, event);
    }

    onSubmit() {
        if (this.automaticDepositForm === null) {
            // serviceCall
        }
        // console.log(this.automaticDepositForm.getRawValue());
        this.showModal();
    }

    // -------------------- Events handlers block end --------------------------//

    // -------------------- Form main block --------------------------//

    private initForm() {
        const payment = this.initPaymentFormBlock();

        this.automaticDepositForm = this.fb.group(payment);
        this.setValidators();
    }

    private updateFormState(type: number, frequency: string = this.activeFrequency) {
        let control;

        if (type === this.autoDepositTypes.lowBalance) {
            this.cleanControls([this.controlNames.dayOfMonth, this.controlNames.dayOfWeek]);
            control = this.initLowBalanceFormBlock();
        }

        if (type === this.autoDepositTypes.timeBased) {
            const timeBasedControlUnused =
                frequency === this.frequency.month ? this.controlNames.dayOfWeek : this.controlNames.dayOfMonth;
            this.cleanControls([this.controlNames.lowBalanceAmount, timeBasedControlUnused]);
            control = this.initTimeBasedBlock(frequency);
        }

        const controlName = Object.keys(control)[0];
        const controlSetting = control[controlName];

        this.automaticDepositForm.addControl(controlName, new FormControl(controlSetting[0], controlSetting[1]));
        this.updateActiveState(type, frequency);
        this.setValidators();
    }

    private updateActiveState(type: number, frequency: string) {
        this._activeType = type;
        this.activeFrequency = frequency;
    }

    private cleanControls(controlNames: string[]) {
        for (let i = 0; i < controlNames.length; i++) {
            this.automaticDepositForm.contains(controlNames[i]) && this.automaticDepositForm.removeControl(controlNames[i]);
        }
    }

    private setValidators() {
        this.automaticDepositForm.contains(AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount) &&
        this.isLowBalanceFreeInput
            .pipe(
                tap(val => {
                    const error = val
                        ? CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].requiredEnter
                        : CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount].requiredSelect;

                    this.automaticDepositForm
                        .get(AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount)
                        .setValidators([errorDecorator(Validators.required, error)]);
                }),
                take(1)
            )
            .subscribe();

        this.automaticDepositForm.contains(AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit) &&
        this.isAllowFreeFormBillMe
            .pipe(
                tap(val => {
                    const error = val
                        ? CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].requiredEnter
                        : CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit].requiredSelect;

                    this.automaticDepositForm
                        .get(AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit)
                        .setValidators([errorDecorator(Validators.required, error)]);
                }),
                take(1)
            )
            .subscribe();
    }

    // -------------------- Controls block --------------------------//

    private initPaymentFormBlock(): { [key: string]: any } {
        const accountValidators = [
            errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.account].required),
        ];
        const paymentMethodValidators = [
            errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod].required),
        ];

        return {
            [AUTOMATIC_DEPOSIT_CONTROL_NAMES.account]: ['', accountValidators],
            [AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit]: [this.autoDepositSettings.amount],
            [AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod]: ['', paymentMethodValidators],
        };
    }

    private initTimeBasedBlock(frequency: string) {
        let validators;
        let controlName;
        let day;

        if (frequency === this.frequency.month) {
            day = this.autoDepositSettings.dayOfMonth;
            controlName = AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth;
            validators = [
                errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth].required),
                errorDecorator(validateMonthRange, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth].range),
            ];
        } else {
            day = this.autoDepositSettings.dayOfWeek;
            controlName = AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek;
            validators = [
                errorDecorator(Validators.required, CONTROL_ERROR[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek].required),
            ];
        }

        return { [controlName]: [day ? day : '', validators] };
    }

    private initLowBalanceFormBlock() {
        return { [AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount]: [this.autoDepositSettings.lowBalanceAmount] };
    }

    // -------------------- Controls block end --------------------------//

    private async showModal(): Promise<void> {

        const modal = await this.popoverCtrl.create({
            component: PopoverComponent,
            componentProps: {
                data: { title: this.getModalTitle(), message: this.getModalBodyMessage() },
            },
            animated: false,
            backdropDismiss: true,
        });
        // modal.onDidDismiss().then(async () => await this.back());
        modal.present();
    }

    private getModalBodyMessage(): string {
        if (this.activeType === AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance)
            return getLowBalanceSuccessBodyMessage(this.amountToDeposit.value, this.lowBalanceAmount.value, 'Bill me');
        if (this.activeType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) {
            return this.activeFrequency === DEPOSIT_FREQUENCY.month
                ? getMonthlySuccessBodyMessage(this.amountToDeposit.value, this.dayOfMonth.value, 'Bill me')
                : getWeeklySuccessBodyMessage(this.amountToDeposit.value, this.dayOfWeek.value - 1, 'Bill me');
        }
    }

    private getModalTitle(): string {
        if (this.activeType === AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance) return AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.lowBalance;
        if (this.activeType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased) {
            return this.activeFrequency === DEPOSIT_FREQUENCY.month
                ? AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.monthly
                : AUTO_DEPOST_SUCCESS_MESSAGE_TITLE.weekly;
        }
    }
}

export enum AUTOMATIC_DEPOSIT_CONTROL_NAMES {
    amountToDeposit = 'amountToDeposit',
    account = 'account',
    paymentMethod = 'paymentMethod',
    lowBalanceAmount = 'lowBalanceAmount',
    dayOfWeek = 'dayOfWeek',
    dayOfMonth = 'dayOfMonth',
}

export const CONTROL_ERROR = {
    [AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit]: {
        requiredEnter: 'You must enter an amount.',
        requiredSelect: 'You must select a suitable amount from select',
    },
    [AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod]: {
        required: 'You must select payment method.',
    },
    [AUTOMATIC_DEPOSIT_CONTROL_NAMES.account]: {
        required: 'You must choose an account.',
    },
    [AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount]: {
        requiredEnter: 'You must enter an amount.',
        requiredSelect: 'You must select a suitable amount from select',
    },
    [AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek]: {
        required: 'You must select day of week',
    },
    [AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth]: {
        required: 'You must enter day of month',
        range: 'You must enter number between 1 and 31',
    },
};
