import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { buildPasswordValidators, InputValidator } from 'src/app/password-validation/models/input-validator.model';
import { ContentStringApi } from '@shared/model/content-strings/content-strings-api';
import { PasswordChangeCsModel } from './password-change-content-strings.model';

@Component({
  selector: 'st-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PasswordChangeComponent implements OnInit {
  @Input() contentStrings: [ContentStringInfo[]];
  changePasswordForm: FormGroup;
  isLoading = false;
  validators: InputValidator[] = [];
  passwordControl: any = {};
  inputLabel: PasswordChangeCsModel;
  
  constructor(
    private readonly modalController: ModalController,
    private readonly fb: FormBuilder,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toast: ToastService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initControl();
  }

  ionViewWillEnter() { 
    this.loadingService.showSpinner();
    this.setContentStrings();
  }

  ionViewDidEnter() {
    this.loadingService.closeSpinner();
  }

  close() {
    this.modalController.dismiss();
  }

  async changePassword() {
    let resultMessage = 'Your password was changed successfully.';
    this.isLoading = true;
    this.userFacadeService
      .changePassword$(this.currentPassword.value, this.newPassword.value)
      .pipe(
        take(1),
        catchError(error => {
          if(error) {
          const NO_ERROR_CODE_SIDE = 1;
          resultMessage = `${error.toString().split('|')[NO_ERROR_CODE_SIDE]}. Please try again.`;
          } else {
            resultMessage = 'Something went wrong. Please try again.';
          }
          return of(false);
        })
      )
      .subscribe(async response => {
        await this.toast.showToast({ message: resultMessage });
        this.isLoading = false;
        this.cdRef.detectChanges();
        if (response) {
          this.close();
        }
      });
  }

  get currentPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.currentPassword);
  }

  get newPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.newPassword);
  }

  get controlsNames() {
    return PASSWORD_FORM_CONTROL_NAMES;
  }

  get passwordControls() {
    return this.passwordControl;
  }

  get disabled() {
    return this.changePasswordForm.invalid || this.passwordControl.hasError;
  }

  private initForm() {
    this.changePasswordForm = this.fb.group({
      [PASSWORD_FORM_CONTROL_NAMES.currentPassword]: ['', Validators.required],
      [PASSWORD_FORM_CONTROL_NAMES.newPassword]: ['', Validators.required],
    });
  }

  private setContentStrings() {
    this.inputLabel = ContentStringApi.changePassword(this.contentStrings.pop());
    this.validators = buildPasswordValidators(this.contentStrings.pop());
  }

  private initControl() {
    this.passwordControl = { control: this.newPassword, hasError: false };
  }
}

export enum PASSWORD_FORM_CONTROL_NAMES {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
}