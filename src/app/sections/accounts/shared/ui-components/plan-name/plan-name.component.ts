import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'st-plan-name',
  standalone: true,
  imports: [IonItem, TranslateModule, CommonModule],

  templateUrl: './plan-name.component.html',
  styleUrl: './plan-name.component.scss',
})
export class PlanNameComponent {
  @Input() flexDirection: string;
  private readonly accountService = inject(AccountService);
  planName$ = this.accountService.planName$;
}
