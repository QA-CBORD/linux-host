import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/check-in-content-string.model';

@Component({
  selector: 'st-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {

  @Input() titleString: string;

  @Input() bodyString: string;

  @Input() primaryBtnText: string;

  @Input() secondaryBtnText: string;

  @Input() primaryBtnColor: string;

  @Input() secondaryBtnColor: string;

  @Input() onClickSecondary: Function;

  @Input() onClickPrimary: Function;

  @Input() primaryBtnDisabled: boolean = false;

  @Input() secondaryBtnDisabled: boolean = false;

  @Output() onPrimaryBtnClicked: EventEmitter<any> = new EventEmitter<Event>();;

  @Output() onSecondaryBtnClicked: EventEmitter<any> = new EventEmitter<Event>();;


  @Input() contentStrings: CheckingContentCsModel;
  @Input() locationPermissionDisabled: boolean;

  constructor(protected readonly popoverCtrl: PopoverController,) {}

  ngOnInit() {}

  async onScanCode() {
    await this.popoverCtrl.dismiss({
      handler: 'onScanCode',
    });
  }

  async onLocationCheckinClicked() {
    this.popoverCtrl.dismiss({
      handler: 'onLocationCheckinClicked',
    });
  }

  closeMe(){
     this.popoverCtrl.dismiss();
  }
}