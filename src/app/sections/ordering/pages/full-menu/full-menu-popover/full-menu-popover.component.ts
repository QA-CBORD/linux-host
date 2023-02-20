import { Component, OnInit, Input } from '@angular/core';
import { StPopoverComponentDataModel } from '@shared/model/st-popover-data.model';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';

@Component({
  selector: 'full-menu-popover',
  templateUrl: './full-menu-popover.component.html',
  styleUrls: ['./full-menu-popover.component.scss'],
})
export class FullMenuPopoverComponent implements OnInit {
  @Input() data: StPopoverComponentDataModel;

  popoverConfig: PopoverConfig<string>;
  contentString: { [key: string]: string };

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
