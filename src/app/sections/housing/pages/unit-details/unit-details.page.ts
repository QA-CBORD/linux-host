import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable,  } from 'rxjs';

import { Unit } from '@sections/housing/unit/unit.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roomate.model';
import { HousingService } from '@sections/housing/housing.service';
import { RoomsService } from '@sections/housing/rooms/rooms.service';
import { ToastService } from '@core/service/toast/toast.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { AlertController } from '@ionic/angular';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'st-unit-details',
  templateUrl: './unit-details.page.html',
  styleUrls: ['./unit-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsPage implements OnInit {
  private isExpanded = false;
  constructor(
    private _route: ActivatedRoute,
    private _stateService: RoomsStateService,
    private _roomsService: RoomsService,
    private _housingService: HousingService,
    private _termsService: TermsService,
    private _toastService: ToastService,
    private _alertController: AlertController,
  ) {}

  unit: Unit;
  occupants$: Observable<FacilityOccupantDetails[]>;
  ngOnInit() {
    const facilityKey = parseInt(this._route.snapshot.paramMap.get('buildingKey'), 10);
    const unitKey = parseInt(this._route.snapshot.paramMap.get('unitKey'), 10);
    this.unit = this._stateService.getUnitDetails(facilityKey, unitKey);
    if (this.roommatesExists()) {
      const activeRoomSelect = this._stateService.getActiveRoomSelect();
      this.occupants$ = this._housingService.getOccupantDetails(activeRoomSelect.key, unitKey);
    }
  }
  private roommatesExists() {
    return Array.isArray(this.unit.occupantKeys) && this.unit.occupantKeys.length > 0;
  }
  adjustExpander(): void {
    if (this.isExpanded) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }

  async requestRoom() {

        this._termsService.termId$.pipe(
          debounceTime(800),
          take(1)
        ).subscribe(
          async termKey => {
        const request = {
          facilityKey: this.unit.key,
          assetKey: null,
          termKey: termKey,
          isFacility: true,
          isAssetType: false,
          startDate: null,
          endDate: null,
        };
        const alert = await this._alertController.create({
          header: 'Confirm',
          message: 'Are you sure you want this room?',
          buttons: [
            {
              text: 'NO',
              role: 'cancel',
              cssClass: 'button__option_cancel',
              handler: () => {
                console.log('Confirm Cancel');
                alert.dismiss();
              },
            },
            {
              text: 'YES',
              role: 'confirm',
              cssClass: 'button__option_confirm',
              handler: () => {
                this._roomsService.postContractRequest(request).subscribe(successfullyCreated => {
                      if (successfullyCreated) {
                        //route back to housing dashboard
                        alert.dismiss().then(() => this._housingService.handleSuccess());
                  } else {
                        alert.dismiss().then(() => {
                          console.log('Assignment for patron was not successful. This unit might be full.')
                          this._toastService.showToast({
                            message: "Oops this unit is not available",
                          });
                        })
                      }
                });
              },
            },
          ],
        });
        await alert.present();
      });
  }
}
