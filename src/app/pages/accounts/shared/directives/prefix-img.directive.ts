import { Directive, Input, OnInit, ElementRef, Renderer2, AfterViewInit, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[stPrefixImg]',
})
export class PrefixImgDirective implements OnInit, AfterViewInit, AfterContentInit {
  @Input('value') value: any;
  constructor(private elem: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    console.log(this.elem.nativeElement);
    console.log(this.value);
  }

  ngAfterContentInit(): void {
    const newElement = this.renderer.createElement('img');
    this.renderer.setAttribute(newElement, 'src', 'assets/icon/bill-me.svg');
    console.log(newElement);
    this.renderer.insertBefore(this.elem.nativeElement, newElement, this.elem.nativeElement.firstChild);
    this.renderer.setValue(this.elem.nativeElement, 'test');
  }

  ngAfterViewInit(): void {
    // const newElement = this.renderer.createElement('img');
    // this.renderer.setAttribute(newElement, 'src', 'assets/icon/bill-me.svg');
    // console.log(newElement);
    // this.renderer.insertBefore(this.elem.nativeElement, newElement, this.elem.nativeElement.firstChild);
    // this.renderer.setValue(this.elem.nativeElement, 'test');
  }
}
