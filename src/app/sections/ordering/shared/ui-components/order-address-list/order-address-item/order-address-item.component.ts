import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-order-address-item',
  templateUrl: './order-address-item.component.html',
  styleUrls: ['./order-address-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderAddressItemComponent implements OnInit {
  @Input() item: any;
  @Input() iconAlt: string;
  @Input() isSelected: boolean;
  @Input() iconIsFile: boolean;
  @Input() iconNameDefault = 'star-outline.svg';
  @Input() iconNameSelected = 'star-filled.svg';
  @Input() defaultAddress: string;

  isDefault = false;

  ngOnInit() {
    if (
      (this.iconNameDefault.includes('.svg') && !this.isSelected) ||
      (this.iconNameSelected.includes('.svg') && this.isSelected)
    ) {
      this.iconIsFile = true;
    }

    this.isDefault = this.item['id'] === this.defaultAddress;
  }

  get iconSrc(): string {
    if (!this.iconIsFile) {
      return '';
    }

    return `./assets/icon/${this.getIconName()}`;
  }

  get iconName(): string {
    if (this.iconIsFile) {
      return '';
    }

    return this.getIconName();
  }

  private getIconName(): string {
    return this.isSelected && this.iconNameSelected ? this.iconNameSelected : this.iconNameDefault;
  }
}
