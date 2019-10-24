import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'st-address-edit-page',
  templateUrl: './address-edit.page.html',
  styleUrls: ['./address-edit.page.scss'],
})
export class AddressEditPage implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  addressSelected(){
    // const nextPage = this.defineResolution() ? LOCAL_ROUTING.accountDetails : LOCAL_ROUTING.accountDetailsM;

    // this.router.navigate([`${NAVIGATE.accounts}/${nextPage}/${ALL_ACCOUNTS}`], { skipLocationChange: true });
  }

  onAddressFormChanged(event) {
    console.log(event);
    debugger;
    // this.addNewAdddressForm = event;
  }
}
