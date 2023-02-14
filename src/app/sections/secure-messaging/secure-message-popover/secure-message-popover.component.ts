import { Component, OnInit, Input } from '@angular/core';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from '../../../core/utils/buttons.config';

@Component({
  selector: 'secure-message-popover',
  templateUrl: './secure-message-popover.component.html',
  styleUrls: ['./secure-message-popover.component.scss'],
})
export class SecureMessagePopoverComponent implements OnInit {
  @Input() data: {message: string, title: string};

  popoverConfig: PopoverConfig<string>;
  contentString: { [key: string]: string };

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    const { message, title } = this.data;

    this.popoverConfig = {
      ...this.popoverConfig,
      title,
      message,
      buttons: this.configureButtons(),
    };
  }

  configureButtons() {
    return [{ ...buttons.CLOSE, label: 'CLOSE' }, { ...buttons.RETRY, label: 'RETRY' }];
  }
}
