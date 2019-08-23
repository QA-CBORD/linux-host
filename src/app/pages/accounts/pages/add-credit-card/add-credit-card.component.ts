import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'st-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.scss'],
})
export class AddCreditCardComponent implements OnInit {

  ccForm: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onFormSubmit() {
console.log(this.ccForm)
  }

  private initForm() {
    this.ccForm = this.fb.group({
      cardNumber: [''],
      expDate: [''],
      securityCode: ['', Validators.required],
      nameOnCC: ['', Validators.required],
      billingAnddress: [''],
      zip: ['']
    });
  }
}
