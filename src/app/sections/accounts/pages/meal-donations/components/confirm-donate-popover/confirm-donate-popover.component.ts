import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'confirm-donate-popover',
  templateUrl: './confirm-donate-popover.component.html',
  styleUrls: ['./confirm-donate-popover.component.scss'],
})
export class ConfirmDonatePopoverComponent implements OnInit {
  @Input() data: { [key: string]: string | number };
  @Input() policyTitle$: Observable<string>;
  @Input() policyContent$: Observable<string>;
  @Input() buttonDonate$: Observable<string>;
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
    this.popoverConfig.buttons[1].label = (await this.buttonDonate$.pipe(first()).toPromise()).toUpperCase();
  }

}
