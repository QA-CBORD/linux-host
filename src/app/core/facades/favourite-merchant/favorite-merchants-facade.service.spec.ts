import { TestBed } from '@angular/core/testing';
import { FavoriteMerchantsFacadeService } from './favorite-merchants-facade.service';
import { MerchantInfo } from '@sections/ordering';
import { Observable, of } from 'rxjs';
import { MerchantFacadeService } from '../merchant/merchant-facade.service';

describe('FavoriteMerchantsFacadeService', () => {
  let service: FavoriteMerchantsFacadeService;
  let mockMerchantFacadeService: any;

  beforeEach(() => {
    mockMerchantFacadeService = {
      removeFavoriteMerchant: jest.fn(),
      addFavoriteMerchant: jest.fn(),
      fetchFavoriteMerchants: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        FavoriteMerchantsFacadeService,
        { provide: MerchantFacadeService, useValue: mockMerchantFacadeService },
      ],
    });

    service = TestBed.inject(FavoriteMerchantsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch favorite merchants', () => {
    const mockMerchantInfo: MerchantInfo[] = [];
    const mockResponse$: Observable<MerchantInfo[]> = of(mockMerchantInfo);

    mockMerchantFacadeService.fetchFavoriteMerchants.mockReturnValue(mockResponse$);

    service.fetchFavoritesMerchants$().subscribe(result => {
      expect(result).toEqual(mockMerchantInfo);
      expect(mockMerchantFacadeService.fetchFavoriteMerchants).toHaveBeenCalled();
    });
  });

  it('should resolve favorite merchant by adding', () => {
    const mockMerchantInfo: MerchantInfo = {
      id: 'merchantId',
      isFavorite: false,
    } as MerchantInfo;

    mockMerchantFacadeService.addFavoriteMerchant.mockReturnValue(of(true));

    service.resolveFavoriteMerchant(mockMerchantInfo).subscribe(result => {
      expect(result).toEqual(true);
      expect(mockMerchantFacadeService.addFavoriteMerchant).toHaveBeenCalledWith('merchantId');
    });
  });

  it('should resolve favorite merchant by removing', () => {
    const mockMerchantInfo: MerchantInfo = {
      id: 'merchantId',
      isFavorite: true,
    } as MerchantInfo;

    mockMerchantFacadeService.removeFavoriteMerchant.mockReturnValue(of(null));

    service.resolveFavoriteMerchant(mockMerchantInfo).subscribe(result => {
      expect(result).toBeNull();
      expect(mockMerchantFacadeService.removeFavoriteMerchant).toHaveBeenCalledWith('merchantId');
    });
  });
});
