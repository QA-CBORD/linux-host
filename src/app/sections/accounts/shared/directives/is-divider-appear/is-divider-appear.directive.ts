import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { TransactionHistory } from '@sections/accounts/models/transaction-history.model';
import { isSameDay } from '@core/utils/date-helper';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';

@Directive({
  selector: '[stIsDividerAppear]',
})
export class IsDividerAppearDirective implements OnInit {
  @Input() actualDate: Date;
  @Input() index: number;
  @Input() transactions: TransactionHistory[];

  constructor(private elem: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(
      this.elem.nativeElement,
      'display',
      this.isDividerAppear(this.actualDate, this.index, this.transactions) ? 'block' : 'none'
    );
  }

  private isDividerAppear(actualDate, i, transactions): boolean {
    return i === 0 || !isSameDay(
      this.formatDate(actualDate),
      this.formatDate(transactions[i - 1].actualDate)
    );
  }

  private formatDate(date) {
    /// this is very unsafe.. as we've just experienced
    return date.toString().replace(TIMEZONE_REGEXP, "$1:$2");
  }
}
