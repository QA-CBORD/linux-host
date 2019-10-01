import { Component, OnInit, Input } from '@angular/core';
import { TileInfo } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'st-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() tileInfo: TileInfo;

  constructor(private readonly router: Router) { }

  ngOnInit() {}

  handlePageNavigation() {    
    this.router.navigate([this.tileInfo.navigate], { skipLocationChange: true });
  }

}
