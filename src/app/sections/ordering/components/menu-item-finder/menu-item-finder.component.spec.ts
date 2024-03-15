import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ItemFindData, MenuItemFinderComponent } from './menu-item-finder.component';
import { CartService, MenuItemInfo, MerchantInfo, MerchantSettingInfo } from '@sections/ordering';
import { ModalsService } from '@core/service/modals/modals.service';
import { CommonService } from '@shared/services/common.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import { AddressInfo } from '@core/model/address/address-info';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MenuItemFinderComponent', () => {
  let component: MenuItemFinderComponent;
  let fixture: ComponentFixture<MenuItemFinderComponent>;
  let mockCartService: Partial<CartService>;
  let mockModalService: Partial<ModalsService>;
  let mockCommonService: Partial<CommonService>;
  let mockToastService: Partial<ToastService>;
  let mockMerchantSubject: BehaviorSubject<MerchantInfo>;

  beforeEach(() => {
    mockMerchantSubject = new BehaviorSubject<MerchantInfo>({} as MerchantInfo);

    mockCartService = {
      merchant$: mockMerchantSubject.asObservable(),
      getMenuItemByCode: jest.fn().mockReturnValue(of({ id: 'test' })),
    };

    mockModalService = {
      create: jest.fn().mockResolvedValue({
        onDidDismiss: jest.fn().mockResolvedValue({ data: { menuItemId: 'test' } }),
        present: jest.fn().mockResolvedValue(undefined),
      }),
    };

    mockCommonService = {
      loadContentString: jest.fn().mockReturnValue(of({})),
    };

    mockToastService = {
      showToast: jest.fn().mockResolvedValue(undefined),
    };

    TestBed.configureTestingModule({
      declarations: [MenuItemFinderComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: ModalsService, useValue: mockModalService },
        { provide: CommonService, useValue: mockCommonService },
        { provide: ToastService, useValue: mockToastService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemFinderComponent);
    component = fixture.componentInstance;
  });

  it('should emit itemScanned event when getMenuItem is called and menuItem is found', done => {
    component.itemScanned.subscribe(id => {
      expect(id).toBe('test');
      done();
    });

    component['getMenuItem']({ scanCodeResult: 'test', manualEntry: '' });
  });

  it('should call showToast method of toastService when getMenuItem is called and menuItem is not found', async () => {
    jest.spyOn(mockCartService, 'getMenuItemByCode').mockReturnValueOnce(of({} as MenuItemInfo));

    await component['getMenuItem']({ scanCodeResult: 'test', manualEntry: '' });

    expect(mockToastService.showToast).toHaveBeenCalledWith({
      message: 'Item not found, please check the code and try again.',
    });
  });

  it('should call create method of modalService when openManualEntry is called', async () => {
    await component['openManualEntry']();

    expect(mockModalService.create).toHaveBeenCalled();
  });

  it('should call create method of modalService when openScanCode is called', async () => {
    component.barCodeCs = { title: '', prompt: '', textBtn: '' };
    await component['openScanCode']();

    expect(mockModalService.create).toHaveBeenCalled();
  });

  it('should call loadContentString method of commonService and set barCodeCs when scanCodeCs is called', () => {
    const mockContentStrings = {} as ContentStringModel;
    jest.spyOn(mockCommonService, 'loadContentString').mockReturnValue(of(mockContentStrings));

    component['scanCodeCs']();

    expect(mockCommonService.loadContentString).toHaveBeenCalledWith(ContentStringCategory.scanAndGo);
    expect(component['barCodeCs']).toBe(mockContentStrings);
  });

  it('should call getMenuItem method when handleResult is called with scanCodeResult', async () => {
    const spy = jest.spyOn(mockCartService, 'getMenuItemByCode').mockReturnValueOnce(of({} as MenuItemInfo));

    const mockData = { scanCodeResult: 'ok', manualEntry: '' } as ItemFindData;

    await component['handleResult'](mockData);

    expect(spy).toHaveBeenCalledWith(mockData.scanCodeResult);
  });

  it('should call openManualEntry method when handleResult is called with no scanCodeResult', async () => {
    const mockData = { scanCodeResult: '', manualEntry: 'ok' } as ItemFindData;

    await component['handleResult'](mockData);

    expect(mockModalService.create).toHaveBeenCalled();
  });

  it('should set up barcodeOptions$ correctly in ngOnInit', () => {
    const jsonParseSpy = jest.spyOn(JSON, 'parse').mockImplementation(() => true);
    const mockMerchant = {
      id: 'mockId',
      campusId: 'mockCampusId',
      externalId: 'mockExternalId',
      parentMerchantId: 'mockParentMerchantId',
      name: 'Mock Merchant',
      shortName: 'Mock',
      description: 'This is a mock merchant.',
      storeAddress: {} as AddressInfo,
      billingAddress: {} as AddressInfo,
      billingTerminalId: 'mockBillingTerminalId',
      cashlessTerminalLocation: 'Mock Location',
      phoneCustomerService: '123-456-7890',
      emailCustomerService: 'mock@example.com',
      reportingEmail: 'reporting@example.com',
      reportingFaxNumber: '123-456-7890',
      emailOrder: 'order@example.com',
      emailListAlerts: 'alerts@example.com',
      emailListOrderCc: 'cc@example.com',
      faxNumber: '123-456-7890',
      website: 'https://mockmerchant.com',
      installationDate: new Date(),
      hoursOfOperation: '9AM - 5PM',
      paymentNotes: 'Cash and Credit Cards accepted.',
      openNow: true,
      deliveryRadius: 10,
      distanceFromUser: 5,
      orderTypes: {
        // You can provide mock data for MerchantOrderTypesInfo here
      },
      taxRate: 0.1,
      image: 'mockImage.jpg',
      imageThumbnail: 'mockImageThumbnail.jpg',
      imageFull: 'mockImageFull.jpg',
      hasMenu: true,
      serviceConsumerId: 'mockServiceConsumerId',
      settings: {
        list: [{}],
        map: {
          value: '1223',
        } as Map<string, MerchantSettingInfo> | Object,
      },
      faxNotificationActive: true,
      faxNotificationRequired: true,
      emailNotificationActive: true,
      onCampus: true,
      isFavorite: true,
      isAbleToOrder: true,
      timeZone: 'UTC',
      walkout: true,
    } as MerchantInfo;

    // Emit mockMerchant from the mockMerchantSubject
    mockMerchantSubject.next(mockMerchant);

    // Call ngOnInit
    component.ngOnInit();

    // Expect barcodeOptions$ to emit an array with one BarcodeOptionModel
    component.barcodeOptions$.subscribe(barcodeOptions => {
      expect(barcodeOptions.length).toBe(1);
      expect(barcodeOptions[0].label).toBe('Scan Barcode or QR Code');
      expect(jsonParseSpy).toHaveBeenCalled();

      jsonParseSpy.mockRestore();
      // You can add more expectations based on your implementation
    });
  });
});
