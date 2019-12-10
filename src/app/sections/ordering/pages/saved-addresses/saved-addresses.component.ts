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
  addNewAdddressState: boolean = false;
  addNewAdddressForm: { value: any; valid: boolean };

  constructor(
    private readonly userService: UserService,
    private readonly loader: LoadingService,
    private readonly merchantService: MerchantService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.buildings$ = this.merchantService.retrieveBuildings();
    this.initAddresses();
  }

  onAddressFormChanged(event) {
    this.addNewAdddressForm = event;
  }

  addAddress() {
    if (!this.addNewAdddressForm && !this.addNewAdddressForm.valid) return;
    this.loader.showSpinner();
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
        take(1)
      )
      .subscribe(
        ([bool, addedAddress]) => {
          this.loader.closeSpinner();
          this.userAddresses = [...this.userAddresses, addedAddress];
        },
        () => this.loader.closeSpinner()
      );
  }

  private getBuildingData$(isOncampus): Observable<any> {
    if (isOncampus) {
      return this.buildings$.pipe(
        tap(buildings => {
          const activeBuilding = buildings.find(({ addressInfo: { building } }) => building === this.addNewAdddressForm.value.building);
          const { addressInfo: { address1, address2, city, nickname, state, latitude, longitude } } = activeBuilding;
          this.addNewAdddressForm.value = {
            ...this.addNewAdddressForm.value, address1, address2, city,
            nickname, state, latitude, longitude
          };
        })
      )
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
