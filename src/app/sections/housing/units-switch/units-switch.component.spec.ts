import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Unit } from './units-switch.model';
import { Router } from '@angular/router';
import { UnitsSwitchComponent } from './units-switch.component';

describe('UnitsSwitchComponent', () => {
  let component: UnitsSwitchComponent;
  let fixture: ComponentFixture<UnitsSwitchComponent>;

  beforeEach(() => {
    const routerStub = () => ({
      events: { pipe: () => ({ subscribe: f => f({}) }) },
      navigate: array => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UnitsSwitchComponent],
      providers: [{ provide: Router, useFactory: routerStub }]
    });
    fixture = TestBed.createComponent(UnitsSwitchComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isFacilityActive has default value`, () => {
    expect(component.isFacilityActive).toEqual(true);
  });

  describe('goToUnits', () => {
    it('makes expected calls', () => {
      const unitStub: Unit = <any>{};
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(routerStub, 'navigate');
      component.goToUnits(unitStub);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
