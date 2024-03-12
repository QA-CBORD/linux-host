import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { NavigationService } from '@shared/services/navigation.service';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '../../ordering.config';
import { MenuOrderingComponent } from './menu-ordering.component';
import { APP_ROUTES } from '@sections/section.config';

describe('MenuOrderingComponent', () => {
  let component: MenuOrderingComponent;
  let fixture: ComponentFixture<MenuOrderingComponent>;
  let mockOrderingService: Partial<OrderingService>;
  let mockNavigationService: Partial<NavigationService>;


  beforeEach(() => {
    mockOrderingService = {
      getContentStringByName: jest.fn().mockImplementation((name) => name)
    };

    mockNavigationService = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuOrderingComponent],
      providers: [
        { provide: OrderingService, useValue: mockOrderingService },
        { provide: NavigationService, useValue: mockNavigationService }
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

  it('should call navigate method of routingService when goToPage is called', () => {
    const pageRoute = 'testRoute';
    component.goToPage(pageRoute);

    expect(mockNavigationService.navigate).toHaveBeenCalledWith([APP_ROUTES.ordering, pageRoute]);
  });

  it('should set contentStrings on ngOnInit', () => {
    component.ngOnInit();

    expect(component.contentStrings.labelSavedAddresses).toBe(ORDERING_CONTENT_STRINGS.labelSavedAddresses);
    expect(component.contentStrings.labelFavorites).toBe(ORDERING_CONTENT_STRINGS.labelFavorites);
    expect(component.contentStrings.labelRecentOrders).toBe(ORDERING_CONTENT_STRINGS.labelRecentOrders);
  });
});
