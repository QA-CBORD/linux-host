import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { UnitComponent } from './unit.component';

describe('UnitComponent', () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: arg => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UnitComponent],
      providers: [{ provide: Router, useFactory: routerStub }]
    });
    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('goToUnitDetails', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(routerStub, 'navigateByUrl');
      component.goToUnitDetails();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });
});
