import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RangeValue, RangeValueHash } from './range.model';

@Component({
  selector: 'st-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeComponent implements OnInit {
  @Input() parentGroup: FormGroup;

  @Input() min: number;

  @Input() max: number;

  @Input() value: RangeValue;

  @Input() name: string;

  price: string;

  ngOnInit(): void {
    this.price = this.calculatePrice({ lower: this.min, upper: this.max });
  }

  handleRangeChange(value: RangeValue): void {
    this.price = this.calculatePrice(value);
  }

  private calculatePrice(value: RangeValue): string {
    value = value as RangeValueHash;
    if (value.upper === this.max) {
      return 'Any Price';
    }

    return `$${value.upper} or less`;
  }
}
