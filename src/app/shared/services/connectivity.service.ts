import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { ConnectionService } from './connection-service';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { ROLES } from 'src/app/app.global';


@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(
    private connectionService: ConnectionService,
    private readonly router: Router,
    private ngZone: NgZone
  ) { }

  isOpened(): boolean {
    return this.router.url.includes(ANONYMOUS_ROUTES.noConnectivity);
  }

  async handleConnectionError(handler: RetryHandler) {
    if (this.isOpened()) {
      this.connectionService.modalRefreshHandle.next(true);
    } else {
      return await this.showConnectivityIssuePage(handler);
    }
  }

  private async showConnectivityIssuePage(retryHandler: RetryHandler) {
    this.ngZone.run(() => this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.noConnectivity], { replaceUrl: true }).then(() => this.connectionService.retrySubject.next(retryHandler)));
  }

}
