import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
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

@Component({
  selector: 'st-date-time-picker',
  templateUrl: './st-date-time-picker.component.html',
  styleUrls: ['./st-date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StDateTimePickerComponent implements OnInit {
  @Input() schedule: Schedule;
  @Input() data: { labelTime: string; address: any; isClickble: number };
  @Input() isTimeDisable: number;
  @Input() merchantInfo: MerchantInfo;
  @Input() dateTimePicker: Date | string;
  @Input() userData: UserInfo;
  @Input() orderType: number;
  @Output() onTimeSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() dateTimeWithTimeZone: string;
  private prevSelectedTimeInfo: TimeInfo = { prevIdx: 0, currentIdx: 0, maxValue: false };
  private selectedDayIdx = 0;
  private picker: HTMLIonPickerElement;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  private weekArray: ContentStringInfo[];
  private monthArray: ContentStringInfo[];
  private tomorrowString = 'Tomorrow';

  constructor(
    private readonly pickerController: PickerController,
    private readonly orderingService: OrderingService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.initContentStrings();
  }

  get isDefaultState(): boolean {
    return typeof this.dateTimePicker === 'string';
  }

  async openPicker(): Promise<void> {
    const confirm = await this.contentStrings.buttonConfirm.pipe(take(1)).toPromise();
    const back = await this.contentStrings.buttonBack.pipe(take(1)).toPromise();
    const title = await this.contentStrings.labelSelectTime.pipe(take(1)).toPromise();
    this.monthArray = await this.contentStringsFacadeService
      .getContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.monthAbbreviated)
      .pipe(take(1))
      .toPromise();
    this.weekArray = await this.contentStringsFacadeService
      .getContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.dayOfWeekAbbreviated)
      .pipe(take(1))
      .toPromise();

    const picker: HTMLIonPickerElement = await this.pickerController.create({
      columns: this.createColumns(),
      mode: 'ios',
      cssClass: 'picker-time-picker order-options-action-sheet order-options-action-sheet-p-d',
      buttons: [
        { text: back, role: 'cancel', cssClass: 'ios-arrow-back' },
        { text: title, role: 'title', cssClass: 'picker-title' },
        { text: confirm, handler: this.pickerClickHandler.bind(this) },
      ],
    });

    picker.addEventListener('ionPickerColChange', async (event: any) => {
      const { detail: data } = event;
      if (data.name === 1) {
        const isValueExist = !data.options[data.selectedIndex].text;
        const extraProps = isValueExist ? { maxValue: true } : { currentIdx: data.selectedIndex, maxValue: false };

        this.prevSelectedTimeInfo = { ...this.prevSelectedTimeInfo, ...extraProps };
      } else {
        this.prevSelectedTimeInfo = { ...this.prevSelectedTimeInfo, maxValue: true };
        this.selectedDayIdx = data.selectedIndex;
      }

      picker.columns = this.createColumns();
    });
    this.picker = picker;
    await this.updateAsapOption();
    await picker.present();

    setTimeout(() => {
      const pageTitle = document.getElementsByClassName('picker-title')[0] as HTMLElement;
      if (pageTitle) pageTitle.focus();
    }, TIMEOUTS.A11yFocus);
  }

  private pickerClickHandler(dateInfo: any) {
    const [date, { value }] = Object.values(dateInfo);
    let dateValue, timeStamp;
    if (value === 'asap') {
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
    this.onTimeSelected.emit({ dateTimePicker: this.dateTimePicker, timeStamp });
  }

  private hasTimeStamp(): boolean {
    const timeStamps = this.schedule.days[0].hourBlocks[0].timestamps;
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

  private preparePickerArr(i = 0): any[] {
    const arr1 = this.schedule.days.map(({ date }) => date);
    const arr2 = this.schedule.days[i].hourBlocks.reduce(
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
    const [daysOptions] = dataArr;
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
        options: this.getColumnOptions(i, daysOptions.length, 93, dataArr, isToday),
        selectedIndex: i === 0 ? this.selectedDayIdx : prevSelectedTimeIdx,
      });
    }
    return columns;
  }

  private getColumnOptions(columnIndex, daysOptions, timeOptions, columnOptions, isToday): any[] {
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

  private async initContentStrings() {
    this.contentStrings.buttonConfirm = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonConfirm
    );
    this.contentStrings.buttonBack = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonBack);
    this.contentStrings.labelAsap = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelAsap);
    this.contentStrings.labelSelectTime = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelSelectTime
    );
    this.tomorrowString = await this.orderingService
      .getContentStringByName(ORDERING_CONTENT_STRINGS.labelTomorrow)
      .pipe(take(1))
      .toPromise();
  }

  async updateAsapOption(): Promise<void> {
    const asapLabel = await this.contentStrings.labelAsap.pipe(take(1)).toPromise();
    this.picker &&
      this.picker.columns.forEach(({ options }) => {
        const index = options.findIndex(({ value }) => value === 'asap');
        if (index !== -1) {
          options[index] = { ...options[index], text: asapLabel };
        }
      });
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
