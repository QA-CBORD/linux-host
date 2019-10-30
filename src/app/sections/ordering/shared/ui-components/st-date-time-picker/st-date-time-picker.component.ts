import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PickerController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'st-date-time-picker',
  templateUrl: './st-date-time-picker.component.html',
  styleUrls: ['./st-date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StDateTimePickerComponent {
  private prevSelectedTimeInfo: TimeInfo = { prevIdx: 0, currentIdx: 0, maxValue: false };
  private selectedDayIdx: number = 0;

  @Input() schedule: any;
  @Input() data: any;
  @Input() isTimeDisable: any;
  @Input() dateTimePicker: Date | string;
  @Output() onTimeSelected: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(private readonly datePipe: DatePipe,
              private readonly pickerController: PickerController) {}

  get isDefaultState() {
    return typeof this.dateTimePicker === 'string';
  }

  async openPicker() {
    const picker: HTMLIonPickerElement = await this.pickerController.create({
      columns: this.createColumns(),
      mode: 'ios',
      cssClass: 'picker-time-picker',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: ([date, time]) => {
            const [year, month, day] = date.value.split('-');
            if (time.value === 'asap') {
              this.dateTimePicker = new Date(year, month - 1, day);
            } else {
              let [hours, mins] = time.value.split(':');
              this.dateTimePicker = new Date(year, month - 1, day, hours, mins);
            }

            this.onTimeSelected.emit(this.dateTimePicker);
          },
        },
      ],
    });

    picker.addEventListener('ionPickerColChange', async (event: any) => {
      const data = event.detail;
      if (data.name === 1) {
        if (!data.options[data.selectedIndex].text) {
          this.prevSelectedTimeInfo = { ...this.prevSelectedTimeInfo, maxValue: true };
        } else {
          this.prevSelectedTimeInfo = { ...this.prevSelectedTimeInfo, currentIdx: data.selectedIndex, maxValue: false };
        }
      } else {
        this.selectedDayIdx = data.selectedIndex;
      }

      const columns = this.createColumns();

      picker.columns = columns;
      picker.forceUpdate();
      if (data.options[data.selectedIndex].text) {
        this.prevSelectedTimeInfo = { ...this.prevSelectedTimeInfo, prevIdx: data.selectedIndex };
      }
    });

    await picker.present();
  }

  private preparePickerArr(i = 0) {
    const arr1 = this.schedule.days.map(day => day.date);
    const arr2 = this.schedule.days[i].hourBlocks.reduce(
      (total, block) => [
        ...total,
        ...block.minuteBlocks.map(minuteBlock => `${block.hour}:${minuteBlock === 0 ? '00' : minuteBlock}`),
      ],
      []
    );
    return [arr1, arr2];
  }

  private createColumns() {
    let columns = [];
    let prevSelectedTimeIdx;
    const dataArr = this.preparePickerArr(this.selectedDayIdx);
    const [daysOptions] = dataArr;
    if (this.prevSelectedTimeInfo.maxValue) {
      prevSelectedTimeIdx = this.prevSelectedTimeInfo.prevIdx;
      this.prevSelectedTimeInfo.maxValue = false;
    } else {
      prevSelectedTimeIdx = this.prevSelectedTimeInfo.currentIdx;
    }
    for (let i = 0; i < 2; i++) {
      columns.push({
        name: i,
        options: this.getColumnOptions(i, daysOptions.length, 93, dataArr),
        selectedIndex: i === 0 ? this.selectedDayIdx : prevSelectedTimeIdx,
      });
    }
    return columns;
  }

  private getColumnOptions(columnIndex, daysOptions, timeOptions, columnOptions) {
    let pickerColumns = [];
    const total = columnIndex === 0 ? daysOptions : timeOptions;
    const getColumnText = i => {
      if (columnIndex === 1) {
        return columnOptions[columnIndex][i % total];
      }

      if (this.isTodayOrTomorrow(columnOptions[columnIndex][i % total], true)) {
        return 'Today';
      }

      if (this.isTodayOrTomorrow(columnOptions[columnIndex][i % total], false)) {
        return 'Tomorrow';
      }

      return this.datePipe.transform(columnOptions[columnIndex][i % total], 'EE, MMM d');
    };

    if (columnIndex === 1) {
      pickerColumns.push({
        text: 'ASAP',
        value: 'asap',
      });
    }
    for (let i = 1; i < total; i++) {
      pickerColumns.push({
        text: getColumnText(i),
        value: columnOptions[columnIndex][i % total],
      });
    }
    return pickerColumns;
  }

  private isTodayOrTomorrow(date, isToday) {
    const today = new Date();
    const someDate = new Date(date);
    const index = isToday ? 0 : 1;
    return (
      someDate.getDate() == today.getDate() + index &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  }
}

interface TimeInfo {
  prevIdx: number;
  currentIdx: number;
  maxValue: boolean;
}
