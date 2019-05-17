import { Component, Input } from '@angular/core';

@Component({
  selector: 'st-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
  @Input() points: number;
}
