import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { StButtonModule } from "@shared/ui-components/st-button";
import { ConfirmModalComponent } from "./confirm-modal.component";

@NgModule({
    declarations: [ConfirmModalComponent],
    imports: [
        IonicModule,
        StButtonModule
    ],
    exports: [ConfirmModalComponent],
})
export class ConfirmModule { }
