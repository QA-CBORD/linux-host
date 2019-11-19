import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'st-order-address-item',
  templateUrl: './order-address-item.component.html',
  styleUrls: ['./order-address-item.component.scss'],
})
export class OrderAddressItemComponent implements OnInit {
  @Input() line1: string;
  @Input() line2: string;
  @Input() iconAlt: string;
  @Input() isDefault: boolean;
  @Input() isSelected: boolean;
  @Input() iconIsFile: boolean;
  @Input() iconNameDefault: string = 'star-outline.svg';
  @Input() iconNameSelected: string = 'star-filled.svg';

  constructor() { }

  ngOnInit() {
    if(this.iconNameDefault.includes('.svg') && !this.isSelected 
    || this.iconNameSelected.includes('.svg') && this.isSelected){
      this.iconIsFile = true;
    }
  }

  itemSelected(){
    
  }
  get iconSrc(): string {
    if(this.iconIsFile){
      const name = (this.isSelected && this.iconNameSelected) ? this.iconNameSelected : this.iconNameDefault;
      return `./assets/icon/${name}`;
    }else{
      return '';
    }
  }

  get iconName(): string {
    if(!this.iconIsFile){
      return (this.isSelected && this.iconNameSelected) ? this.iconNameSelected : this.iconNameDefault;
    }else{
      return '';
    }
  }
  
  
}
