import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/user-service/user.service';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileAccessService } from '../service/mobile-access.service';
import { CoordsService } from '../../../core/service/coords/coords.service';
import * as Globals from '../../../app.global';
import { Events, PopoverController } from '@ionic/angular';
import { ExceptionProvider } from '../../../core/provider/exception-provider/exception.provider';
import { Location } from '@angular/common';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-activate-location',
  templateUrl: './activate-location.component.html',
  styleUrls: ['./activate-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateLocationComponent implements OnInit {
  private readonly spinnerMessage = 'Activating locations...';
  photoUrl: Observable<string>;
  locationId: string;
  coords: any;

  constructor(
    private readonly userService: UserService,
    private readonly routerLink: ActivatedRoute,
    private readonly mobileAccessService: MobileAccessService,
    private readonly geoDataService: CoordsService,
    private readonly events: Events,
    private readonly popoverCtrl: PopoverController,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit() {
    this.photoUrl = this.userService
      .getAcceptedPhoto()
      .pipe(map(({ data, mimeType }) => `data:${mimeType};base64,${data}`));
    this.locationId = this.routerLink.snapshot.params.id;
    this.geoDataService.initCoords().subscribe(data => (this.coords = data));
  }

  activateLocation() {
    this.activatingHandler(true);

    this.mobileAccessService
      .activateMobileLocation(this.locationId, this.coords)
      .pipe(tap(() => this.activatingHandler()))
      .subscribe(({ responseCode: s, message }) => this.activatingModal(message, s !== '00'));
  }

  private activatingHandler(started: boolean = false) {
    const start = {
      bShow: true,
      message: this.spinnerMessage,
    };
    const stop = { bShow: false };

    const loaderArgs = started ? start : stop;

    this.events.publish(Globals.Events.LOADER_SHOW, loaderArgs);
  }

  private activatingModal(message: string, error: boolean = false) {
    const successTittle = 'Success!';
    const errorTittle = 'Fail!';

    const title = error ? errorTittle : successTittle;

    ExceptionProvider.showException(this.events, {
      displayOptions: Globals.Exception.DisplayOptions.ONE_BUTTON,
      messageInfo: {
        title,
        message,
        positiveButtonTitle: 'OK',
        positiveButtonHandler: () => {
          this.closeModal();
        },
      },
    });
  }

  closeModal() {
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
    this.location.back();
  }
}
