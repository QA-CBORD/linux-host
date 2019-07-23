import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { TransactionHistory } from '../../models/transaction-history.model';
import { isSameDay } from '../../../../core/utils/date-helper';
import { Platform } from '@ionic/angular';

@Directive({
  selector: '[stIsDividerAppear]',
})
export class IsDividerAppearDirective implements OnInit {
  @Input() actualDate: Date;
  @Input() index: number;
  @Input() transactions: TransactionHistory[];

  constructor(private elem: ElementRef, private renderer: Renderer2, private readonly platform: Platform) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elem.nativeElement,
      'display',
      this.isDividerAppear(this.actualDate, this.index, this.transactions) && this.isTabletResolution() ? 'block' : 'none'
    );
  }

  private isDividerAppear(actualDate, i, transactions): boolean {
    if (!transactions[i + 1]) return false;
    return i === 0 || !isSameDay(actualDate, transactions[i - 1].actualDate);
  }

  private isTabletResolution() {
    const tabletResolution: number = 767;

    return this.platform.width() > tabletResolution;
  }
}
