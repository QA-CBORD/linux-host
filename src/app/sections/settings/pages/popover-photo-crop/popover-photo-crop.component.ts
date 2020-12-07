import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  templateUrl: './popover-photo-crop.component.html',
  styleUrls: ['./popover-photo-crop.component.scss'],
})
export class PopoverCropComponent {

  constructor(private popoverController: PopoverController) { }

dismissModal(){
    this.popoverController.dismiss();
  }
}
