import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { StNavTabsComponent } from './st-nav-tabs.component';
import { TabsConfig } from '../../../core/model/tabs/tabs.model';
import { PATRON_NAVIGATION } from '../../../app.global';
import { IonTabs, IonicModule, NavController } from '@ionic/angular';

describe('StNavTabsComponent', () => {
  let component: StNavTabsComponent;
  let fixture: ComponentFixture<StNavTabsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StNavTabsComponent],
      imports: [IonicModule],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn(), createUrlTree: jest.fn(), serializeUrl: jest.fn() } },
        { provide: IonTabs, useValue: {} },
        { provide: NavController, useValue: { navigate: jest.fn() } },
        { provide: ActivatedRoute, useValue: { snapshot: {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StNavTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should update tabsConfig and call handleTabsConfigChange', () => {
    const handleTabsConfigChangeSpy = jest.spyOn(component as any, 'handleTabsConfigChange');
    const tabsConfig = { tabs: [{ route: 'test', active: false }] } as TabsConfig;

    component.tabsConfig = tabsConfig;

    expect(component.tabsConfig).toEqual(tabsConfig);
    expect(handleTabsConfigChangeSpy).toHaveBeenCalled();
  });

  it('should navigate to the correct route when onRouteChanged is called', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const route = 'test';

    component.onRouteChanged(route);

    expect(navigateSpy).toHaveBeenCalledWith([`${PATRON_NAVIGATION.rewards}/${route}`]);
  });
});
