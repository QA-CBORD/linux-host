import { Component, OnInit, Input } from '@angular/core';
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
  multiColumnOptions: any;

  constructor(private readonly pickerController: PickerController, private readonly modalController: ModalController) {}

  ngOnInit() {
    console.log(this.addresses.days);
    console.log(this.orderTypes);

    this.multiColumnOptions = [
      ['Minified', 'Responsive', 'Full Stack', 'Mobile First', 'Serverless'],
      ['Tomato', 'Avocado', 'Onion', 'Potato', 'Artichoke'],
    ];
  }

  public async openPicker(numOptions = 5) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numOptions, this.multiColumnOptions),
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
      console.log(event);
      console.log(picker);
    });

    await picker.present();
  }

  getColumns(numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < 2; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions),
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i,
      });
    }
    return options;
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
