import { Component, OnInit } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { iif, Observable, of, zip } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering/services';
import { BuildingInfo } from '@sections/ordering/shared/models';
import { INSTITUTION_ADDRESS_RESTRICTIONS, ORDERING_CONTENT_STRINGS, LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings, User, PATRON_NAVIGATION } from '../../../../app.global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'st-saved-addresses',
  templateUrl: './saved-addresses.component.html',
  styleUrls: ['./saved-addresses.component.scss'],
})
export class SavedAddressesComponent implements OnInit {
  userAddresses: AddressInfo[];
  buildings$: Observable<BuildingInfo[]>;
  errorState = false;
  addNewAdddressState = false;
  addNewAddressForm: { value: any; valid: boolean } = { value: null, valid: false };
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  defaultAddress: string;
  relativeRoute: string;

  constructor(
    private readonly loader: LoadingService,
    private readonly merchantService: MerchantService,
    private readonly orderingService: OrderingService,
    private readonly userFacadeService: UserFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initContentStrings();
    this.initRelativeRoute();
  }

  ionViewWillEnter() {
    this.buildings$ = this.merchantService.retrieveBuildings();
    this.initAddresses();
  }

  changeAddNewAdddressState() {
    this.addNewAdddressState = !this.addNewAdddressState;
  }

  async navigate(url: PATRON_NAVIGATION | string): Promise<void> {
    await this.router.navigate([url]);
  }

  onAddressFormChanged(event) {
    this.addNewAddressForm = event;
    this.errorState = false;
  }

  onAddressSelected(address: AddressInfo) {
    this.merchantService.selectedAddress = address;
    this.router.navigate([this.relativeRoute, LOCAL_ROUTING.addressEdit]);
  }
  addAddress() {
    //Check if Address Form is Valid.
    if ((this.errorState = !this.addNewAddressForm.valid)) return;

    this.loader.showSpinner();

    //Structure Request Info
    this.getBuildingData$(parseInt(this.addNewAddressForm.value.campus))
      .pipe(
        switchMap(() => {
          //Make the Add Request to Service
          return this.merchantService.updateUserAddress(this.addNewAddressForm.value);
        }),
        switchMap(addedAddress =>
          zip(
            iif(
              () => this.addNewAddressForm.value.default,
              this.settingsFacadeService.saveUserSetting(User.Settings.DEFAULT_ADDRESS, addedAddress['id']),
              of(false)
            ),
            of(addedAddress)
          )
        ),
        take(1),
        finalize(() => this.loader.closeSpinner())
      )
      .subscribe(([success, addedAddress]) => {
        //Set Default Address.
        if (this.addNewAddressForm.value.default) {
          this.defaultAddress = addedAddress['id'];
          this.initAddresses();
        } else {
          this.userAddresses = [addedAddress, ...this.userAddresses];
        }

        this.addNewAdddressState = !this.addNewAdddressState;
      });
  }

  //GetBuilding Data
  private getBuildingData$(isOncampus: number): Observable<any> {
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
      this.settingsFacadeService.getSetting(Settings.Setting.ADDRESS_RESTRICTION),
      this.settingsFacadeService.getUserSetting(User.Settings.DEFAULT_ADDRESS),
      this.userFacadeService.getUserAddresses$()
    )
      .pipe(
        finalize(() => this.loader.closeSpinner()),
        take(1)
      )
      .subscribe(([{ value }, defaultAddressId, addresses]) => {
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
        this.defaultAddress = defaultAddressId.value;
      });
  }

  private initContentStrings() {
    this.contentStrings.buttonCancel = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonCancel
    );
    this.contentStrings.buttonSave = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonSave);
    this.contentStrings.labelAddNewAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelAddNewAddress
    );
    this.contentStrings.labelSavedAddresses = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelSavedAddresses
    );
    this.contentStrings.labelRoom = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelRoom);
  }

  private async initRelativeRoute() {
    const routeData = await this.route.data.pipe(take(1)).toPromise();
    this.relativeRoute = routeData.relativeRoute;
  } 
}
