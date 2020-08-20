import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalNavService } from '../st-global-navigation/services/global-nav.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-phone-email',
  templateUrl: './phone-email.component.html',
  styleUrls: ['./phone-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneEmailComponent implements OnInit {
  phoneEmailForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly modalController: ModalController) {}
  ngOnInit() {
    this.initForm();
  }

  saveChanges() {}

  close() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.phoneEmailForm = this.fb.group({
      [this.controlsNames.email]: ['', Validators.required],
      [this.controlsNames.phone]: ['', Validators.required],
    });
  }
  get controlsNames() {
    return PHONE_EMAIL_CONTROL_NAMES;
  }

  get email(): AbstractControl {
    return this.phoneEmailForm.get(this.controlsNames.email);
  }

  get phone(): AbstractControl {
    return this.phoneEmailForm.get(this.controlsNames.phone);
  }
}

export enum PHONE_EMAIL_CONTROL_NAMES {
  phone = 'phone',
  email = 'email',
}
