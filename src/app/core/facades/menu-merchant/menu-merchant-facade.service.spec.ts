import { TestBed } from '@angular/core/testing';
import { MenuMerchantFacadeService } from './menu-merchant-facade.service';
import { MerchantInfo, MerchantSearchOptions } from '@sections/ordering';
import { Observable, firstValueFrom, of } from 'rxjs';
import { MerchantFacadeService } from '../merchant/merchant-facade.service';

describe('MenuMerchantFacadeService', () => {
  let service: MenuMerchantFacadeService;
  let mockMerchantFacadeService: any;

  beforeEach(() => {
    mockMerchantFacadeService = {
      fetchMenuMerchants: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [MenuMerchantFacadeService, { provide: MerchantFacadeService, useValue: mockMerchantFacadeService }],
    });

    service = TestBed.inject(MenuMerchantFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch menu merchants', () => {
    const mockMerchantInfo: any[] = [
      {
        id: 'merchantId',
        campusId: 'campusId',
        externalId: 'externalId',
        parentMerchantId: 'parentMerchantId',
        name: 'Merchant Name',
        shortName: 'Short Name',
        description: 'Merchant description',
        storeAddress: {
          street: '123 Main St',
          city: 'City',
          state: 'State',
          zipCode: '12345',
        },
        billingAddress: {
          street: '456 Billing St',
          city: 'City',
          state: 'State',
          zipCode: '12345',
        },
        billingTerminalId: 'terminalId',
        cashlessTerminalLocation: 'Terminal location',
        phoneCustomerService: '123-456-7890',
        emailCustomerService: 'customer-service@example.com',
        reportingEmail: 'reporting@example.com',
        reportingFaxNumber: '123-456-7890',
        emailOrder: 'order@example.com',
        emailListAlerts: 'alerts@example.com',
        emailListOrderCc: 'cc@example.com',
        faxNumber: '123-456-7890',
        website: 'https://example.com',
        installationDate: new Date(),
        hoursOfOperation: 'Mon-Fri: 9AM-5PM',
        paymentNotes: 'Payment notes',
        openNow: true,
        deliveryRadius: 5,
        distanceFromUser: 2,
        taxRate: 0.08,
        image: 'image.jpg',
        imageThumbnail: 'thumbnail.jpg',
        imageFull: 'fullimage.jpg',
        hasMenu: true,
        serviceConsumerId: 'consumerId',
        settings: {
          list: [
            // Add sample data for MerchantSettingInfo
          ],
          map: {},
        },
        faxNotificationActive: true,
        faxNotificationRequired: false,
        emailNotificationActive: true,
        onCampus: true,
        isFavorite: true,
        isAbleToOrder: true,
        timeZone: 'America/New_York',
        walkout: false,
      },
    ];
    const mockOptions: MerchantSearchOptions = {
      // Set sample search options here
    } as MerchantSearchOptions;
    const mockResponse$: Observable<MerchantInfo[]> = of(mockMerchantInfo);

    mockMerchantFacadeService.fetchMenuMerchants.mockReturnValue(mockResponse$);

    const result = firstValueFrom(service.fetchMenuMerchant$(mockOptions));
    expect(result).resolves.toEqual(mockMerchantInfo);
    expect(mockMerchantFacadeService.fetchMenuMerchants).toHaveBeenCalledWith(mockOptions, undefined);
  });
});
