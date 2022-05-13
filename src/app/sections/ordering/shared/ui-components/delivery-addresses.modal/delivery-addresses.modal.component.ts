import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MerchantService } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { iif, Observable, of, zip } from 'rxjs';
import { AddressInfoExpanded } from '../../models/address-info-expanded';
import { getAddressHeader, getAddressSubHeader } from '@core/utils/address-helper';
import { AddressInfo } from '@core/model/address/address-info';
import { BuildingInfo } from '@sections/ordering/shared/models';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { User } from '../../../../../app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

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
  addNewAdddressState = false;
  addNewAdddressForm: { value: any; valid: boolean } = { value: null, valid: false };
  errorState = false;
  selectedAddress: AddressInfo;
  listOfAddresses: Array<AddressInfoExpanded>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly orderingService: OrderingService,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

  ngOnInit() {
    this.listOfAddresses = this.defineListOfAddresses(this.defaultAddress);
    this.buildings$ = this.merchantService.retrieveBuildings();
    this.initContentStrings();
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
                this.settingsFacadeService.saveUserSetting(User.Settings.DEFAULT_ADDRESS, addedAddress['id']),
                of(false)
              ),
              of(addedAddress)
            )
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      return zip(this.buildings$, this.contentStrings.labelRoom).pipe(
        tap(([buildings, labelRoom]) => {
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
            nickname: `${this.addNewAdddressForm.value.building}, ${labelRoom} ${this.addNewAdddressForm.value.room}`,
          };
        })
      );
    }

    return of(true);
  }

  private initContentStrings() {
    this.contentStrings.buttonCancel = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonCancel
    );
    this.contentStrings.buttonSave = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonSave);
    this.contentStrings.buttonSetDeliveryAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonSetDeliveryAddress
    );
    this.contentStrings.buttonSetPickupAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonSetPickupAddress
    );
    this.contentStrings.labelAddNewAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelAddNewAddress
    );
    this.contentStrings.labelSelectDeliveryAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelSelectDeliveryAddress
    );
    this.contentStrings.labelSelectPickupAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelSelectPickupAddress
    );
    this.contentStrings.labelRoom = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelRoom);
  }
}
