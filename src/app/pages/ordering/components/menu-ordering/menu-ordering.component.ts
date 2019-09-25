import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_ROUTING } from '../../ordering.config';

@Component({
  selector: 'st-menu-ordering',
  templateUrl: './menu-ordering.component.html',
  styleUrls: ['./menu-ordering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuOrderingComponent {
  @Output('redirect') redirect: EventEmitter<string> = new EventEmitter<string>();

  localRouting = LOCAL_ROUTING;

  constructor(private readonly router: Router) {}

  onClickItem(pageRoute: string) {
    this.redirect.emit(pageRoute);
  }
}
