import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'st-check-in-failure',
  templateUrl: './check-in-failure.component.html',
  styleUrls: ['./check-in-failure.component.scss'],
})
export class CheckInFailureComponent implements OnInit {
  @Input() contentStrings = <any>{};
  @Input() orderId: string;
  @Input() errorMessage: string;
  @Input() checkNumber: number;
  displayPlayMessage: any;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {
    this.displayPlayMessage = this.contentStrings.get_closer;
    if (this.errorMessage && this.errorMessage.includes('early')) {
      this.displayPlayMessage = this.contentStrings.too_early;
    }
  }

  async onBack() {
    await this.modalController.dismiss();
  }

  onScanCode() {
      this.modalController.dismiss({ scancode: true });
  }
}
