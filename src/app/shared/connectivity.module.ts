import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ConnectivityPageResolver } from "./services/connectivity-route.resolver";
import { NoConnectivityScreen } from "./ui-components/no-connectivity-screen/no-connectivity-screen";
import { StButtonModule } from "./ui-components/st-button";
import { StHeaderModule } from "./ui-components/st-header/st-header.module";


@NgModule({
    declarations: [NoConnectivityScreen],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StHeaderModule,
        StButtonModule,
    ],
    providers: [ConnectivityPageResolver]
})
export class ConnectivityModule { }