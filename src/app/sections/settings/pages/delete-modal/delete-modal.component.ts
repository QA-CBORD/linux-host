import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonCard, IonButton, IonCardContent, IonIcon, IonCardHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'st-delete-modal',
  standalone: true,
  imports: [IonCardHeader, IonIcon, IonCardContent, IonButton, IonCard, ],
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
