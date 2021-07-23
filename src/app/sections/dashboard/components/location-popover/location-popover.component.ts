import { Component, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { buttons } from '@core/utils/buttons.config';

@Component({
  selector: 'st-location-popover',
  templateUrl: './location-popover.component.html',
  styleUrls: ['./location-popover.component.scss'],
})
export class LocationPermissionPopover implements OnInit {
  
  popoverConfig: PopoverConfig<string>;

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    this.popoverConfig = {
      title: 'Menu not available',
      type: 'SUCCESS',
      buttons: [{ ...buttons.NO, label: 'NO' }, { ...buttons.OKAY, label: 'YES' }],
      message: 'Do you want to proceed with a new menu (according to selected time)?',
    };
  }
}
