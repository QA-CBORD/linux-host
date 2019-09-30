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
  @Input() addresses: any;
  @Input() orderTypes: MerchantOrderTypesInfo;

  constructor(
    private readonly pickerController: PickerController,
    private readonly modalController: ModalController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    console.log(this.addresses.days);
    console.log(this.orderTypes);
  }

  public async openPicker() {
    const picker: HTMLIonPickerElement = await this.pickerController.create({
      columns: this.createColumns(0),
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
        return;
      }
      const colSelectedIndex = data.selectedIndex;

      const columns = this.createColumns(colSelectedIndex);

      // debugger
      // for (let i = 0; i < columns[1].options.length; i++) {
      //   if (!columns[1].options[i].duration) {
      //     columns[1].options[i] = {
      //       ...columns[1].options[i],
      //       duration: !columns[1].options[i].duration ? 150 : columns[1].options[i].duration,
      //       transform: !columns[1].options[i].transform ? 'translate3d(0px,2322px,0px) scale(0.81)' : columns[1].options[i].transform,
      //       selected: false,
      //     };
      //   }
      //   return columns[1].options[i];
      // }

      console.log(columns);

      picker.columns = columns;
      picker.forceUpdate();
    });

    await picker.present();
  }

  preparePickerArr(i = 0) {
    const arr1 = this.addresses.days.map(day => day.date);
    const arr2 = this.addresses.days[i].hourBlocks.reduce(
      (total, block) => [
        ...total,
        ...block.minuteBlocks.map(minuteBlock => `${block.hour}:${minuteBlock === 0 ? '00' : minuteBlock}`),
      ],
      []
    );
    return [arr1, arr2];
  }

  createColumns(selectedIdx) {
    let columns = [];
    const dataArr = this.preparePickerArr(selectedIdx);
    const [daysOptions, timeOptions] = dataArr;
    for (let i = 0; i < 2; i++) {
      columns.push({
        name: i,
        options: this.getColumnOptions(i, daysOptions.length, 92, dataArr),
        selectedIndex: i === 0 ? selectedIdx : null,
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex, daysOptions, timeOptions, columnOptions) {
    let pickerColumns = [];
    const total = columnIndex === 0 ? daysOptions : timeOptions;
    const text = i =>
      columnIndex === 0
        ? this.datePipe.transform(columnOptions[columnIndex][i % total], 'EE, MMM d')
        : columnOptions[columnIndex][i % total];

    for (let i = 0; i < total; i++) {
      pickerColumns.push({
        text: text(i),
        value: columnOptions[columnIndex][i % total],
      });
    }
    return pickerColumns;
  }

  onRadioGroupChanged({ target }) {
    console.log(target.value);
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
}
