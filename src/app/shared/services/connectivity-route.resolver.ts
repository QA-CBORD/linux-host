/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { LoadingService } from "@core/service/loading/loading.service";
import { ContentStringApi, ContentStringCategory } from "@shared/model/content-strings/content-strings-api";
import { ConnectivityScreentDefaultStrings } from "@shared/model/content-strings/default-strings";
import { ConnectivityPageInfo } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";
import { ConnectivityScreenCsModel } from "@shared/ui-components/no-connectivity-screen/model/no-connectivity.cs.model";
import { ConnectivityErrorType } from "@shared/ui-components/no-connectivity-screen/model/connectivity-error.enum";
import { firstValueFrom, Observable } from 'rxjs'
import { CommonService } from "./common.service";
import { ConnectionService } from "./connection-service";

@Injectable()
export class ConnectivityPageResolver {

    constructor(
        private readonly commonService: CommonService,
        private loadingService: LoadingService,
        private connectionService: ConnectionService) { }


    resolve(route: ActivatedRouteSnapshot): Observable<ConnectivityPageInfo> | Promise<ConnectivityPageInfo> {
        return this.resolveData(route.queryParams).finally(() => this.loadingService.closeSpinner());
    }

    private async resolveData(params: { [key: string]: any }): Promise<ConnectivityPageInfo> {
        await this.loadingService.showSpinner();
        let csModel: ConnectivityScreenCsModel;
        let freshContentStringsLoaded = false;
        const errorType = await this.connectionService.getOfflineStatus();
        if (errorType === ConnectivityErrorType.DEVICE_CONNECTION) {
            csModel = ContentStringApi[ContentStringCategory.noConnectivity].build({ params: ConnectivityScreentDefaultStrings });
        } else {
            csModel = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
            freshContentStringsLoaded = true;
        }

        return { csModel, freshContentStringsLoaded, errorType, ...params, isVaultLocked: JSON.parse(params.isVaultLocked) }
    }

}
