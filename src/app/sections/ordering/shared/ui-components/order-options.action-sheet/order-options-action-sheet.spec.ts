import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { OrderOptionsActionSheetComponent } from './order-options.action-sheet.component';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipe } from '@shared/pipes';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { StDateTimePickerModule } from '../st-date-time-picker';
import { StButtonModule } from '@shared/ui-components/st-button';
import { DeliveryAddressesModalModule } from '../delivery-addresses.modal';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OrderingService } from '@sections/ordering/services/ordering.service';

describe('OrderOptionsActionSheet', () => {
  let component: OrderOptionsActionSheetComponent;
  let fixture: ComponentFixture<OrderOptionsActionSheetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderOptionsActionSheetComponent],
        imports: [
          ...CoreTestingModules,
          DeliveryAddressesModalModule,
          StDateTimePickerModule,
          StButtonModule,
          AddressHeaderFormatPipeModule,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [AccessibilityService, AddressHeaderFormatPipe, AndroidPermissions, OrderingService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOptionsActionSheetComponent);
    component = fixture.componentInstance;

    component.orderTypes = {
      pickup: false,
      merchantId: '',
      delivery: true,
      deliveryInstructions: '',
      deliveryPrepTime: 0,
      dineIn: false,
      dineInInstructions: '',
      dineInPrepTime: 0,
      merchantTimeZone: '',
      pickupInstructions: '',
      pickupPrepTime: 0,
    };
    component.settings = [];

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
