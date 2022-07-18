import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { PATRON_NAVIGATION } from 'src/app/app.global';

@Component({
  selector: 'st-payment-modal',
  templateUrl: './successful-attachment-modal.component.html',
  styleUrls: ['./successful-attachment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessAttachmentModal implements OnInit {
  @Input() data: any;
  @Input() contentString: any;

  constructor(private readonly modalController: ModalController, private readonly route: Router) {}

  ngOnInit(): void {
    this.setContentString();
  }

  async onDoneClicked() {
    await this.route.navigate([PATRON_NAVIGATION.housing, LOCAL_ROUTING.dashboard]);
    await this.modalController.dismiss();
  }

  async newAttachmentClicked() {
    await this.route.navigate([PATRON_NAVIGATION.housing, LOCAL_ROUTING.attachments]);
    await this.modalController.dismiss();
  }

  private setContentString() {
    this.contentString = {
      title: 'File Uploaded Successfully.',
      subtitle: 'Congrats! Your File was successfully uploaded to the system.',
    };
  }
}