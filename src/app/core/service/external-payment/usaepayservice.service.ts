import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { USAePayResponse } from '@core/model/add-funds/usaepay-response.model';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

enum browserEvent {
  LOADING = 'loadstart',
  ERROR = 'loaderror',
}

enum urlStatus {
  COMPLETE = 'action_complete',
  SUCCESSFUL = 'action_complete=1',
  FAILED = 'error=',
}

@Injectable()

export class USAePayService {
  browserOptions: InAppBrowserOptions = {
    usewkwebview: 'yes',
    toolbarposition: 'top',
    closebuttoncaption: 'Back',
    location: 'no',
    hidenavigationbuttons: 'yes',
    toolbarcolor: '#ffffff',
  };

  constructor(
    private inAppBrowser: InAppBrowser,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly toastService: ToastService
  ) {}
  
  /* WKWebView is the required webview by Apple  */

  addUSAePayCreditCard(): Promise<USAePayResponse> {
    return new Promise<USAePayResponse>((resolve, reject) => {
      const authToken$ = this.authFacadeService.getAuthenticationToken$().pipe(take(1));
      const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
      forkJoin([authToken$, institutionInfo$]).subscribe(([authToken, institutionInfo]) => {
          const browser = this.navigateToUSAePaySite(authToken, institutionInfo.shortName);
          browser.on(browserEvent.LOADING).subscribe(response => {
              const url = response.url;
              if (url.includes(urlStatus.COMPLETE)) {
                if (url.includes(urlStatus.SUCCESSFUL)) {
                  resolve(<USAePayResponse>{ success: true });
                } else if (url.includes(urlStatus.FAILED)) {
                  const errorMessage = new URLSearchParams(url).get('error');
                  this.onUSAePayCallBackRetrieve(`Your request failed: ${errorMessage}. Please try again.`);
                  reject();
                }
                browser.close();
              }
          });
        },
        error => {
          reject({ success: false, errorMessage: `The request failed: ${error}` });
        }
      );
    });
  }

  private navigateToUSAePaySite(authToken: string, shortName: string) {
    const target = '_blank';
    const url = `${this.environmentFacadeService.getSitesURL()}/${shortName}/full/add_card_mobile.php?session_token=${authToken}`;
    const options = this.browserOptions;
    return this.inAppBrowser.create(url, target, options);
  }

  private async onUSAePayCallBackRetrieve(message: string) {
    await this.toastService.showToast({ message });
  }
}
