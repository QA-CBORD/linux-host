import { Component, OnInit } from '@angular/core';
import { NavModalPage } from '../nav-modal-page/nav-modal-page.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-menu-ordering',
  templateUrl: './menu-ordering.component.html',
  styleUrls: ['./menu-ordering.component.scss'],
})
export class MenuOrderingComponent implements OnInit {
  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {}

  async openModalPage() {
    const modal = await this.modalController.create({
      component: NavModalPage,
      animated: true,
      componentProps: {
        title: 'Recent Orders',
        list: [1, 2, 3],
      },
    });
    modal.onDidDismiss().then(({ data }) => console.log(data));

    await modal.present();
  }
}
