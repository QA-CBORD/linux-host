import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { take } from 'rxjs/operators';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS } from '../../../../../content-strings';
import { formatDateByContentStrings, getDateTimeInGMT, isSameDay } from '@core/utils/date-helper';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { MerchantInfo } from '@sections/ordering';
import { Schedule } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { UserInfo } from '@core/model/user/user-info.model';

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
  @Output() onTimeSelected: EventEmitter<Date | string> = new EventEmitter<Date | string>();

  private prevSelectedTimeInfo: TimeInfo = { prevIdx: 0, currentIdx: 0, maxValue: false };
  private selectedDayIdx: number = 0;
  private picker: HTMLIonPickerElement;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  private weekArray: ContentStringInfo[];
  private monthArray: ContentStringInfo[];
  private tomorrowString: string = 'Tomorrow';

  constructor(private readonly pickerController: PickerController,
              private readonly orderingService: OrderingService,
              private readonly contentStringsFacadeService: ContentStringsFacadeService,
              ) {
  }

  async ngOnInit(): Promise<void> {
    this.initContentStrings();
  }

  get isDefaultState(): boolean {
    return typeof this.dateTimePicker === 'string';
  }

  async openPicker(): Promise<void> {
    const confirm = await this.contentStrings.buttonConfirm.pipe(take(1)).toPromise();
    const cancel = await this.contentStrings.buttonCancel.pipe(take(1)).toPromise();
    const title = await this.contentStrings.labelSelectTime.pipe(take(1)).toPromise();
    this.monthArray = await this.contentStringsFacadeService.getContentStrings$(CONTENT_STINGS_DOMAINS.patronUi,
      CONTENT_STINGS_CATEGORIES.monthAbbreviated).pipe(take(1)).toPromise();
    this.weekArray = await this.contentStringsFacadeService.getContentStrings$(CONTENT_STINGS_DOMAINS.patronUi,
      CONTENT_STINGS_CATEGORIES.dayOfWeekAbbreviated).pipe(take(1)).toPromise();

    const picker: HTMLIonPickerElement = await this.pickerController.create({
      columns: this.createColumns(),
      mode: 'ios',
      cssClass: 'picker-time-picker',
      buttons: [
        { text: cancel, role: 'cancel' },
        { text: title, role: 'title' },
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
      picker.forceUpdate();
    });
    this.picker = picker;
    await this.updateAsapOption();
    await picker.present();
  }

  private pickerClickHandler([date, { value }]) {
    const [year, month, day] = date.value.split('-');
    let dateValue;
    if (value === 'asap') {
      dateValue = 'ASAP';
    } else {
      let [hours, mins] = value.split(':');
      dateValue = new Date(year, month - 1, day, hours, mins);
    }

    this.dateTimePicker = dateValue;
    this.onTimeSelected.emit(this.dateTimePicker);
  }

  private preparePickerArr(i: number = 0): any[] {
    const arr1 = this.schedule.days.map(({ date }) => date);
    const arr2 = this.schedule.days[i].hourBlocks.reduce(
      (total, block) => [
        ...total,
        ...block.minuteBlocks.map(minuteBlock => `${block.hour}:${minuteBlock === 0 ? '00' : minuteBlock}`),
      ],
      [],
    );
    return [arr1, arr2];
  }

  private createColumns() {
    const numberOfColumns = 2;
    let columns = [];
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
        const splittedDate = (columns[columns[0].selectedIndex].options[0].value).split('-');
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
    let pickerColumns = [];
    const total = columnIndex === 0 ? daysOptions : timeOptions;
    const getColumnText = i => {
      if (columnIndex === 1) {
        return columnOptions[columnIndex][i % total];
      }
      const splittedDate = (columnOptions[columnIndex][i % total]).split('-');
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
    const { locale, timeZone } = this.userData
    const today = new Date().toLocaleString(locale, { timeZone });
    const idxForSlice = today.indexOf(',');

    return isSameDay(today.slice(0, idxForSlice), date, Number(!isToday));
  }

  private async initContentStrings() {
    this.contentStrings.buttonConfirm =
      this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonConfirm);
    this.contentStrings.buttonCancel =
      this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonCancel);
    this.contentStrings.labelAsap =
      this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelAsap);
    this.contentStrings.labelSelectTime =
      this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelSelectTime);
    this.tomorrowString = await
      this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelTomorrow)
        .pipe(take(1)).toPromise();
  }

  async updateAsapOption(): Promise<void> {
    const asapLabel = await this.contentStrings.labelAsap.pipe(take(1)).toPromise();
    this.picker && this.picker.columns.forEach(({ options }) => {
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
