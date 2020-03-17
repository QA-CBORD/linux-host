import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/service/user-service/user.service';
import { AddressInfo } from '@core/model/address/address-info';
import { iif, Observable, of, zip } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering/services';
import { BuildingInfo } from '@sections/ordering/shared/models';
import {
  INSTITUTION_ADDRESS_RESTRICTIONS,
  ORDERING_CONTENT_STRINGS,
  SYSTEM_SETTINGS_CONFIG,
} from '@sections/ordering/ordering.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';

@Component({
  selector: 'st-saved-addresses',
  templateUrl: './saved-addresses.component.html',
  styleUrls: ['./saved-addresses.component.scss'],
})
export class SavedAddressesComponent implements OnInit {
  userAddresses: AddressInfo[];
  buildings$: Observable<BuildingInfo[]>;
  errorState: boolean = false;
  addNewAdddressState: boolean = false;
  addNewAddressForm: { value: any; valid: boolean } = { value: null, valid: false };
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly userService: UserService,
    private readonly loader: LoadingService,
    private readonly merchantService: MerchantService,
    private readonly orderingService: OrderingService
  ) {}

  ngOnInit() {
    this.initContentStrings();
  }

  ionViewWillEnter() {
    this.buildings$ = this.merchantService.retrieveBuildings();
    this.initAddresses();
  }

  onAddressFormChanged(event) {
    this.addNewAddressForm = event;
    this.errorState = false;
  }

  addAddress() {
    if (!this.addNewAddressForm.valid) {
      this.errorState = true;
      return;
    }
    this.loader.showSpinner();
    this.getBuildingData$(parseInt(this.addNewAddressForm.value.campus))
      .pipe(
        switchMap(() => this.merchantService.updateUserAddress(this.addNewAddressForm.value)),
        switchMap(
          (addedAddress): any =>
            zip(
              iif(
                () => this.addNewAddressForm.value.default,
                this.userService.saveUserSettingsBySettingName('defaultaddress', addedAddress['id']),
                of(false)
              ),
              of(addedAddress)
            )
        ),
        take(1)
      )
      .subscribe(
        ([bool, addedAddress]) => {
          this.loader.closeSpinner();
          this.userAddresses = [...this.userAddresses, addedAddress];
          this.addNewAdddressState = !this.addNewAdddressState;
        },
        () => this.loader.closeSpinner()
      );
  }

  private getBuildingData$(isOncampus): Observable<any> {
    if (isOncampus) {
      return zip(this.buildings$, this.contentStrings.labelRoom).pipe(
        tap(([buildings, labelRoom]) => {
          const activeBuilding = buildings.find(
            ({ addressInfo: { building } }) => building === this.addNewAddressForm.value.building
          );
          const {
            addressInfo: { address1, address2, city, state, latitude, longitude },
          } = activeBuilding;
          this.addNewAddressForm.value = {
            ...this.addNewAddressForm.value,
            address1,
            address2,
            city,
            state,
            latitude,
            longitude,
            nickname: `${this.addNewAddressForm.value.building}, ${labelRoom} ${this.addNewAddressForm.value.room}`,
          };
        })
      );
    }

    return of(true);
  }

  private initAddresses() {
    this.loader.showSpinner();
    zip(
      this.merchantService.getSettingByConfig(SYSTEM_SETTINGS_CONFIG.addressRestrictionToOnCampus),
      this.userService.getUserAddresses()
    )
      .pipe(
        finalize(() => this.loader.closeSpinner()),
        take(1)
      )
      .subscribe(([{ value }, addresses]) => {
        const institutionRestriction = parseInt(value);
        const filteredByInstitution = addresses.filter(({ onCampus }) => {
          if (institutionRestriction === INSTITUTION_ADDRESS_RESTRICTIONS.onCampus) {
            return onCampus;
          }
          if (institutionRestriction === INSTITUTION_ADDRESS_RESTRICTIONS.offCampus) {
            return !onCampus;
          }
        });

        this.userAddresses = !institutionRestriction ? addresses : filteredByInstitution;
      });
  }

  private initContentStrings() {
    this.contentStrings.buttonCancel = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonCancel);
    this.contentStrings.buttonClose = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonClose);
    this.contentStrings.buttonSave = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonSave);
    this.contentStrings.labelAddNewAddress =
      this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelAddNewAddress);
    this.contentStrings.labelSavedAddresses = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelSavedAddresses);
    this.contentStrings.labelRoom = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelRoom);
  }
}
