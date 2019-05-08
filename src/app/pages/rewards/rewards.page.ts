import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  contentString: { [key: string]: string };

  constructor() {}

  ngOnInit() {
    this.contentString = {
      header: 'Rewards',
    };
  }
}
