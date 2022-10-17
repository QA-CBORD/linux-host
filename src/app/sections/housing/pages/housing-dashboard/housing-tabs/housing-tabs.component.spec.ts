import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
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
  });
})