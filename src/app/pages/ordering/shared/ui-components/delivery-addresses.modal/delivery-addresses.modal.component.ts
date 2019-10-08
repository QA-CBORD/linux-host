import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-delivery-addresses.modal',
  templateUrl: './delivery-addresses.modal.component.html',
  styleUrls: ['./delivery-addresses.modal.component.scss'],
})
export class DeliveryAddressesModalComponent implements OnInit {
  addNewAdddressState: boolean = false;
  addNewAdddressForm: { value: any; valid: boolean };
  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {}

  async onClickedDone() {
    await this.modalController.dismiss();
  }

  onRadioGroupChanged({ target }) {
    console.log(target.value);
  }

  onAddressFormChanged(event) {
    console.log(event);
    this.addNewAdddressForm = event;
  }
}
