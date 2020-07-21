import { Component, OnInit } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { iif, Observable, of, zip } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering/services';
import { BuildingInfo } from '@sections/ordering/shared/models';
import { INSTITUTION_ADDRESS_RESTRICTIONS, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings, User } from '../../../../app.global';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

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
    private readonly loader: LoadingService,
    private readonly merchantService: MerchantService,
    private readonly orderingService: OrderingService,
    private readonly userFacadeService: UserFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly globalNav: GlobalNavService
  ) {}

  ngOnInit() {
    this.initContentStrings();
    this.globalNav.hideNavBar();
  }

  ngOnDestroy() {
    this.globalNav.showNavBar();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter, retrieveBuildings');
    this.buildings$ = this.merchantService.retrieveBuildings();
    console.log('ionViewWillEnter, retrieveBuildings End');
    this.initAddresses();
    console.log('ionViewWillEnter, InitAddresses End');
  }

  changeAddNewAdddressState() {
    console.log('changeaddNewAdddressState');
    this.addNewAdddressState = !this.addNewAdddressState;
  }

  onAddressFormChanged(event) {
    console.log('onAddressFormChanged');
    this.addNewAddressForm = event;
    this.errorState = false;
  }

  addAddress() {
    console.log('Add Adress');
    if (!this.addNewAddressForm.valid) {
      this.errorState = true;

      console.log('Add Adress, Invalid Error State');
      return;
    }

    console.log('Add Adress, Spinner');

    this.loader.showSpinner();

    console.log('Add Adress, getBuildingData');

    this.getBuildingData$(parseInt(this.addNewAddressForm.value.campus))
      .pipe(
        switchMap(() => {
          console.log('Add Adress, updateUserAddress');

          return this.merchantService.updateUserAddress(this.addNewAddressForm.value);
        }),
        switchMap(
          (addedAddress): any => {
            console.log('Add Adress, saveUserSetting start Zip');

            zip(
              iif(
                () => this.addNewAddressForm.value.default,
                this.settingsFacadeService.saveUserSetting(User.Settings.DEFAULT_ADDRESS, addedAddress['id']),
                of(false)
              ),
              of(addedAddress)
            );

            console.log('Add Adress, saveUserSetting, endZip');
          }
        ),
        take(1)
      )
      .subscribe(
        ([bool, addedAddress]) => {
          console.log('Close Spinner');
          this.loader.closeSpinner();
          this.userAddresses = [...this.userAddresses, addedAddress];
          this.addNewAdddressState = !this.addNewAdddressState;
        },
        () => this.loader.closeSpinner()
      );
  }

  private getBuildingData$(isOncampus): Observable<any> {
    console.log('getBuildingData, isOncampus:', isOncampus);

    if (isOncampus) {
      return zip(this.buildings$, this.contentStrings.labelRoom).pipe(
        tap(([buildings, labelRoom]) => {
          console.log('getBuildingData, Tap:');

          const activeBuilding = buildings.find(
            ({ addressInfo: { building } }) => building === this.addNewAddressForm.value.building
          );

          console.log('getBuildingData, activeBuilding:', activeBuilding);

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
    console.log('initAddresses, showSpinner');
    this.loader.showSpinner();
    zip(
      this.settingsFacadeService.getSetting(Settings.Setting.ADDRESS_RESTRICTION),
      this.userFacadeService.getUserAddresses$()
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
}
