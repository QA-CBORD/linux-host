import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/service/user-service/user.service';
import { AddressInfo } from '@core/model/address/address-info';
import { Observable, of, zip, iif } from 'rxjs';
import { tap, switchMap, take } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering/services';
import { BuildingInfo } from '@sections/ordering/shared/models';

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

  constructor(
    private readonly userService: UserService,
    private readonly loader: LoadingService,
    private readonly merchantService: MerchantService
  ) {}

  ngOnInit() {}

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
      return this.buildings$.pipe(
        tap(buildings => {
          const activeBuilding = buildings.find(
            ({ addressInfo: { building } }) => building === this.addNewAddressForm.value.building
          );
          const {
            addressInfo: { address1, address2, city, nickname, state, latitude, longitude },
          } = activeBuilding;
          this.addNewAddressForm.value = {
            ...this.addNewAddressForm.value,
            address1,
            address2,
            city,
            state,
            latitude,
            longitude,
            nickname: `${this.addNewAddressForm.value.building}, Room ${this.addNewAddressForm.value.room}`,
          };
        })
      );
    }

    return of(true);
  }

  private initAddresses() {
    this.loader.showSpinner();
    this.userService
      .getUserAddresses()
      .pipe(
        tap(() => this.loader.closeSpinner(), () => this.loader.closeSpinner()),
        take(1)
      )
      .subscribe(addresses => {
        this.userAddresses = addresses;
      });
  }
}
