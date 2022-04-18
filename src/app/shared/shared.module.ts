import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NoConnectivityScreen } from "./no-connectivity-screen/no-connectivity-screen";
import { StButtonModule } from "./ui-components/st-button";
import { StHeaderModule } from "./ui-components/st-header/st-header.module";

@NgModule({
    declarations: [NoConnectivityScreen],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        CommonModule,
        IonicModule,
        StHeaderModule,
        StButtonModule,
    ],
    providers: []
})
export class SharedModule { }