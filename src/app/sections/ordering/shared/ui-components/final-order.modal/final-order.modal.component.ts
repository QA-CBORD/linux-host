import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-final-order',
  templateUrl: './final-order.modal.component.html',
  styleUrls: ['./final-order.modal.component.scss'],
})
export class FinalOrderComponent implements OnInit {
  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {}

  async onClosed() {
    await this.modalController.dismiss();
  }
}
