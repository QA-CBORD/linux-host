import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { MenuInfo } from '@sections/ordering/shared/models';

@Component({
  selector: 'st-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.scss'],
})
export class FullMenuComponent implements OnInit {

  menu$: Observable<MenuInfo>;
  constructor(
    private readonly cartService: CartService
  ) { }

  ngOnInit() {
    this.menu$ = this.cartService.menuInfo$
  }

  onCategoryClicked() {
    console.log('category')
  }

}
