import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { OrderFiltersActionSheetComponent } from './order-filters.action-sheet.component';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipe } from '@shared/pipes';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { OrderingService } from '@sections/ordering/services/ordering.service';

describe('OrderOptionsActionSheet', () => {
  let component: OrderFiltersActionSheetComponent;
  let fixture: ComponentFixture<OrderFiltersActionSheetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderFiltersActionSheetComponent],
        imports: [
          ...CoreTestingModules,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [AccessibilityService, AddressHeaderFormatPipe, AndroidPermissions, OrderingService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFiltersActionSheetComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
