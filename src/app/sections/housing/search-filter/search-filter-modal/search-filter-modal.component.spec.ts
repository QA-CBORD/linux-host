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
import { FilterOptions } from 'src/app/app.global';

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

  describe('sortAssigmentLimitOption', () => {
    it('should sort the assignment limit options in ascending order', () => {
      component.categoryOptions = {
        [FilterOptions.FACILITY_ASSIGMENT_LIMIT]: ['5', '2', '10', '1']
      };
      component.sortAssigmentLimitOption();
      const expectedOptions = ['1', '2', '5', '10'];
      expect(component.categoryOptions[FilterOptions.FACILITY_ASSIGMENT_LIMIT]).toEqual(expectedOptions);
    });
  });
  

});
