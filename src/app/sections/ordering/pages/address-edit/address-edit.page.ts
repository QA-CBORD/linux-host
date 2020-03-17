import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MerchantService } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { map, take, tap } from 'rxjs/operators';
import { iif, Observable, of, zip } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { ConfirmPopoverComponent } from '@sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component';
import { BUTTON_TYPE, buttons } from '@core/utils/buttons.config';
import { PopoverController } from '@ionic/angular';
import { UserService } from '@core/service/user-service/user.service';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';

@Component({
  selector: 'st-address-edit-page',
  templateUrl: './address-edit.page.html',
  styleUrls: ['./address-edit.page.scss'],
})
export class AddressEditPage implements OnInit {
  addressData: any;
  addNewAdddressState: boolean = false;
  addNewAddressForm: { value: any; valid: boolean } = { value: null, valid: false };
  merchantId: string;
  buildings$: Observable<any[]>;
  defaultAddress$: Observable<string>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly popoverCtrl: PopoverController,
    private readonly userService: UserService,
    private readonly orderingService: OrderingService
  ) {}

  ngOnInit() {
    this.initContentStrings();
  }

  ionViewWillEnter() {
    this.buildings$ = this.merchantService.retrieveBuildings();
    this.defaultAddress$ = this.merchantService.getDefaultAddress().pipe(map(({ value }) => value));
    zip(this.buildings$, this.merchantService.selectedAddress$)
      .pipe(
        map(([buildings, address]) => {
          const activeBuilding = buildings.find(({ addressInfo }) => addressInfo.building === address.building);
          return {
            activeBuilding,
            address,
          };
        }),
        take(1)
      )
      .subscribe(address => {
        this.addressData = address;
      });
  }

  onBack() {
    this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.savedAddresses], { skipLocationChange: true });
  }

  onRemove() {
    this.presentAlert();
  }

  private async presentAlert(): Promise<void> {
    const addressData = this.addressData.address;
    const address = `${addressData.address1}, ${addressData.city}, ${addressData.state}`;
    const modal = await this.popoverCtrl.create({
      component: ConfirmPopoverComponent,
      componentProps: {
        data: {
          message: `Are you sure you want to remove: ${address}`,
          title: 'Remove Address?',
          buttons: [{ ...buttons.CANCEL, label: 'CANCEL' }, { ...buttons.REMOVE, label: 'REMOVE' }],
        },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(({ role }) => {
      role === BUTTON_TYPE.REMOVE &&
        this.merchantService
          .removeAddress(addressData.id)
          .pipe(take(1))
          .subscribe(() =>
            this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.savedAddresses], { skipLocationChange: true })
          );
    });
    await modal.present();
  }

  onAddressFormChanged(event) {
    this.addNewAddressForm = event;
  }

  addAddress() {
    if (this.addNewAddressForm && this.addNewAddressForm.value && !this.addNewAddressForm.valid) {
      return;
    }
    if (this.addNewAddressForm && !this.addNewAddressForm.value && !this.addNewAddressForm.valid) {
      this.onBack();
      return;
    }
    this.loadingService.showSpinner();
    this.getBuildingData$(parseInt(this.addNewAddressForm.value.campus))
      .pipe(
        switchMap(() => this.merchantService.updateUserAddress(this.addNewAddressForm.value)),
        switchMap(
          (addedAddress): any =>
            zip(
              iif(
                () => this.addNewAddressForm.value.default,
                this.userService.saveUserSettingsBySettingName('defaultaddress', addedAddress.id),
                of(false)
              ),
              of(addedAddress)
            )
        ),
        take(1)
      )
      .subscribe(
        () => {
          this.merchantService.selectedAddress = null;
          this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.savedAddresses], { skipLocationChange: true });
          this.addNewAdddressState = !this.addNewAdddressState;
        },
        null,
        () => this.loadingService.closeSpinner()
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

  private initContentStrings() {
    this.contentStrings.buttonSave = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonSave);
    this.contentStrings.labelRoom = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelRoom);
  }
}
