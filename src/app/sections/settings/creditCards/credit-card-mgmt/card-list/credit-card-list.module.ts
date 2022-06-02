import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AccountsService } from '@sections/dashboard/services';
import { ConfirmModule } from '@shared/confirm-modal/confirm-modal.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { CardListComponent as CreditCardListComponent } from './credit-card-list.component';

@NgModule({
  imports: [CommonModule, IonicModule, StHeaderModule, ConfirmModule, StButtonModule],
  declarations: [CreditCardListComponent],
  providers: [AccountsService],
  exports: [CreditCardListComponent],
})
export class StCreditCardListModule {
}
