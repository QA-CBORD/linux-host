import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StSuccesSummaryComponent } from './st-success-summary.component';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { TypeMessageModule } from '@sections/ordering/shared/pipes/type-message/type-message.pipe.module';
import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { of } from 'rxjs';

describe('StSuccesSummaryComponent', () => {
  let component: StSuccesSummaryComponent;
  let fixture: ComponentFixture<StSuccesSummaryComponent>;
  let mockOrderingService;
  let mockStorageStateService;

  beforeEach(async () => {
    mockOrderingService = {
      getContentStringByName: jest.fn(),
    };

    mockStorageStateService = {
      getStateEntityByKey$: jest.fn().mockReturnValue(of(null)),
      updateStateEntity: jest.fn(),
      clearState: jest.fn(),
      clearStorage: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [StSuccesSummaryComponent],
      imports: [TypeMessageModule, ModifyPrepTimeModule, AddressHeaderFormatPipeModule, HttpClientTestingModule],
      providers: [
        { provide: PopoverController, useValue: {} },
        { provide: ModalController, useValue: {} },
        { provide: StorageStateService, useValue: mockStorageStateService },
        { provide: OrderingService, useValue: mockOrderingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StSuccesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize contentStrings in constructor', () => {
    Object.values([
      ORDERING_CONTENT_STRINGS.buttonDone,
      ORDERING_CONTENT_STRINGS.labelTotal,
      ORDERING_CONTENT_STRINGS.labelTip,
      ORDERING_CONTENT_STRINGS.labelTax,
      ORDERING_CONTENT_STRINGS.labelSubtotal,
      ORDERING_CONTENT_STRINGS.labelPickupFee,
      ORDERING_CONTENT_STRINGS.labelDeliveryFee,
      ORDERING_CONTENT_STRINGS.labelDiscount,
      ORDERING_CONTENT_STRINGS.labelPaymentMethod,
      ORDERING_CONTENT_STRINGS.labelOrder,
      ORDERING_CONTENT_STRINGS.labelPickup
    ]).forEach(contentString => {
      expect(mockOrderingService.getContentStringByName).toHaveBeenCalledWith(contentString);
    });
  });
});
