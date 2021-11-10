import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RoommatePreferences, RequestedRoommate, RequestedRoommateRequest, RequestedRoommateResponse } from '../../../sections/housing/applications/applications.model';
import { ModalController } from '@ionic/angular';
import { RoommateResponse } from '../../../sections/housing/roommate/roomate.model';
import { HousingService } from '../../../sections/housing/housing.service';
import { map } from 'rxjs/operators';
import { TermsService } from '../../../sections/housing/terms/terms.service';

@Component({
  selector: 'requesting-roommate-modal',
  templateUrl: './requesting-roommate-modal.component.html',
  styleUrls: ['./requesting-roommate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestingRoommateModalComponent{

  constructor(
    public _applicationsStateService: ApplicationsStateService,
    public _housingService: HousingService,
    private readonly modalController: ModalController,
    public _termService: TermsService
    ) {
    }

  @Input() requestingRoommate: RoommateResponse;

  @Input() text: string = 'Back';

  async onClickedClose() {
    // this._termService.termId$.subscribe(termId =>{
    //   const applicationDetails = this._applicationsStateService.applicationsState.applicationDetails;
    // const requestedRoommates = this._applicationsStateService.getRequestedRoommate();
    // const patronRequests = applicationDetails.roommatePreferences
    //   .filter(x => x.patronKeyRoommate !== 0)
    //   .map(x => new RequestedRoommate({
    //     preferenceKey: x.preferenceKey,
    //     patronRoommateKey: x.patronKeyRoommate 
    //   }));

    // const requestBody = new RequestedRoommateRequest({
    //   termKey: termId,
    //   patronRequests
    // });
    // this._housingService.getRequestedRoommates(requestBody).pipe(
    //   map((data: RequestedRoommateResponse) => data.requestedRoommates.map(d => {
    //     const roommatePref = applicationDetails.roommatePreferences
    //       .find(f => f.patronKeyRoommate === d.patronRoommateKey
    //         && f.preferenceKey === d.preferenceKey);

        
    //     const requestedRoommateObj = new RequestedRoommate({
    //       firstName: roommatePref ? roommatePref.firstName : '',
    //       lastName: roommatePref ? roommatePref.lastName : '',
    //       preferenceKey: d.preferenceKey,
    //       patronRoommateKey: d.patronRoommateKey,
    //       confirmed: d.confirmed,
    //       middleName: d.middleName ? d.middleName : '',
    //       birthDate: d.birthDate,
    //       preferredName: d.preferredName ? d.preferredName :''
    //     });
    //     if(!requestedRoommates.some(requested => requested.patronRoommateKey == requestedRoommateObj.patronRoommateKey )){
    //       console.log("obj--> ",requestedRoommateObj)
    //       console.log("State",this._applicationsStateService.requestedRoommates)
    //       this._applicationsStateService.setRequestedRoommate(requestedRoommateObj)
    //       return requestedRoommateObj;
    //     }

    //   }))).subscribe(()=>{
    //     // this.requestedRoommates$ = this._applicationsStateService.requestedRoommates
    //   })
    // })
    
    await this.modalController.dismiss();
  }

  acceptRoommateRequest(roommate: RoommatePreferences,index:number){
    this._applicationsStateService.addRoommatesPreferences(roommate)
    this._applicationsStateService.deleteRequestingRoommate(index)
    if(this._applicationsStateService.requestingRoommate.length == 0 ){
      this.onClickedClose();
    }
  }

  denyRoommateRequest(index:number){
    this._applicationsStateService.deleteRequestingRoommate(index)
    if(this._applicationsStateService.requestingRoommate.length == 0 ){
      this.onClickedClose();
    }
  }
}
