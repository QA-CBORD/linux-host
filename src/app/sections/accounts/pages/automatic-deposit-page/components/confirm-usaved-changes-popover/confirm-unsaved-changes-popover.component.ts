import { Component, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { buttons } from '@core/utils/buttons.config';

@Component({
  selector: 'st-confirm-unsaved-changes-popover',
  templateUrl: './confirm-unsaved-changes-popover.component.html',
  styleUrls: ['./confirm-unsaved-changes-popover.component.scss'],
})
export class ConfirmUnsavedChangesPopoverComponent implements OnInit {
  config: PopoverConfig<string>;

  ngOnInit() {
    this.config = {
      type: PopupTypes.CANCEL,
      title: 'Unsaved changes',
      buttons: [{ ...buttons.CANCEL, label: 'no' }, { ...buttons.OKAY, label: 'yes' },],
      message: 'Your changes wont be saved, would you like to leave without saving?',
      code: '',
    };
  }
}
