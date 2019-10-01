import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { TileInfo } from '../../models';

@Component({
  selector: 'st-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileListComponent implements OnInit {

  @Input() tileInfoArray: TileInfo[] = [];


  constructor() { }

  ngOnInit() {}

}
