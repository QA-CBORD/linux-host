import { Component, OnInit, Input } from '@angular/core';

import { TileWrapperConfig } from '../../models/tile-wrapper-config.model';
import { Router } from '@angular/router';

@Component({
  selector: 'st-tile-wrapper',
  templateUrl: './tile-wrapper.component.html',
  styleUrls: ['./tile-wrapper.component.scss'],
})
export class TileWrapperComponent implements OnInit {
  @Input() wrapperConfig: TileWrapperConfig;

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  handleTopBarClick(path) {
    this.router.navigate([path]);
  }

  handleBottomButtonClick(path) {
    this.router.navigate([path]);
  }
}
