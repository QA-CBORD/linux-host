import { Component, OnInit, Input, ContentChild, AfterContentInit, ContentChildren } from '@angular/core';


import { TileWrapperConfig } from '../../models/tile-wrapper-config.model';

@Component({
  selector: 'st-tile-wrapper',
  templateUrl: './tile-wrapper.component.html',
  styleUrls: ['./tile-wrapper.component.scss'],
})
export class TileWrapperComponent implements OnInit {
  
  @Input() wrapperConfig: TileWrapperConfig;
  @ContentChild('ref') contentEl ;

  constructor() { }

  ngOnInit() {
   
    
  }
  ngAfterContentInit(): void {
    
    
  }

   
  handleTopBarClick(){}

  handleBottomButtonClick(){}

}
