import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { GUEST_ROUTES } from '@sections/section.config';
import { ROLES, User } from 'src/app/app.global';

interface Recipient {
  id: string;
  firstName: string;
  lastNam: string;
}

@Component({
  selector: 'st-identify-recipient',
  templateUrl: './identify-recipient.component.html',
  styleUrls: ['./identify-recipient.component.scss'],
})
export class IdentifyRecipientComponent implements OnInit {
  newRecepientForm: FormGroup;

  newRecepientFormRef = {
    firstName: {
      fieldName: 'firstName',
      control: new FormControl('', Validators.required),
    },
    lastName: {
      fieldName: 'lastName',
      control: new FormControl('', Validators.required),
    },
    id: {
      fieldName: 'id',
      control: new FormControl('', Validators.required),
    },
    dob: {
      fieldName: 'dob',
      control: new FormControl('', Validators.required),
    },
  };
  saveNewRecipient: boolean;
  selectedRecipient: Recipient;

  someoneElseRecipient: Recipient = {
    id: '-1',
    firstName: 'Someone',
    lastNam: 'else',
  };
  constructor(private readonly fb: FormBuilder,
    private readonly guestDepositsService: GuestDepositsService,  private readonly router: Router) { 
    this.newRecepientForm = this.fb.group({
      [this.newRecepientFormRef.firstName.fieldName]: this.newRecepientFormRef.firstName.control,
      [this.newRecepientFormRef.lastName.fieldName]: this.newRecepientFormRef.lastName.control,
      [this.newRecepientFormRef.id.fieldName]: this.newRecepientFormRef.id.control,
      [this.newRecepientFormRef.dob.fieldName]: this.newRecepientFormRef.dob.control,
    });
  } 

  ngOnInit() {
  }

  continue() {
    const fullName =`${this.newRecepientFormRef.firstName.fieldName}  ${this.newRecepientFormRef.lastName.fieldName}`;
    console.log('Fullname: ', fullName)
    this.guestDepositsService.setGuestDepositData('12345', fullName);
    this.router.navigate([ROLES.guest, GUEST_ROUTES.addFunds]);
  }
}
