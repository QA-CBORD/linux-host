import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'st-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.scss'],
})
export class AddCreditCardComponent implements OnInit {
  ccForm: FormGroup;
  cardType: string = '';
  private inputKeyCode: number;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();

    this.cardNumberControl.valueChanges.subscribe(value => {
      if (value.length === 16) return;
      this.cardType = this.getCardType(value.replace(/\s/g, ''));
      if (this.inputKeyCode !== 8) {
        this.cardNumberControl.patchValue(value.replace(/(\d{4}(?!\s))/g, '$1 '), { emitEvent: false });
      }
    });

    this.expDateControl.valueChanges.subscribe(value => {
      if (this.inputKeyCode !== 8) {
        this.expDateControl.patchValue(this.formatString(value), { emitEvent: false });
      }
    });
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

  onInputFieldClicked({ keyCode }) {
    this.inputKeyCode = keyCode;
  }

  private initForm() {
    this.ccForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      expDate: ['', Validators.required, Validators.minLength(5)],
      securityCode: ['', [Validators.required, Validators.minLength(3)]],
      nameOnCC: ['', Validators.required],
      billingAnddress: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  private getCardType(number) {
    // visa
    var re = new RegExp('^4');
    if (number.match(re) != null) return 'Visa';

    // Mastercard
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)
    )
      return 'Mastercard';

    return '';
  }

  private formatString(string) {
    return string
      .replace(/^([1-9]\/|[2-9])$/g, '0$1/')
      .replace(/^(0[1-9]{1}|1[0-2]{1})$/g, '$1/')
      .replace(/^([0-1]{1})([3-9]{1})$/g, '0$1/$2')
      .replace(/^(\d)\/(\d\d)$/g, '0$1/$2')
      .replace(/^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g, '$1/$2')
      .replace(/^([0]{1,})\/|[0]{1,}$/g, '0')
      .replace(/[^\d\/]|^[\/]{0,}$/g, '')
      .replace(/\/\//g, '/');
  }
}
