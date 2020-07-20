import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'st-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal(){
    await this.modalController.dismiss();
  }

  deletePhoto(){
    alert('This is where the api call will delete photo from DB and then eventually update the photo upload page accordingly');
    this.dismissModal();
  }

}
