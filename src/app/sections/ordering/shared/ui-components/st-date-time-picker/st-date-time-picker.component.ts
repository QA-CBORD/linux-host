import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { take } from 'rxjs/operators';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../../../content-strings';
import { formatDateByContentStrings, isSameDay } from '@core/utils/date-helper';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { MerchantInfo } from '@sections/ordering';
import { Schedule } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { UserInfo } from '@core/model/user/user-info.model';
import { CartService } from '@sections/ordering/services';
import { lastValueFrom } from 'rxjs';
import { IonPicker, IonicModule, PickerButton, PickerColumn } from '@ionic/angular';
import { AppStatesFacadeService } from '@core/facades/appEvents/app-events.facade.service';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';
import { CommonModule } from '@angular/common';
import { StButtonModule } from '@shared/ui-components';
import { TranslateModule } from '@ngx-translate/core';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

export interface DateTimeSelected {
  dateTimePicker: Date | string;
  timeStamp: string;
}

export interface TimePickerData {
  labelTime: string;
  address: string;
  isClickble: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, StButtonModule, TranslateModule],
  selector: 'st-date-time-picker',
  templateUrl: './st-date-time-picker.component.html',
  styleUrls: ['./st-date-time-picker.component.scss'],
})
export class StDateTimePickerComponent implements OnInit {
  @Input() schedule: Schedule;
  @Input() prepTime: string;
  @Input() data: TimePickerData;
  @Input() isTimeDisable: number;
  @Input() merchantInfo: MerchantInfo;
  @Input() dateTimePicker: Date | string;
  @Input() userData: UserInfo;
  @Input() orderType: number;
  @Input() useBackButton = true;
  @Input() showLabel = true;
  @Output() onTimeSelected: EventEmitter<DateTimeSelected> = new EventEmitter<DateTimeSelected>();
  @Input() dateTimeWithTimeZone: string;
  private prevSelectedTimeInfo: TimeInfo = { prevIdx: 0, currentIdx: 0, maxValue: false };
  private selectedDayIdx = 0;
  private weekArray: ContentStringInfo[];
  private monthArray: ContentStringInfo[];
  private tomorrowString = 'Tomorrow';
  public isPickerOpen = false;
  public pickerColumns: PickerColumn[] = [];
  public pickerButtons: PickerButton[] = [];
  public pickerClass = 'picker-time-picker';
  public isVoiceOverMode: boolean;
  private pickerButtonElement = null;
  @ViewChild('timePicker') timePicker: IonPicker;

  private readonly translateFacadeService = inject(TranslateFacadeService);
  private readonly accessibility = inject(AccessibilityService);
  private readonly cdRef = inject(ChangeDetectorRef);
  constructor(
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly cartService: CartService,
    private readonly appStatesFacadeService: AppStatesFacadeService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.initContentStrings();
    this.listenAppChanges();
  }

  async onPickerWillPresent(event: CustomEvent) {
    this.isVoiceOverMode = await this.accessibility.isVoiceOverEnabled$;
    if (this.isVoiceOverMode) {
      this.accessiblePickupButton(event);
    }
    this.cdRef.detectChanges();
  }

  listenAppChanges() {
    this.appStatesFacadeService.getStateChangeEvent$.subscribe(async ({ isActive }) => {
      if (!isActive) {
        this.close();
      }
    });
  }

  get isDefaultState(): boolean {
    return typeof this.dateTimePicker === 'string';
  }
  async confirmPicker(): Promise<void> {
    const pickerHiddenConfirmButton = document.querySelector('.picker-hidden-confirm') as HTMLButtonElement;
    pickerHiddenConfirmButton.click();
  }
  handlePickerChange(event: CustomEvent) {
    const { detail: data } = event;
    if (data.name === 1) {
      const isValueExist = !data.options[data.selectedIndex].text;
      const extraProps = isValueExist ? { maxValue: true } : { currentIdx: data.selectedIndex, maxValue: false };

      this.prevSelectedTimeInfo = { ...this.prevSelectedTimeInfo, ...extraProps };
    } else {
      this.prevSelectedTimeInfo = { ...this.prevSelectedTimeInfo, maxValue: true };
      this.selectedDayIdx = data.selectedIndex;
    }

    this.pickerColumns = this.createColumns();
  }

