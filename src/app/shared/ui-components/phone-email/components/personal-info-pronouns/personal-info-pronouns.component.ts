import { Component, inject, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, skipWhile, takeUntil } from 'rxjs';

enum FORM_CONTROL_NAMES {
  subjective = 'subjective',
  objective = 'objective',
  possessive = 'possessive',
}

@Component({
  selector: 'st-personal-info-pronouns',
  standalone: true,
  imports: [CommonModule, IonicModule, StInputFloatingLabelModule, ReactiveFormsModule],
  templateUrl: './personal-info-pronouns.component.html',
  styleUrls: ['./personal-info-pronouns.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonalInfoPronounsComponent),
      multi: true,
    },
  ],
})
export class PersonalInfoPronounsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private readonly destroy$ = new Subject<void>();

  private readonly formBuilder = inject(FormBuilder);
  personalInfoPronounsForm = this.formBuilder.group({
    [this.controlsNames.subjective]: [''],
    [this.controlsNames.objective]: [''],
    [this.controlsNames.possessive]: [''],
  });
  private onChange: (value: string) => void;
  private onTouched: () => void;

  get controlsNames() {
    return FORM_CONTROL_NAMES;
  }

  get subjective(): AbstractControl {
    return this.personalInfoPronounsForm.get(this.controlsNames.subjective);
  }

  get objective(): AbstractControl {
    return this.personalInfoPronounsForm.get(this.controlsNames.objective);
  }

  get possessive(): AbstractControl {
    return this.personalInfoPronounsForm.get(this.controlsNames.possessive);
  }

  ngOnInit(): void {
    this.personalInfoPronounsForm.valueChanges
      .pipe(
        skipWhile(() => !this.onChange),
        takeUntil(this.destroy$)
      )
      .subscribe(({ subjective, objective, possessive }) => {
        const pronounsArray = [subjective, objective, possessive].map(pronoun => pronoun?.trim().toLowerCase());
        this.onChange(pronounsArray.join(','));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(pronouns: string): void {
    // Set the value of the form controls based on the provided value
    if (pronouns) {
      const [subjective = '', objective = '', possessive = ''] = pronouns.split(',');
      this.personalInfoPronounsForm.patchValue({ subjective, objective, possessive }, { emitEvent: false });
    } else {
      this.personalInfoPronounsForm.reset();
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.personalInfoPronounsForm.disable();
    } else {
      this.personalInfoPronounsForm.enable();
    }
  }
}
