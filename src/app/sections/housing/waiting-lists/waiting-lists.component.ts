import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { WaitingListStateService } from './waiting-list-state.service';
import { isMobile } from '@core/utils/platform-helper';
import { Subscription } from 'rxjs';
import { ROLES } from '../../../app.global';


@Component({
  selector: 'st-waiting-lists',
  templateUrl: './waiting-lists.component.html',
  styleUrls: ['./waiting-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingListsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];
  public urlEditForm: string;

  constructor(public _waitingListStateService: WaitingListStateService,
    private _platform: Platform,
  ) { }

  ngOnInit() {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(x => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this.urlEditForm = `${ROLES.patron}/housing/waiting-lists/`
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