  async openPicker(): Promise<void> {
    const back = this.translateFacadeService.orderingInstant(ORDERING_CONTENT_STRINGS.buttonBack);
    const title = this.translateFacadeService.orderingInstant(ORDERING_CONTENT_STRINGS.labelSelectTime);
    this.monthArray = await lastValueFrom(
      this.contentStringsFacadeService
        .getContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.monthAbbreviated)
        .pipe(take(1))
    );

    this.weekArray = await lastValueFrom(
      this.contentStringsFacadeService
        .getContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.dayOfWeekAbbreviated)
        .pipe(take(1))
    );
    this.pickerColumns = this.createColumns();
    this.pickerButtons = [
      { text: title, role: 'title', cssClass: 'picker-title' },
      { text: '', role: 'secondary', handler: this.pickerClickHandler.bind(this), cssClass: 'picker-hidden-confirm' },
    ];

    if (this.useBackButton) {
      this.pickerButtons.unshift({ text: back, role: 'cancel', cssClass: 'chevron-back' });
    } else {
      this.pickerClass = 'picker-time-picker-one-column';
    }

    this.isPickerOpen = true;

    this.updateAsapOption();

    setTimeout(() => {
      const pageTitle = document.getElementsByClassName('picker-title')[0] as HTMLElement;
      pageTitle.setAttribute('aria-label', title);
      pageTitle.setAttribute('aria-level', '1');
      pageTitle.setAttribute('role', 'heading');
      if (pageTitle) pageTitle.focus();
      const hiddenConfirmButton = document.getElementsByClassName('picker-hidden-confirm')[0] as HTMLElement;
      hiddenConfirmButton.setAttribute('aria-hidden', 'true');
    }, TIMEOUTS.A11yFocus);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public pickerClickHandler(dateInfo: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [date, { value }] = Object.values(dateInfo) as any[];
    let dateValue, timeStamp;
    if (value === 'asap' || !value) {
      dateValue = 'ASAP';
    } else {
      // eslint-disable-next-line prefer-const
      let [hours, mins] = value.split(':');
      const [minutes, period = ''] = mins.split(' ');
      hours = (period.includes('PM') && +hours != 12 && +hours + 12) || +hours;
      hours = period.includes('AM') && +hours == 12 ? 0 : hours;
      timeStamp = this.getTimeStamp(date.value, +hours, minutes);
      dateValue = new Date(timeStamp);
      this.dateTimeWithTimeZone = this.cartService.extractTimeZonedString(timeStamp, this.merchantInfo.timeZone);
    }
    this.dateTimePicker = dateValue;
    this.onTimeSelected.emit({ dateTimePicker: this.dateTimePicker, timeStamp } as DateTimeSelected);
  }

  private hasTimeStamp(): boolean {
    const timeStamps = this.schedule?.days[0]?.hourBlocks[0]?.timestamps;
    return timeStamps && timeStamps.length > 0;
  }

  private getTimeStamp(date, hours, minutes): string {
    if (!this.hasTimeStamp()) return null;
    try {
      const day = this.schedule.days.find(day => day.date == date);
      const hour = day.hourBlocks.find(h => h.hour == hours);
      const index = hour.minuteBlocks.findIndex(min => min == minutes);
      return hour.timestamps.find((ts, idx) => idx == index);
    } catch (e) {
      return null;
    }
  }

  private preparePickerArr(i = 0): [string[], string[]] {
    if (!this.schedule?.days) {
      return [[], []];
    }
    const arr1 = this.schedule.days.map(({ date }) => date);
    const arr2 = this.schedule.days[i].hourBlocks?.reduce(
      (previous, hourBlock) => [
        ...previous,
        ...hourBlock.minuteBlocks.map((minuteBlock, index) => hourBlock.periods[index]),
      ],
      []
    );
    return [arr1, arr2];
  }

  private createColumns() {
    const numberOfColumns = 2;
    const columns = [];
    let isToday;
    let prevSelectedTimeIdx;
    const dataArr = this.preparePickerArr(this.selectedDayIdx);
    const [daysOptions, timesOptions] = dataArr;
    if (this.prevSelectedTimeInfo.maxValue) {
      prevSelectedTimeIdx = this.prevSelectedTimeInfo.prevIdx;
      this.prevSelectedTimeInfo.maxValue = false;
    } else {
      prevSelectedTimeIdx = this.prevSelectedTimeInfo.currentIdx;
    }
    for (let i = 0; i < numberOfColumns; i++) {
      if (i === 1 && columns[0].selectedIndex === 0) {
        const splittedDate = columns[columns[0].selectedIndex].options[0].value.split('-');
        const selectedTime = `${splittedDate[1]}/${splittedDate[2]}/${splittedDate[0]}`;
        isToday = this.isTodayOrTomorrow(selectedTime, true);
      }

      columns.push({
        name: i,
        options: this.getColumnOptions(i, daysOptions.length, timesOptions.length, dataArr, isToday),
        selectedIndex: i === 0 ? this.selectedDayIdx : prevSelectedTimeIdx,
      });
    }
    return columns;
  }

  private getColumnOptions(columnIndex, daysOptions, timeOptions, columnOptions, isToday): string[] {
    const pickerColumns = [];
    const total = columnIndex === 0 ? daysOptions : timeOptions;
    const getColumnText = i => {
      if (columnIndex === 1) {
        return columnOptions[columnIndex][i % total];
      }
      const splittedDate = columnOptions[columnIndex][i % total].split('-');
      const selectedTime = `${splittedDate[1]}/${splittedDate[2]}/${splittedDate[0]}`;

      if (this.isTodayOrTomorrow(selectedTime, true)) {
        return 'Today';
      }

      if (this.isTodayOrTomorrow(selectedTime, false)) {
        return this.tomorrowString;
      }

      return formatDateByContentStrings(new Date(selectedTime), this.weekArray, this.monthArray);
    };

    for (let i = 0; i < total; i++) {
      if (columnIndex === 1 && i === 0 && isToday && this.merchantInfo.openNow) {
        pickerColumns.push({ text: 'ASAP', value: 'asap' });
      }

      pickerColumns.push({
        text: getColumnText(i),
        value: columnOptions[columnIndex][i % total],
      });
    }
    return pickerColumns;
  }

  private isTodayOrTomorrow(date, isToday) {
    const { locale, timeZone } = this.userData;
    const today = new Date().toLocaleString(locale, { timeZone });
    const idxForSlice = today.indexOf(',');

    return isSameDay(today.slice(0, idxForSlice), date, Number(!isToday));
  }

  private initContentStrings() {
    this.tomorrowString = this.translateFacadeService.orderingInstant(ORDERING_CONTENT_STRINGS.labelTomorrow);
  }

  private accessiblePickupButton(event: CustomEvent) {
    if (this.pickerButtonElement) {
      return;
    }

    this.pickerButtonElement = this.renderer.createElement('ion-button') as HTMLIonButtonElement;
    const pickUpTimeText = this.translateFacadeService.orderingInstant(ORDERING_CONTENT_STRINGS.buttonSetPickupTime);
    this.pickerButtonElement.innerText = pickUpTimeText;
    this.pickerButtonElement.setAttribute('aria-label', `${pickUpTimeText}`);
    this.pickerButtonElement.setAttribute('role', 'button');
    this.pickerButtonElement.setAttribute('tabindex', '0');
    this.pickerButtonElement.style.setProperty('--background', '#166dff');
    this.pickerButtonElement.style.setProperty('--border-radius', '8px');
    this.pickerButtonElement.style.setProperty('font-family', 'Nunito Bold, sans-serif');
    this.pickerButtonElement.style.setProperty('font-size', '16px');
    this.pickerButtonElement.style.setProperty('margin-inline-start', '15px');
    this.pickerButtonElement.style.setProperty('margin-inline-end', '15px');
    this.renderer.listen(this.pickerButtonElement, 'click', () => {
      this.confirmPicker();
    });

    const picker = event.target as HTMLElement;
    picker.querySelector('.picker-wrapper').appendChild(this.pickerButtonElement);
  }

  updateAsapOption() {
    const asapLabel = this.translateFacadeService.orderingInstant(ORDERING_CONTENT_STRINGS.labelAsap);
    this.pickerColumns.forEach(({ options }) => {
      const index = options.findIndex(({ value }) => value === 'asap');
      if (index !== -1) {
        options[index] = { ...options[index], text: asapLabel };
      }
    });
  }

  close() {
    this.isPickerOpen = false;
    this.timePicker && this.timePicker.dismiss();
  }
}

interface TimeInfo {
  prevIdx: number;
  currentIdx: number;
  maxValue: boolean;
}

const TIMEOUTS = {
  A11yFocus: 1000,
};
