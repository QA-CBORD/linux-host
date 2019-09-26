import { Component, OnInit, Input } from '@angular/core';
import { TileInfo } from '../../models';

@Component({
  selector: 'st-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
})
export class TileListComponent implements OnInit {

  @Input('tileInfoArray') tileInfo: TileInfo[];


  constructor() { }

  ngOnInit() {}

}
