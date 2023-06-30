import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AccountsService } from '@sections/dashboard/services';
import { ConfirmModule } from '@shared/confirm-modal/confirm-modal.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StCreditCardListModule } from './credit-card-mgmt/card-list/credit-card-list.module';
import { CreditCardMgmtComponent } from './credit-card-mgmt/credit-card-mgmt.component';
import { CreditCardService } from './credit-card.service';

@NgModule({
  imports: [CommonModule, IonicModule, StHeaderModule, ConfirmModule, StButtonModule, StCreditCardListModule],
  declarations: [CreditCardMgmtComponent],
  providers: [AccountsService, CreditCardService],
})
export class CreditCardModule {
}
