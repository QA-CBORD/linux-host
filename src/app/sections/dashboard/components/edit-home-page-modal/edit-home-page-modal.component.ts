import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'st-edit-home-page-modal',
  templateUrl: './edit-home-page-modal.component.html',
  styleUrls: ['./edit-home-page-modal.component.scss'],
})
export class EditHomePageModalComponent implements OnInit {
  tileList = [
    { name: 'CBORD University card' },
    { name: 'Accounts' },
    { name: 'Transactions' },
    { name: 'Rewards' },
    { name: 'Mobile Access' },
    { name: 'Order' },
    { name: 'Explore' },
    { name: 'Conversation' },
  ];

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private readonly modalController: ModalController) {}

  async onClickedDone() {
    await this.modalController.dismiss();
  }

  async onClickedClose() {
    await this.modalController.dismiss();
  }

  doReorder(ev: any) {
    
    console.log(ev, 'Dragged from index', ev.detail.from, 'to', ev.detail.to);

    ev.detail.complete();
  }

  ngOnInit() {}
}
