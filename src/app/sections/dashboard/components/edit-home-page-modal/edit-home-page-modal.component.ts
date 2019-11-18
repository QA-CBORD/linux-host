import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'st-edit-home-page-modal',
  templateUrl: './edit-home-page-modal.component.html',
  styleUrls: ['./edit-home-page-modal.component.scss'],
})
export class EditHomePageModalComponent implements OnInit {
  tileList = [
    { name: 'CBORD University card', checked: true },
    { name: 'Accounts', checked: false },
    { name: 'Transactions', checked: true },
    { name: 'Rewards', checked: true },
    { name: 'Mobile Access', checked: true },
    { name: 'Order', checked: true },
    { name: 'Explore', checked: true },
    { name: 'Conversation', checked: true },
  ];

  filteredList = [];

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private readonly modalController: ModalController) {}

  async onClickedDone() {
    await this.modalController.dismiss();
  }

  async onClickedClose() {
    await this.modalController.dismiss();
  }

  onToggle(event) {
    console.log(event.detail);
  }

  swap(arr, indexA, indexB) {
    let temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};


  doReorder(ev: any) {
    console.log(ev, 'Dragged from index', ev.detail.from, 'to', ev.detail.to);

    ev.detail.complete();

    this.swap(this.tileList, ev.detail.from, ev.detail.to)

    console.log(this.tileList)
  }

  ngOnInit() {}
}
