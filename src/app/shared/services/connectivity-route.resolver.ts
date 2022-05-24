import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { LoadingService } from "@core/service/loading/loading.service";
import { ContentStringApi, ContentStringCategory } from "@shared/model/content-strings/content-strings-api";
import { noConnectivityScreentDefaultStrings } from "@shared/model/content-strings/default-strings";
import { ConnectivityPageInfo } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";
import { ConnectivityErrorType, ConnectivityScreenCsModel } from "@shared/ui-components/no-connectivity-screen/model/no-connectivity.cs.model";
import { firstValueFrom } from "@shared/utils";
import { Observable } from "rxjs";
import { CommonService } from "./common.service";
import { ConnectionService } from "./connection-service";


@Injectable()
export class ConnectivityPageResolver implements Resolve<ConnectivityPageInfo> {

    constructor(
        private readonly commonService: CommonService,
        private loadingService: LoadingService,
        private connectionService: ConnectionService) { }


    resolve(): Observable<ConnectivityPageInfo> | Promise<ConnectivityPageInfo> {
        return this.resolveData().finally(() => this.loadingService.closeSpinner());
    }


    private async resolveData(): Promise<ConnectivityPageInfo> {
        await this.loadingService.showSpinner({ duration: 80000 });
        let csModel: ConnectivityScreenCsModel = {} as any;
        let errorType: ConnectivityErrorType;
        let freshContentStringsLoaded = false;
        const isDeviceOffline = await this.connectionService.deviceOffline();
        if (isDeviceOffline) {
            errorType = ConnectivityErrorType.DEVICE_CONNECTION;
            csModel = ContentStringApi[ContentStringCategory.noConnectivity].build({ params: noConnectivityScreentDefaultStrings });
        } else {
            errorType = ConnectivityErrorType.SERVER_CONNECTION;
            csModel = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
            freshContentStringsLoaded = true;
        }

        return { csModel, freshContentStringsLoaded, errorType }
    }

}