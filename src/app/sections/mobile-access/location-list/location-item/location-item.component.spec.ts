import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LocationItemComponent } from './location-item.component';

describe('LocationItemComponent', () => {
  let component: LocationItemComponent;
  let fixture: ComponentFixture<LocationItemComponent>;

  beforeEach(() => {
    const routerStub = () => ({});
    const navControllerStub = () => ({ navigateForward: arg => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LocationItemComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: NavController, useFactory: navControllerStub }
      ]
    });
    fixture = TestBed.createComponent(LocationItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('openLocation', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
     jest.spyOn(navControllerStub, 'navigateForward');
      component.openLocation();
      expect(navControllerStub.navigateForward).toHaveBeenCalled();
    });
  });
});
