import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RewardsPopoverComponent } from '../rewards-popover/rewards-popover.component';

@Component({
  selector: 'st-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() environment: string;
  @Input() item;

  constructor(private readonly popoverCtrl: PopoverController) {}

  ngOnInit() {}

  isHistoryEnv(): boolean {
    return this.environment === 'history';
  }

  async openPopover(data) {
    const popover = await this.popoverCtrl.create({
      component: RewardsPopoverComponent,
      componentProps: {
        data: { ...data },
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ data }) => {
      if (data === 'REDEEM') {
        const scanItem = {
          ...this.item,
          scan: true,
          code: '12321asd',
        };
        this.openPopover(scanItem);
      }
    });

    return await popover.present();
  }
}
