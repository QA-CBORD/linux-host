import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RoommatePreferences } from '../../../sections/housing/applications/applications.model';
import { AlertController, ModalController } from '@ionic/angular';
import { HousingService } from '../../../sections/housing/housing.service';
import { TermsService } from '../../../sections/housing/terms/terms.service';
import { switchMap, take } from 'rxjs';
@Component({
  selector: 'requesting-roommate-modal',
  templateUrl: './requesting-roommate-modal.component.html',
  styleUrls: ['./requesting-roommate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestingRoommateModalComponent implements OnInit {

  @Input() requestingRoommate: RoommatePreferences[] = [];

  constructor(
    public _applicationsStateService: ApplicationsStateService,
    private _termService: TermsService,
    private modalController: ModalController,
    public _housingService: HousingService,
    private _alertController: AlertController,
  ) {}

  ngOnInit(): void {
    this.checkIfLastRequest();
  }

  async onClose() {
    this._termService.termId$
      .pipe(
        switchMap(termId => {
          return this._housingService.getRequestedRommate(termId);
        }),
        take(1)
      )
      .subscribe();
    await this.modalController.dismiss();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async acceptRoommateRequest(roommate: RoommatePreferences) {
    if (
      this._applicationsStateService.roommatePreferencesSelecteds.find(
        value =>
          value.patronKeyRoommate !== roommate.patronKeyRoommate &&
          value.patronKeyRoommate != 0 &&
          value.preferenceKey === roommate.preferenceKey
      )
    ) {
      const alert = await this._alertController.create({
        header: 'Confirm Override',
        message: `By accepting ${roommate.firstName} ${roommate.lastName} as your roommate you will override your existing selection. Are you sure you want to continue?`,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'button__option_cancel',
            handler: () => {
              alert.dismiss();
            },
          },
          {
            text: 'YES',
            role: 'confirm',
            cssClass: 'button__option_confirm',
            handler: () => {
              this._applicationsStateService.deleteRequestingRoommate(roommate.patronKeyRoommate);
              this._applicationsStateService.addRoommatesPreferences(roommate, true);
              this._applicationsStateService.deleteOverrideRequestingRoommate(
                roommate.preferenceKey,
                roommate.patronKeyRoommate
              );
              this._applicationsStateService.deleteLocalRequestedRoommate(
                roommate.preferenceKey,
                roommate.patronKeyRoommate
              );
              this.checkIfLastRequest();
              this.modalController.dismiss();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this._applicationsStateService.deleteRequestingRoommate(roommate.patronKeyRoommate);
      this._applicationsStateService.addRoommatesPreferences(roommate);
      this.checkIfLastRequest();
    }
  }

  private checkIfLastRequest() {
    if (this._applicationsStateService.requestingRoommate.length == 0 && this.requestingRoommate.length == 0) {
      this.onClose();
    }
  }

  denyRoommateRequest(roommate: RoommatePreferences) {
    this._applicationsStateService.deleteRequestingRoommate(roommate.patronKeyRoommate);
    this.checkIfLastRequest();
  }

  studentFullName = (roomate:RoommatePreferences) => `${roomate.firstName} ${roomate.lastName}`
}
