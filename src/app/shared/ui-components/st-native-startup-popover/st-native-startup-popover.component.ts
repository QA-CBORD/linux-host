import { Component, OnInit, Input } from '@angular/core';
import { StPopoverComponentDataModel } from '@shared/model/st-popover-data.model';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';

@Component({
  selector: 'st-native-startup-popover',
  templateUrl: './st-native-startup-popover.component.html',
  styleUrls: ['./st-native-startup-popover.component.scss'],
})
export class StNativeStartupPopoverComponent implements OnInit {
  @Input() data: StPopoverComponentDataModel;

  popoverConfig: PopoverConfig<string>;
  contentString: { [key: string]: string };

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    const { message, title, buttons } = this.data;

    this.popoverConfig = {
      ...this.popoverConfig,
      title,
      message,
      buttons,
    };
  }
}
