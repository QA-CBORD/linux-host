import { Component, inject, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subject, skipWhile, takeUntil } from 'rxjs';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { customActionSheetOptions } from '@shared/constants/picker.constant';

enum FORM_CONTROL_NAMES {
  subjective = 'subjective',
  objective = 'objective',
  possessive = 'possessive',
}

@Component({
  selector: 'st-personal-info-pronouns',
  standalone: true,
  imports: [CommonModule, IonicModule, StSelectFloatingLabelModule, ReactiveFormsModule, FocusNextModule],
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
  customActionSheetOptions = customActionSheetOptions;

  private readonly formBuilder = inject(FormBuilder);
  personalInfoPronounsForm = this.formBuilder.group({
    [FORM_CONTROL_NAMES.subjective]: [''],
    [FORM_CONTROL_NAMES.objective]: [''],
    [FORM_CONTROL_NAMES.possessive]: [''],
  });

  readonly pronounsControls = [
    {
      label: 'Subjective',
      controlName: FORM_CONTROL_NAMES.subjective,
      control: this.personalInfoPronounsForm.get(FORM_CONTROL_NAMES.subjective),
      pronounsList: ['They', 'He', 'She'],
    },
    {
      label: 'Objective',
      controlName: FORM_CONTROL_NAMES.objective,
      control: this.personalInfoPronounsForm.get(FORM_CONTROL_NAMES.objective),
      pronounsList: ['Them', 'Him', 'Her'],
    },
    {
      label: 'Possessive',
      controlName: FORM_CONTROL_NAMES.possessive,
      control: this.personalInfoPronounsForm.get(FORM_CONTROL_NAMES.possessive),
      pronounsList: ['Their', 'His', 'Her'],
    },
  ];

  private onChange: (value: string) => void;
  private onTouched: () => void;

  ngOnInit(): void {
    this.personalInfoPronounsForm.valueChanges
      .pipe(
        skipWhile(() => !this.onChange),
        takeUntil(this.destroy$)
      )
      .subscribe(({ subjective, objective, possessive }) => {
        const pronounsArray = [subjective, objective, possessive].map(pronoun => pronoun?.trim());
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
