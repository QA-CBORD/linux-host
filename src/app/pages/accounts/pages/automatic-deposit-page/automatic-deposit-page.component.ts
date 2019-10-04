import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-automatic-deposit-page',
  templateUrl: './automatic-deposit-page.component.html',
  styleUrls: ['./automatic-deposit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutomaticDepositPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

