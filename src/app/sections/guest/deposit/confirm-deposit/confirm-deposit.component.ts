import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { buttons } from '@core/utils/buttons.config';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'st-confirm-deposit',
  templateUrl: './confirm-deposit.component.html',
  styleUrls: ['./confirm-deposit.component.scss'],
})
export class ConfirmDepositComponent implements OnInit {

  @Input() data: { [key: string]: string | number };
  @Input() policyTitle$: Observable<string>;
  @Input() policyContent$: Observable<string>;
  @Input() buttonDonate$: Observable<string>;
  @Input() buttonCancel$: Observable<string>;
  @Input() donateAmount$: Observable<string>;
  @Input() account$: Observable<string>;
  @Input() confirmationTitle$: Observable<string>;

  popoverConfig: PopoverConfig<string | number>;
  contentString: { [key: string]: string };

  ngOnInit() {
    this.initPopover();
    this.updateConfig();
  }

  initPopover() {
    this.popoverConfig = {
      title: 'Confirm Donate',
      type: 'SUCCESS',
      buttons: [{ ...buttons.CANCEL, label: 'CANCEL' }, { ...buttons.OKAY, label: 'DONATE' }],
      message: this.data,
    };
  }

  private async updateConfig() {
    this.popoverConfig.title = await this.confirmationTitle$.pipe(first()).toPromise();
    this.popoverConfig.buttons[0].label = (await this.buttonCancel$.pipe(first()).toPromise()).toUpperCase();
    this.popoverConfig.buttons[1].label = (await this.buttonDonate$.pipe(first()).toPromise()).toUpperCase();
  }

}
