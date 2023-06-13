import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedHousingTab } from '@sections/housing/pages/housing-dashboard/housing-dashboard.component';
import { UnitsTabComponent } from './units-tab.component';

describe('UnitsTabComponent', () => {
  let component: UnitsTabComponent;
  let fixture: ComponentFixture<UnitsTabComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const routerStub = () => ({
      events: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UnitsTabComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(UnitsTabComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`selectedTab has default value`, () => {
    expect(component.selectedTab).toEqual(SelectedUnitsTab.Buildings);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      component.ngOnInit();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });
});
