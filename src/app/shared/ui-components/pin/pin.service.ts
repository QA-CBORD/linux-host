import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { App } from "@capacitor/app";
//import { VaultService } from "@core/service/identity/vault.identity.service";
import { LoadingService } from "@core/service/loading/loading.service";
import { ConnectionService } from "@shared/services/connection-service";
import { ConnectivityService } from "@shared/services/connectivity.service";
import { Subject, Subscription } from "rxjs";
import { ROLES } from "src/app/app.global";
import { ANONYMOUS_ROUTES } from "src/app/non-authorized/non-authorized.config";
import { PinAction } from "./pin.page";


@Injectable({
    providedIn: 'root'
})
export class CustomPinService {

    onPinResults: Subject<{ data: any, role: any }> = new Subject();


    constructor(
        private readonly loadingService: LoadingService,
        private readonly connectivityService: ConnectivityService,
        private readonly connectionService: ConnectionService,
        private readonly router: Router
    ) { }

    async navigateToPinPage(pinAction: PinAction, pinModalProps?: any): Promise<any> {
        let subscription: Subscription;
        await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.pin], { state: { pinAction, ...pinModalProps } });

        // const pluginListenerHandle = await App.addListener('backButton', (e) => {
        //      console.log('backButton evebt: does not work. ', e.canGoBack);
        // });


        try {
            return await new Promise((resolve, reject) => {
                subscription = this.onPinResults.subscribe({ next: resolve, error: reject });
            });
        } finally {
            subscription?.unsubscribe();
          //  pluginListenerHandle.remove();
        }
    }

    handleConnectionIssues() {
        this.connectivityService.handleConnectionError({
            onScanCode: async () => { },
            onRetry: async () => {
                console.log("handlePinConnectionIssues, onRetry")
                await this.loadingService.showSpinner();
                const connectionRestored = !(await this.connectionService.deviceOffline());
                await this.loadingService.closeSpinner();
                return connectionRestored;
            }
        }, true);
    }
}