import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { HousingService } from '../../../sections/housing/housing.service';
import { TermsService } from '../../../sections/housing/terms/terms.service';
import { RequestedRoommate, RequestedRoommateResponse, RequestedRoommateRequest, RoommatePreferences } from '../../../sections/housing/applications/applications.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { RoommateResponse } from '../../../sections/housing/roommate/roomate.model';

@Component({
  selector: 'requesting-roommate-modal',
  templateUrl: './requesting-roommate-modal.component.html',
  styleUrls: ['./requesting-roommate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestingRoommateModalComponent{

  constructor(
    public _applicationsStateService: ApplicationsStateService,
    private readonly modalController: ModalController
    ) {
    }

  @Input() requestingRoommate: RoommateResponse;

  @Input() text: string = 'Back';

  requestedRoommates$: Observable<RequestedRoommate[]>;

  async onClickedClose() {
    await this.modalController.dismiss();
  }

  acceptRoommateRequest(roommate: RoommatePreferences,index:number){
    this._applicationsStateService.addRoommatesPreferences(roommate)
    this._applicationsStateService.deleteRequestingRoommate(index)
    if(this._applicationsStateService.requestingRoommate.length == 0 ){
      this.onClickedClose();
    }
  }

  denyRoommateRequest(){

  }
}
