import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private readonly modalController: ModalController,
    private readonly fb: FormBuilder,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
  }

  close() {
    this.modalController.dismiss();
  }
  
  saveChanges() {
    console.log('Save changes called!');
  }

  private initForm() {
    this.changePasswordForm = this.fb.group({
      [this.controlsNames.currentPassword]: ['', Validators.required],
      [this.controlsNames.newPassword]: ['', Validators.required],
    });
    this.cdRef.detectChanges();
  }

  get currentPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.currentPassword);
  }

  get newPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.newPassword);
  }

  get controlsNames() {
    return USERFORM_CONTROL_NAMES;
  }
}

export enum USERFORM_CONTROL_NAMES {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
}
