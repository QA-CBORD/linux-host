import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AccountsService } from "@sections/dashboard/services";
import { StHeaderModule } from "@shared/ui-components/st-header/st-header.module";
import { CreditCardMgmtComponent } from "./credit-card-mgmt/credit-card-mgmt.component";



@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      StHeaderModule
    ],
    declarations: [
        CreditCardMgmtComponent
    ],
    entryComponents: [
        CreditCardMgmtComponent
    ],
    providers: [
      AccountsService
    ]
  })
  export class CreditCardModule {
    constructor() {}
  }