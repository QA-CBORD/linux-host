import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CartService } from '@sections/ordering/services';
import { ItemDetailResolver } from './item-detail.resolver';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';

describe('ItemDetailResolver', () => {
  let service: ItemDetailResolver;
  const translateFacadeService = {};
  beforeEach(() => {
    const cartServiceStub = () => ({ menuInfo$: { pipe: () => ({}) } });
    TestBed.configureTestingModule({
      providers: [
        ItemDetailResolver,
        { provide: CartService, useFactory: cartServiceStub },
        { provide: TranslateFacadeService, useValue: translateFacadeService },
      ],
    });
    service = TestBed.inject(ItemDetailResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
