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

  constructor(private readonly popoverCtrl: PopoverController) {}

  ngOnInit() {}

  isHistoryEnv(): boolean {
    return this.environment === 'history';
  }

  async openPopover() {
    const data = {
      title: 'Carrot Cake',
      description: 'A mediocre cake that you might enjoy this description is longer than the other one wee wooo',
    };
    const popover = await this.popoverCtrl.create({
      component: RewardsPopoverComponent,
      componentProps: {
        data,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ data }) => {
      console.log(data);
      if (data === 'REDEEM') {
        this.openPopover();
      }
    });

    return await popover.present();
  }
}
