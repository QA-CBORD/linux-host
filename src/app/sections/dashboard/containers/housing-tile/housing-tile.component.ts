import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-housing-tile',
  templateUrl: './housing-tile.component.html',
  styleUrls: ['./housing-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousingTileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
