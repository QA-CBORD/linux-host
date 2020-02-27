import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MerchantService } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { UserService } from '@core/service/user-service/user.service';
import { take, switchMap, tap } from 'rxjs/operators';
import { of, zip, iif, Observable } from 'rxjs';
import { AddressInfoExpanded } from '../../models/address-info-expanded';
import { getAddressSubHeader, getAddressHeader } from '@core/utils/address-helper';
import { AddressInfo } from '@core/model/address/address-info';
import { BuildingInfo } from '@sections/ordering/shared/models';

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

  buildings$: Observable<BuildingInfo[]>;
  addNewAdddressState: boolean = false;
  addNewAdddressForm: { value: any; valid: boolean } = { value: null, valid: false };
  errorState: boolean = false;
  selectedAddress: AddressInfo;
  listOfAddresses: Array<AddressInfoExpanded>;
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
    this.buildings$ = this.merchantService.retrieveBuildings();
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
    this.getBuildingData$(parseInt(this.addNewAdddressForm.value.campus))
      .pipe(
        switchMap(() => this.merchantService.updateUserAddress(this.addNewAdddressForm.value)),
        switchMap(
          (addedAddress): any =>
            zip(
              iif(
                () => this.addNewAdddressForm.value.default,
                this.userService.saveUserSettingsBySettingName('defaultaddress', addedAddress['id']),
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
            this.listOfAddresses = [
              ...this.listOfAddresses,
              {
                onCampus: addedAddress.onCampus,
                id: addedAddress.id,
                item: addedAddress,
                checked: false,
                displayHeader: getAddressHeader(addedAddress),
                displaySubheader: getAddressSubHeader(addedAddress),
              },
            ];
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

  private defineListOfAddresses(defaultAddress: AddressInfo): AddressInfoExpanded[] {
    const listOfAddresses = this.isOrderTypePickup ? this.pickupLocations : this.deliveryAddresses;
    this.addressLabel = this.isOrderTypePickup ? 'Pickup' : 'Delivery';
    return listOfAddresses.map(ad => {
      const addressInfo = this.isOrderTypePickup ? ad.addressInfo : ad;
      return {
        onCampus: addressInfo.onCampus,
        id: addressInfo.id,
        item: addressInfo,
        checked: defaultAddress && addressInfo.id === defaultAddress.id,
        displayHeader: getAddressHeader(addressInfo),
        displaySubheader: getAddressSubHeader(addressInfo),
      };
    });
  }

  private getBuildingData$(isOncampus): Observable<any> {
    if (isOncampus) {
      return this.buildings$.pipe(
        tap(buildings => {
          const activeBuilding = buildings.find(
            ({ addressInfo: { building } }) => building === this.addNewAdddressForm.value.building
          );
          const {
            addressInfo: { address1, address2, city, state, latitude, longitude },
          } = activeBuilding;
          this.addNewAdddressForm.value = {
            ...this.addNewAdddressForm.value,
            address1,
            address2,
            city,
            state,
            latitude,
            longitude,
            nickname: `${this.addNewAdddressForm.value.building}, Room ${this.addNewAdddressForm.value.room}`,
          };
        })
      );
    }

    return of(true);
  }
}
