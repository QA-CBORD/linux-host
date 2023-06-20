import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HousingTabsComponent } from '../housing-tabs.component';
import { HousingTabComponent } from './housing-tab.component';

describe('HousingTabComponent', () => {
  let component: HousingTabComponent;
  let fixture: ComponentFixture<HousingTabComponent>;

  beforeEach(() => {
    const housingTabsComponentStub = () => ({ addTab: arg => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HousingTabComponent],
      providers: [
        { provide: HousingTabsComponent, useFactory: housingTabsComponentStub }
      ]
    });
    fixture = TestBed.createComponent(HousingTabComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const housingTabsComponentStub: HousingTabsComponent = fixture.debugElement.injector.get(
        HousingTabsComponent
      );
     jest.spyOn(housingTabsComponentStub, 'addTab');
      component.ngOnInit();
      expect(housingTabsComponentStub.addTab).toHaveBeenCalled();
    });
  });
});
