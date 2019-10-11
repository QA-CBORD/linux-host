import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-delivery-addresses.modal',
  templateUrl: './delivery-addresses.modal.component.html',
  styleUrls: ['./delivery-addresses.modal.component.scss'],
})
export class DeliveryAddressesModalComponent implements OnInit {

  @Input() address;
  @Input() listOfAddresses;
  @Input() buildings;
  addNewAdddressState: boolean = false;
  addNewAdddressForm: { value: any; valid: boolean };
  selectedAddress;
  constructor(private readonly modalController: ModalController) { }

  ngOnInit() {
    
  }

  get addresses() {
    return this.listOfAddresses.map(item => item.addressInfo ? item.addressInfo : item);
  }

  async onClickedDone(selectedAddress) {
    await this.modalController.dismiss(selectedAddress);
  }

  onRadioGroupChanged({ target }) {
    this.selectedAddress = target.value;
  }

  onAddressFormChanged(event) {
    console.log(event);
    this.addNewAdddressForm = event;
  }
}
