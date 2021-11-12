import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RoommatePreferences } from '../../../sections/housing/applications/applications.model';
import { ModalController } from '@ionic/angular';
import { RoommateResponse } from '../../../sections/housing/roommate/roomate.model';
import { HousingService } from '../../../sections/housing/housing.service';
import { TermsService } from '../../../sections/housing/terms/terms.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'requesting-roommate-modal',
  templateUrl: './requesting-roommate-modal.component.html',
  styleUrls: ['./requesting-roommate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestingRoommateModalComponent implements OnDestroy{
  private _subscription: Subscription = new Subscription();

  constructor(
    private _applicationsStateService: ApplicationsStateService,
    private _termService: TermsService,
    private readonly modalController: ModalController,
    private _housingService: HousingService) {
    }

  @Input() requestingRoommate: RoommateResponse;

  @Input() text: string = 'Back';

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  async onClickedClose() {
    this._subscription.add(
      this._termService.termId$.subscribe(termId => 
        this._housingService.getRequestedRommate(termId).subscribe()));

    await this.modalController.dismiss();
  }

  acceptRoommateRequest(roommate: RoommatePreferences,index:number){
    this._applicationsStateService.addRoommatesPreferences(roommate);
    this._applicationsStateService.deleteRequestingRoommate(index);

    if(this._applicationsStateService.requestingRoommate.length == 0 ){
      this.onClickedClose();
    }
  }

  denyRoommateRequest(index:number){
    this._applicationsStateService.deleteRequestingRoommate(index);

    if(this._applicationsStateService.requestingRoommate.length == 0 ){
      this.onClickedClose();
    }
  }
}
