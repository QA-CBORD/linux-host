import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/service/user-service/user.service';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantService } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { take, map } from 'rxjs/operators';
import { of, zip, iif } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'st-address-edit-page',
  templateUrl: './address-edit.page.html',
  styleUrls: ['./address-edit.page.scss'],
})
export class AddressEditPage implements OnInit {
  
  addressData:AddressInfo;
  addNewAdddressState: boolean = false;
  addNewAdddressForm: { value: any; valid: boolean };
  merchantId: string;

  constructor(private readonly router: Router, 
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly userService: UserService
    ) { }

  ngOnInit() {
    this.addressData = this.userService.selectedAddress;
    // this.merchantId = this.userService.
  }

  addressSelected(){
    // const nextPage = this.defineResolution() ? LOCAL_ROUTING.accountDetails : LOCAL_ROUTING.accountDetailsM;
    // debugger;
    // this.router.navigate([`${NAVIGATE.accounts}/${nextPage}/${ALL_ACCOUNTS}`], { skipLocationChange: true });
  }

  onAddressFormChanged(event) {
    console.log(event);
    // debugger;
    this.addNewAdddressForm = event;
  }

  addAddress() {
    if (!this.addNewAdddressForm && !this.addNewAdddressForm.valid) return;
    this.loadingService.showSpinner();
    debugger
    this.merchantService.updateUserAddress(this.addNewAdddressForm.value)
      .pipe(
        switchMap((addedAddress): any => zip(
          iif(
            () => this.addNewAdddressForm.value.default,
            this.userService.saveUserSettingsBySettingName('defaultaddress', addedAddress.id),
            of(false)
          ),
          of(addedAddress),
        )),
        switchMap(([isDefaultAddressAdded, addedAddress]) => this.merchantService.filterDeliveryAddresses(this.merchantId, [addedAddress])),
        take(1)
      )
      .subscribe(([addedAddress]) => {
        this.loadingService.closeSpinner();
        if (addedAddress) {
          //this.listOfAddresses = [...this.listOfAddresses, addedAddress];
          this.cdRef.detectChanges();
        }
      }, () => this.loadingService.closeSpinner())
  }
}
