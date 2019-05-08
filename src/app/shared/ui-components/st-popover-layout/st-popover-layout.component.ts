import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverConfig } from '../../../core/model/popover/popover.model';

@Component({
  selector: 'st-popover-layout',
  templateUrl: './st-popover-layout.component.html',
  styleUrls: ['./st-popover-layout.component.scss'],
})
export class StPopoverLayoutComponent implements OnInit {
  @Input() popoverConfig: popoverConfig;

  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {}

  async closeModal(closeModal = 'CANCEL') {
    await this.popoverCtrl.dismiss(closeModal);
  }
}
