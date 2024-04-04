import { lastValueFrom, of } from 'rxjs';
import { CartService } from '@sections/ordering';
import { ShoppingCartBtnComponent } from './shopping-cart-btn.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ShoppingCartBtnComponent', () => {
  let component: ShoppingCartBtnComponent;
  let fixture: ComponentFixture<ShoppingCartBtnComponent>;

  const carService = {
    menuItems$: of(1),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartBtnComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: CartService, useValue: carService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get items count', async () => {
    const count = await lastValueFrom(component.itemsCount);
    fixture.detectChanges();
    expect(count).toEqual(1);
  });
});
