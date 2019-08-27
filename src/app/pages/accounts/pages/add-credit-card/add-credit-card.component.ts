import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'st-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.scss'],
})
export class AddCreditCardComponent implements OnInit {
  ccForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  get cardNumberControl() {
    return this.ccForm.get('cardNumber');
  }

  get expDateControl() {
    return this.ccForm.get('expDate');
  }

  get securityCodeControl() {
    return this.ccForm.get('securityCode');
  }

  get nameOnCCControl() {
    return this.ccForm.get('nameOnCC');
  }

  get billingAnddressControl() {
    return this.ccForm.get('billingAnddress');
  }

  get zipControl() {
    return this.ccForm.get('zip');
  }

  onFormSubmit() {
    console.log(this.ccForm);
  }

  private initForm() {
    this.ccForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expDate: ['', Validators.required],
      securityCode: ['', Validators.required],
      nameOnCC: ['', Validators.required],
      billingAnddress: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  getCardType(number) {
    // visa
    var re = new RegExp('^4');
    if (number.match(re) != null) return 'Visa';

    // Mastercard
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)
    )
      return 'Mastercard';

    // AMEX
    re = new RegExp('^3[47]');
    if (number.match(re) != null) return 'AMEX';

    // Discover
    re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
    if (number.match(re) != null) return 'Discover';

    // Visa Electron
    re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
    if (number.match(re) != null) return 'Visa Electron';

    return '';
  }
}
