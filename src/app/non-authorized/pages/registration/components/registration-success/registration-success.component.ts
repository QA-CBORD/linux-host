import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'st-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss'],
})
export class RegistrationSuccessComponent implements OnInit {
  title$: Observable<string>;
  message$: Observable<string>;
  @Input() pageContent: { dismissBtnText?: string; resendEmailBtnText?: string; title?; message? } = {};

  constructor(private readonly modalCtrl: ModalController) {}

  ngOnInit() {
    this.title$ = of(this.pageContent.title);
    this.message$ = of(this.pageContent.message);
  }

  async dismiss(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  onDecline(): void{
    this.dismiss();
  }
}
