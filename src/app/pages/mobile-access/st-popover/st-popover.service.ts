import { Injectable, ComponentFactoryResolver, Injector, Inject, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StPopoverComponent } from './st-popover.component';

@Injectable()
export class StPopoverService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open<T>(content: Type<T>) {
    const factory = this.resolver.resolveComponentFactory(StPopoverComponent);
    const ngContent = this.resolveNgContent(content);
    const componentRef = factory.create(this.injector, ngContent);

    componentRef.hostView.detectChanges();

    return componentRef.location.nativeElement;

    // const { nativeElement } = componentRef.location;
    // this.document.body.appendChild(nativeElement);
  }

  resolveNgContent<T>(content: Type<T>) {
    const factory = this.resolver.resolveComponentFactory(content);
    const componentRef = factory.create(this.injector);
    console.log(componentRef.location.nativeElement);
    return [[componentRef.location.nativeElement]];
  }
}
