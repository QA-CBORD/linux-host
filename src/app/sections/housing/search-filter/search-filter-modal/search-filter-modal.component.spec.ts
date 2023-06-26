<<<<<<< HEAD
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchFilterModalComponent } from "./search-filter-modal.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalController, PopoverController } from '@ionic/angular';
import { popoverCtrl } from '@sections/housing/pages/form-payment/form-payment.component.spec';
import { EnvironmentType } from '@core/model/environment';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Storage } from '@ionic/storage';
const _environmentFacadeService = {
  getHousingAPIURL: jest.fn(),
  getEnvironmentObject: jest.fn(() => ({
    environment: EnvironmentType.develop,
    services_url: 'https://services.get.dev.cbord.com/GETServices/services',
    site_url: 'https://get.dev.cbord.com',
    secmsg_api: 'https://secmsg.api.dev.cbord.com',
    image_url: 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
    housing_aws_url: 'https://5yu7v7hrq2.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: 'https://ft45xg91ch.execute-api.us-east-1.amazonaws.com/dev',
  })),
};
const modalController = {
  create: jest.fn()
}
const _storage = {
  clear: jest.fn(),
  ready: jest.fn(),
  get: jest.fn(),
};
describe("SearchFilterModalComponent", () => {
  let component: SearchFilterModalComponent;
  let fixture: ComponentFixture<SearchFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFilterModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalController },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: EnvironmentFacadeService, useValue: _environmentFacadeService },
        { provide: Storage, useValue: _storage },

      ],

      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  describe('Main', () => {
    it('Should exist', () => {
      expect(component).toBeTruthy();
    });
  });
})
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { RoomsService } from '@sections/housing/rooms/rooms.service';
import { HousingService } from '@sections/housing/housing.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { SearchFilterModalComponent } from './search-filter-modal.component';

describe('SearchFilterModalComponent', () => {
  let component: SearchFilterModalComponent;
  let fixture: ComponentFixture<SearchFilterModalComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: () => ({}) });
    const formBuilderStub = () => ({
      array: arg => ({}),
      group: builderOptions => ({})
    });
    const roomsServiceStub = () => ({
      getFilterCategories: () => ({}),
      getFilterOptions: categories => ({}),
      getAttributeOptionsInfo: (item, arg) => ({ map: () => ({}) }),
      clearFilter: () => ({}),
      filterBuildings: (filterOptions, hasPatronAttribute) => ({})
    });
    const housingServiceStub = () => ({
      getAllOccupantDetails: (key, facilityKeys) => ({ pipe: () => ({}) })
    });
    const roomsStateServiceStub = () => ({
      getOccupiedFacilities: () => ({ map: () => ({}) }),
      getActiveRoomSelect: () => ({ key: {} })
    });
    const routerStub = () => ({
      navigateByUrl: arg => ({ catch: () => ({}) })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchFilterModalComponent],
      providers: [
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: RoomsService, useFactory: roomsServiceStub },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: RoomsStateService, useFactory: roomsStateServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SearchFilterModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`categories has default value`, () => {
    expect(component.categories).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const roomsStateServiceStub: RoomsStateService = fixture.debugElement.injector.get(
        RoomsStateService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(roomsStateServiceStub, 'getOccupiedFacilities');
     jest.spyOn(loadingServiceStub, 'showSpinner');
      component.ngOnInit();
      expect(roomsStateServiceStub.getOccupiedFacilities).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.close();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
>>>>>>> ad1bfa6366250a3146a14063a8a61a1408f31dab
