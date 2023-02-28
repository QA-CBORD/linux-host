import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { isAppearing } from '@core/utils/general-helpers';

@Directive({
  selector: '[stIsDividerAppear]',
})
export class IsDividerAppearDirective implements OnInit {
  @Input() propertyName: string;
  @Input() date: string;
  @Input() index: number;
  @Input() transactions: object[];

  constructor(private elem: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(
      this.elem.nativeElement,
      'display',
      isAppearing(this.date, this.index, this.transactions, this.propertyName) ? 'block' : 'none'
    );
  }
}
