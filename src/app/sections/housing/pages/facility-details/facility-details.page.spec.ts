import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FacilitiesService } from '../../facilities/facilities.service';
import { Facility } from '../../facilities/facilities.model';
import { FacilityDetailsPage } from './facility-details.page';

describe('FacilityDetailsPage', () => {
  let component: FacilityDetailsPage;
  let fixture: ComponentFixture<FacilityDetailsPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const facilitiesServiceStub = () => ({
      getFacilities: applicationKey => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FacilityDetailsPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: FacilitiesService, useFactory: facilitiesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FacilityDetailsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('viewUnits', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const facilityStub: Facility = <any>{};
     jest.spyOn(routerStub, 'navigate');
      component.viewUnits(facilityStub);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const facilitiesServiceStub: FacilitiesService = fixture.debugElement.injector.get(
        FacilitiesService
      );
     jest.spyOn(facilitiesServiceStub, 'getFacilities');
      component.ngOnInit();
      expect(facilitiesServiceStub.getFacilities).toHaveBeenCalled();
    });
  });
});
