import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerchantItemComponent } from './merchant-item.component';
import { MerchantInfo } from '@sections/ordering/shared/models';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('MerchantItemComponent', () => {
  let component: MerchantItemComponent;
  let fixture: ComponentFixture<MerchantItemComponent>;
  let mockEnvironmentFacadeService: Partial<EnvironmentFacadeService>;
  let mockOrderingService: Partial<OrderingService>;

  beforeEach(() => {
    mockEnvironmentFacadeService = {
      getImageURL: jest.fn().mockReturnValue('mockImageUrl'),
    };

    mockOrderingService = {
      getContentStringByName: jest.fn().mockImplementation(name => name),
    };

    TestBed.configureTestingModule({
      imports: [MerchantItemComponent, RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: EnvironmentFacadeService, useValue: mockEnvironmentFacadeService },
        { provide: OrderingService, useValue: mockOrderingService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MerchantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit merchantClick event when triggerMerchantClick is called', () => {
    const merchantInfo = { id: '1', name: 'Test Merchant' } as MerchantInfo;
    jest.spyOn(component.merchantClick, 'emit');

    component.triggerMerchantClick(merchantInfo);

    expect(component.merchantClick.emit).toHaveBeenCalledWith(merchantInfo);
  });

  it('should emit addToFav event when triggerFavourite is called', () => {
    const favInfo = { isFavorite: true, id: '1' } as MerchantInfo;
    jest.spyOn(component.addToFav, 'emit');

    component.triggerFavourite(null, favInfo);

    expect(component.addToFav.emit).toHaveBeenCalledWith(favInfo);
  });

  it('should emit addToFav event when triggerFavourite is called with isFavorite null', () => {
    const favInfo = { isFavorite: null, id: '1' } as MerchantInfo;
    jest.spyOn(component.addToFav, 'emit');

    component.triggerFavourite(null, favInfo);

    expect(component.addToFav.emit).toHaveBeenCalledWith(favInfo);
  });

  it('should return correct starClass based on merchantInfo.isFavorite', () => {
    component.merchantInfo = { isFavorite: true } as MerchantInfo;
    expect(component.starClass).toBe('./assets/icon/star-filled.svg');

    component.merchantInfo = { isFavorite: false } as MerchantInfo;
    expect(component.starClass).toBe('./assets/icon/star-outline.svg');
  });
});
