import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { SimpleChanges } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MerchantService } from "@sections/ordering/services";
import { LoadingService } from "@core/service/loading/loading.service";
import { OrderingService } from "@sections/ordering/services/ordering.service";
import { ContentStringsFacadeService } from "@core/facades/content-strings/content-strings.facade.service";
import { SettingsFacadeService } from "@core/facades/settings/settings-facade.service";
import { AddEditAddressesComponent } from "./add-edit-addresses.component";

describe("AddEditAddressesComponent", () => {
  let component: AddEditAddressesComponent;
  let fixture: ComponentFixture<AddEditAddressesComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const formBuilderStub = () => ({
      group: campusBlock => ({}),
      control: (arg, arg3) => ({})
    });
    const merchantServiceStub = () => ({});
    const loadingServiceStub = () => ({ closeSpinner: () => ({}) });
    const orderingServiceStub = () => ({
      getContentStringByName: formErrorAddress => ({})
    });
    const contentStringsFacadeServiceStub = () => ({
      getContentStrings$: (patronUi, usStates) => ({ pipe: () => ({}) })
    });
    const settingsFacadeServiceStub = () => ({
      getSetting: setting => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddEditAddressesComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(AddEditAddressesComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
});
