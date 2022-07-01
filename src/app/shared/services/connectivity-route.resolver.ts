import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { LoadingService } from "@core/service/loading/loading.service";
import { ContentStringApi, ContentStringCategory } from "@shared/model/content-strings/content-strings-api";
import { ConnectivityScreentDefaultStrings } from "@shared/model/content-strings/default-strings";
import { ConnectivityPageInfo } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";
import { ConnectivityErrorType, ConnectivityScreenCsModel } from "@shared/ui-components/no-connectivity-screen/model/no-connectivity.cs.model";
import { firstValueFrom } from "@shared/utils";
import { Observable } from "rxjs";
import { CommonService } from "./common.service";
import { ConnectionService } from "./connection-service";
import { Location } from '@angular/common';

@Injectable()
export class ConnectivityPageResolver implements Resolve<ConnectivityPageInfo> {

    constructor(
        private readonly commonService: CommonService,
        private loadingService: LoadingService,
        private connectionService: ConnectionService,
        private readonly location: Location) { }


    resolve(route: ActivatedRouteSnapshot): Observable<ConnectivityPageInfo> | Promise<ConnectivityPageInfo> {
        return this.resolveData(route.queryParams).finally(() => this.loadingService.closeSpinner());
    }

    private async resolveData(queryParams): Promise<ConnectivityPageInfo> {
        await this.loadingService.showSpinner();
        let csModel: ConnectivityScreenCsModel = {} as any;
        let errorType: ConnectivityErrorType;
        let freshContentStringsLoaded = false;
        const isDeviceOffline = await this.connectionService.deviceOffline();
        if (isDeviceOffline) {
            errorType = ConnectivityErrorType.DEVICE_CONNECTION;
            csModel = ContentStringApi[ContentStringCategory.noConnectivity].build({ params: ConnectivityScreentDefaultStrings });
        } else {
            errorType = ConnectivityErrorType.SERVER_CONNECTION;
            csModel = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
            freshContentStringsLoaded = true;
        }

        console.log("queryParams ::: ", queryParams)
        return { csModel, freshContentStringsLoaded, errorType, ...queryParams, isVaultLocked: JSON.parse(queryParams.isVaultLocked) }
    }

}