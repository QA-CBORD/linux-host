import { Component, OnInit, Input } from '@angular/core';
import { TileInfo } from '../../../models';

@Component({
  selector: 'st-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() tileInfo: TileInfo;

  constructor() { }

  ngOnInit() {}

}
