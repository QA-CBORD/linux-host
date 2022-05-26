import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ScanCardModule } from "@sections/dashboard/containers/scan-card/scan-card.module";
import { ANONYMOUS_ROUTES } from "../non-authorized/non-authorized.config";
import { ConnectivityPageResolver } from "./services/connectivity-route.resolver";
import { ConnectivityScreen } from "./ui-components/no-connectivity-screen/connectivity-screen";
import { StButtonModule } from "./ui-components/st-button";
import { StHeaderModule } from "./ui-components/st-header/st-header.module";


@NgModule({
    declarations: [ConnectivityScreen],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StHeaderModule,
        StButtonModule,
        RouterModule.forChild([{
            path: '',
            redirectTo: ANONYMOUS_ROUTES.noConnectivity,
            pathMatch: 'full'
        }]),
        ScanCardModule,
    ],
    providers: [ConnectivityPageResolver]
})
export class ConnectivityModule { }