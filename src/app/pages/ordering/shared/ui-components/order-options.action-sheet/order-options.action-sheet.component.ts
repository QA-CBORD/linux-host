import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MerchantOrderTypesInfo } from '../../models';
import { PickerController, ModalController } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from '../delivery-addresses.modal/delivery-addresses.modal.component';

@Component({
  selector: 'st-order-options.action-sheet',
  templateUrl: './order-options.action-sheet.component.html',
  styleUrls: ['./order-options.action-sheet.component.scss'],
})
export class OrderOptionsActionSheetComponent implements OnInit {
  @Input() schedule: any;
  @Input() orderTypes: MerchantOrderTypesInfo;
  @Input() defaultAddress: string;
  @Input() addresses: any;
  currentOrderOptions;
  private prevSelectedTimeInfo = { prevIdx: 0, currentIdx: 0, maxValue: false };
  private selectedDayIdx: number = 0;

  constructor(
    private readonly pickerController: PickerController,
    private readonly modalController: ModalController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.currentOrderOptions = this.orderTypes.pickup;
    console.log(this.defaultAddress);
    console.log(this.addresses);
  }

  public async openPicker() {
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
          handler: value => {
            console.log(value);
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

  preparePickerArr(i = 0) {
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

  createColumns() {
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
        options: this.getColumnOptions(i, daysOptions.length, 92, dataArr),
        selectedIndex: i === 0 ? this.selectedDayIdx : prevSelectedTimeIdx,
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex, daysOptions, timeOptions, columnOptions) {
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

    for (let i = 0; i < total; i++) {
      pickerColumns.push({
        text: getColumnText(i),
        value: columnOptions[columnIndex][i % total],
      });
    }
    return pickerColumns;
  }

  onRadioGroupChanged({ target }) {
    this.currentOrderOptions = target.value === 'pickup';
  }

  openDeliveryAddressesModal() {
    this.modalWindow();
  }

  private async modalWindow() {
    const modal = await this.modalController.create({
      component: DeliveryAddressesModalComponent,
      componentProps: {},
    });
    modal.onDidDismiss().then(() => {});
    await modal.present();
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
