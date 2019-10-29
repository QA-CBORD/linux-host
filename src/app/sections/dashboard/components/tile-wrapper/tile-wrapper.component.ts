import { Component, OnInit, Input } from '@angular/core';


import { TileWrapperConfig } from '../../models/tile-wrapper-config.model';

@Component({
  selector: 'st-tile-wrapper',
  templateUrl: './tile-wrapper.component.html',
  styleUrls: ['./tile-wrapper.component.scss'],
})
export class TileWrapperComponent implements OnInit {

  @Input() wrapperConfig: TileWrapperConfig;

  constructor() { }

  ngOnInit() {}


  handleTopBarClick(){
    
  }

  handleBottomButtonClick(){
    
  }

}
