import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MobileAccessService } from './services/mobile-access.service';
import { Router } from '@angular/router';
import { MobileAccessTileComponent } from './mobile-access-tile.component';

describe('MobileAccessTileComponent', () => {
  let component: MobileAccessTileComponent;
  let fixture: ComponentFixture<MobileAccessTileComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const mobileAccessServiceStub = () => ({
      getLocations: () => ({ pipe: () => ({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MobileAccessTileComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: MobileAccessService, useFactory: mobileAccessServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(MobileAccessTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isLoadingData has default value`, () => {
    expect(component.isLoadingData).toEqual(true);
  });

  it(`maxAmount has default value`, () => {
    expect(component.maxAmount).toEqual(4);
  });

  it(`skeletonArray has default value`, () => {
    expect(component.skeletonArray).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getLocations').and.callThrough();
      component.ngOnInit();
      expect(component.getLocations).toHaveBeenCalled();
    });
  });

  describe('getLocations', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const mobileAccessServiceStub: MobileAccessService = fixture.debugElement.injector.get(
        MobileAccessService
      );
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      spyOn(mobileAccessServiceStub, 'getLocations').and.callThrough();
      component.getLocations();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(mobileAccessServiceStub.getLocations).toHaveBeenCalled();
    });
  });
});
