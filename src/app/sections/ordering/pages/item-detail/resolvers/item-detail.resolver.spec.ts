import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CartService } from '@sections/ordering/services';
import { ItemDetailResolver } from './item-detail.resolver';

describe('ItemDetailResolver', () => {
  let service: ItemDetailResolver;

  beforeEach(() => {
    const cartServiceStub = () => ({ menuInfo$: { pipe: () => ({}) } });
    TestBed.configureTestingModule({
      providers: [
        ItemDetailResolver,
        { provide: CartService, useFactory: cartServiceStub }
      ]
    });
    service = TestBed.inject(ItemDetailResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
