import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RoommatePreferences } from '../../../sections/housing/applications/applications.model';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { HousingService } from '../../../sections/housing/housing.service';
import { TermsService } from '../../../sections/housing/terms/terms.service';
import { Subscription } from 'rxjs';
import { isMobile } from '@core/utils/platform-helper';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'requesting-roommate-modal',
  templateUrl: './requesting-roommate-modal.component.html',
  styleUrls: ['./requesting-roommate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestingRoommateModalComponent implements OnInit, OnDestroy{
  private _subscription: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];

  constructor(
    public _applicationsStateService: ApplicationsStateService,
    private _termService: TermsService,
    private readonly modalController: ModalController,
    public _housingService: HousingService,
    private _alertController: AlertController,
    private _platform: Platform,
    private _loadingService: LoadingService
    ) {
      this.checkIfLastRequest()
    }
  
  ngOnInit(): void {
    if (isMobile(this._platform)) {
      this._subscription = this._platform.pause.subscribe(() => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this.checkIfLastRequest()
  }

  @Input() requestingRoommate: RoommatePreferences[];

  @Input() text = 'Back';

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  async onClickedClose() {
    this._subscription.add(
      this._termService.termId$.subscribe(termId => 
        this._housingService.getRequestedRommate(termId).subscribe()));

    await this.modalController.dismiss();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async acceptRoommateRequest(roommate: RoommatePreferences,index:number){
    if (this._applicationsStateService.roommatePreferencesSelecteds.find( value => value.patronKeyRoommate !== roommate.patronKeyRoommate && value.patronKeyRoommate != 0 && value.preferenceKey === roommate.preferenceKey)){
      const alert = await this._alertController.create({
        header: 'Confirm Override',
        message: `By accepting ${roommate.firstName} ${roommate.lastName} as your roommate you will override your existing selection. Are you sure you want to continue?`,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'button__option_cancel',
            handler: () => {
              this.activeAlerts = [];
              alert.dismiss();
            },
          },
          {
            text: 'YES',
            role: 'confirm',
            cssClass: 'button__option_confirm',
            handler: () => {
              // this._loadingService.showSpinner();
              this.activeAlerts = [];
              this._applicationsStateService.deleteRequestingRoommate(roommate.patronKeyRoommate);
              this._applicationsStateService.addRoommatesPreferences(roommate, true);
              this._applicationsStateService.deleteOverrideRequestingRoommate(roommate.preferenceKey, roommate.patronKeyRoommate)
              this._applicationsStateService.deleteLocalRequestedRoommate(roommate.preferenceKey,roommate.patronKeyRoommate);
              this.checkIfLastRequest();
            },
          },
        ],
      });
      this.activeAlerts.push(alert);
      await alert.present();
    } else { // todo: if it works, remove else and extract to method
      this._applicationsStateService.deleteRequestingRoommate(roommate.patronKeyRoommate);
      this._applicationsStateService.addRoommatesPreferences(roommate);
      this.checkIfLastRequest();
    }
  }

  private checkIfLastRequest() {
    if(this._applicationsStateService.requestingRoommate.length == 0 && this.requestingRoommate.length == 0 ){
      this.onClickedClose();
    }
  }

  denyRoommateRequest(index:number){
    this._applicationsStateService.deleteRequestingRoommate(index);
    this.checkIfLastRequest();
  }
}
