import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantService } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { take, tap, map } from 'rxjs/operators';
import { of, zip, iif, Observable } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { ConfirmPopoverComponent } from '@sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component';
import { buttons, BUTTON_TYPE } from '@core/utils/buttons.config';
import { PopoverController } from '@ionic/angular';
import { UserService } from '@core/service/user-service/user.service';

@Component({
  selector: 'st-address-edit-page',
  templateUrl: './address-edit.page.html',
  styleUrls: ['./address-edit.page.scss'],
})
export class AddressEditPage implements OnInit {
  addressData: any;
  addNewAdddressState: boolean = false;
  addNewAdddressForm: { value: any; valid: boolean };
  merchantId: string;
  buildings$: Observable<any[]>;

  constructor(
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly popoverCtrl: PopoverController,
    private readonly userService: UserService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.buildings$ = this.merchantService.retrieveBuildings();
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
      .subscribe(({ address }) => {
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
    const address = `${this.addressData.address1}, ${this.addressData.city}, ${this.addressData.state}`;
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
        .removeAddress(this.addressData.id)
        .pipe(take(1))
        .subscribe(() =>
          this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.savedAddresses], { skipLocationChange: true })
        );
    });
    await modal.present();
  }

  onAddressFormChanged(event) {
    this.addNewAdddressForm = event;
  }

  addAddress() {
    if (!this.addNewAdddressForm && !this.addNewAdddressForm.valid) return;
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
        take(1)
      )
      .subscribe(
        () => {
          this.merchantService.selectedAddress = null;
          this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.savedAddresses], { skipLocationChange: true });
        },
        () => this.loadingService.closeSpinner()
      );
  }
}
