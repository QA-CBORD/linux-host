import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MerchantService } from '@pages/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-delivery-addresses.modal',
  templateUrl: './delivery-addresses.modal.component.html',
  styleUrls: ['./delivery-addresses.modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryAddressesModalComponent {

  @Input() addressLabel;
  @Input() defaultAddress;
  @Input() listOfAddresses;
  @Input() buildings;
  addNewAdddressState: boolean = false;
  addNewAdddressForm: { value: any; valid: boolean };
  selectedAddress;
  constructor(private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService) { }

  async onClickedDone(selectedAddress) {
    await this.modalController.dismiss(selectedAddress);
  }

  addAddress() {
    this.loadingService.showSpinner();
    this.merchantService.updateUserAddress(this.addNewAdddressForm.value)
      .subscribe(() => {
        this.addNewAdddressState = !this.addNewAdddressState
        this.loadingService.closeSpinner();
      }, () => this.loadingService.closeSpinner())
  }

  onRadioGroupChanged({ target }) {
    this.selectedAddress = target.value;
  }

  onAddressFormChanged(event) {
    this.addNewAdddressForm = event;
  }
}
