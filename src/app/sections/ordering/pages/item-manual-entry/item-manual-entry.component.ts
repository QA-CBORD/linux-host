import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  templateUrl: './item-manual-entry.component.html',
  styleUrls: ['./item-manual-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemManualEntryComponent implements OnInit {
  manualEntryForm: FormGroup;

  constructor(
    private readonly globalNav: GlobalNavService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.manualEntryForm = this.fb.group({
      [this.controlsNames.code]: ['', [Validators.required]],
    });
    this.cdRef.detectChanges();
  }
  ionViewWillLeave() {
    this.globalNav.showNavBar();
  }

  ionViewWillEnter() {
    this.globalNav.hideNavBar();
  }

  continue() {}

  get controlsNames() {
    return BARCODE_CONTROL_NAMES;
  }

  get code(): AbstractControl {
    return this.manualEntryForm.get(this.controlsNames.code);
  }
}
export enum BARCODE_CONTROL_NAMES {
  code = 'code',
}
