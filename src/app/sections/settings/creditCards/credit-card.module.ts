import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AccountsService } from "@sections/dashboard/services";
import { ConfirmModule } from "@shared/confirm-modal/confirm-modal.module";
import { StButtonModule } from "@shared/ui-components/st-button";
import { StHeaderModule } from "@shared/ui-components/st-header/st-header.module";
import { CardsComponent } from "./credit-card-mgmt/cards/cards.component";
import { CreditCardMgmtComponent } from "./credit-card-mgmt/credit-card-mgmt.component";
import { CreditCardService } from "./credit-card.service";



@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      StHeaderModule,
      ConfirmModule,
      StButtonModule,
    ],
    declarations: [
        CreditCardMgmtComponent, CardsComponent
    ],
    entryComponents: [
        CreditCardMgmtComponent
    ],
    providers: [
      AccountsService, CreditCardService
    ],
    exports: [CardsComponent]
  })
  export class CreditCardModule {
    constructor() {}
  }
