import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MMobileLocationInfo } from '../model';
import { MobileAccessService } from '../service';
import { LocationListComponent } from './location-list.component';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;

  beforeEach(() => {
    const mobileAccessServiceStub = () => ({
      getContentValueByName: noLocationsFound => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LocationListComponent],
      providers: [
        { provide: MobileAccessService, useFactory: mobileAccessServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
