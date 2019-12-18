import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MerchantService } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { UserService } from '@core/service/user-service/user.service';
import { AddressInfo } from '@core/model/address/address-info';
import { take, switchMap } from 'rxjs/operators';
import { of, zip, iif } from 'rxjs';

@Component({
  selector: 'st-delivery-addresses.modal',
  templateUrl: './delivery-addresses.modal.component.html',
  styleUrls: ['./delivery-addresses.modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryAddressesModalComponent implements OnInit {
  @Input() defaultAddress: AddressInfo;
  @Input() buildings;
  @Input() isOrderTypePickup: boolean;
  @Input() pickupLocations;
  @Input() deliveryAddresses: Array<AddressInfo>;
  @Input() merchantId: string;

  addNewAdddressState: boolean = false;
  addNewAdddressForm: { value: any; valid: boolean } = { value: null, valid: false };
  errorState: boolean = false;
  selectedAddress: AddressInfo;
  listOfAddresses: Array<AddressInfo>;
  addressLabel: string;
  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.listOfAddresses = this.defineListOfAddresses(this.defaultAddress);
  }
  async onClickedDone(selectedAddress?: AddressInfo) {
    await this.modalController.dismiss(selectedAddress);
  }

  addAddress() {
    if (!this.addNewAdddressForm.valid) {
      this.errorState = true;
      return;
    }
    this.loadingService.showSpinner();
    this.merchantService
      .updateUserAddress(this.addNewAdddressForm.value)
      .pipe(
        switchMap(
          (addedAddress): any =>
            zip(
              iif(
                () => this.addNewAdddressForm.value.default,
                this.userService.saveUserSettingsBySettingName('defaultaddress', addedAddress.id),
                of(false)
              ),
              of(addedAddress)
            )
        ),
        switchMap(([isDefaultAddressAdded, addedAddress]) =>
          this.merchantService.filterDeliveryAddresses(this.merchantId, [addedAddress])
        ),
        take(1)
      )
      .subscribe(
        ([addedAddress]) => {
          if (addedAddress) {
            this.listOfAddresses = [...this.listOfAddresses, addedAddress];
          }
          this.resetForm();
          this.cdRef.detectChanges();
        },
        null,
        () => this.loadingService.closeSpinner()
      );
  }

  onRadioGroupChanged({ target: { value } }) {
    this.selectedAddress = value;
  }

  onAddressFormChanged(event) {
    this.addNewAdddressForm = event;
    this.errorState = false;
  }

  resetForm() {
    this.addNewAdddressState = !this.addNewAdddressState;
    this.addNewAdddressForm = null;
  }

  private defineListOfAddresses(defaultAddress) {
    const listOfAddresses = this.isOrderTypePickup ? this.pickupLocations : this.deliveryAddresses;
    this.addressLabel = this.isOrderTypePickup ? 'Pickup' : 'Delivery';

    return listOfAddresses.map(item => {
      const checked = defaultAddress ? item.id == defaultAddress.id : false;

      return item.addressInfo ? item.addressInfo : { ...item, checked };
    });
  }
}
