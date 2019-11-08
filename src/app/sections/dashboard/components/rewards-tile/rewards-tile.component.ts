import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-rewards-tile',
  templateUrl: './rewards-tile.component.html',
  styleUrls: ['./rewards-tile.component.scss'],
})
export class RewardsTileComponent implements OnInit {

  levelInfo = {
    level: 1,
    name: "Padavan"
  };
  width = 50;
  expToNextLvl = "50/100XP";
  points= 2000;

  constructor() { }

  ngOnInit() {}

}
