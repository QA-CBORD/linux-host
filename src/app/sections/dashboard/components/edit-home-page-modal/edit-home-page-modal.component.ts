import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-edit-home-page-modal',
  templateUrl: './edit-home-page-modal.component.html',
  styleUrls: ['./edit-home-page-modal.component.scss'],
})
export class EditHomePageModalComponent implements OnInit {

  constructor(private readonly modalController: ModalController) { }

  async onClickedDone() {
    await this.modalController.dismiss();
  }

  ngOnInit() {}

}
