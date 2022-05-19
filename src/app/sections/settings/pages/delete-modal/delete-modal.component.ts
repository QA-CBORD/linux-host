import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'st-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {

  constructor(private modalController: ModalController) { }

  async dismissModal(data: boolean){
    await this.modalController.dismiss(data);
  }

  deletePhoto(){
    this.dismissModal(true);
  }

}
