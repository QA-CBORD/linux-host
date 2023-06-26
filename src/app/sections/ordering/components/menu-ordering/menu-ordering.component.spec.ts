import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { NavigationService } from '@shared/services/navigation.service';
import { LOCAL_ROUTING } from '../../ordering.config';
import { MenuOrderingComponent } from './menu-ordering.component';

describe('MenuOrderingComponent', () => {
  let component: MenuOrderingComponent;
  let fixture: ComponentFixture<MenuOrderingComponent>;

  beforeEach(() => {
    const orderingServiceStub = () => ({
      getContentStringByName: labelSavedAddresses => ({})
    });
    const navigationServiceStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuOrderingComponent],
      providers: [
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MenuOrderingComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`localRouting has default value`, () => {
    expect(component.localRouting).toEqual(LOCAL_ROUTING);
  });
});
