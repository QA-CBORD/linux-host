import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HousingTabComponent } from './housing-tab/housing-tab.component';
import { HousingTabsComponent } from "./housing-tabs.component";

describe("HousingTabsComponent", () => {
  let component: HousingTabsComponent;
  let fixture: ComponentFixture<HousingTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousingTabsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  describe('Create component!', () => {
    it('should exist', () => {
      expect(component).toBeTruthy();
    });

    it('should add tab', () => {
      component.addTab(new HousingTabComponent(component));
      component.addTab(new HousingTabComponent(component));
      component.addTab(new HousingTabComponent(component));
      component.addTab(new HousingTabComponent(component));
      component.addTab(new HousingTabComponent(component));
      component.addTab(new HousingTabComponent(component));
      component.addTab(new HousingTabComponent(component));
      expect(component.tabs.length).toEqual(7);
    });

    it('should select first tab as default', () => {
      let tab = new HousingTabComponent(component);
      tab.tabTitle = "first";
      component.addTab(tab);
      tab.tabTitle = "second";
      component.addTab(tab);
      tab.tabTitle = "third";
      component.addTab(tab);
      expect(component.selectedTab).toEqual("first");
    });
  });
})