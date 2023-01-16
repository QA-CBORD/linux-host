import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RoommateSearchOptions } from '@sections/housing/applications/applications.model';
import { SearchByPage } from './search-by.page';

describe('SearchByPage', () => {
  let component: SearchByPage;
  let fixture: ComponentFixture<SearchByPage>;
  beforeEach(() => {
    const routerStub = () => ({ navigate: () => ({}) });
    const applicationsStateServiceStub = () => ({
      roommateSearchOptions: { pipe: () => ({ subscribe: f => f({}) }) },
      setRoommateSearchOptions: () => ({}),
      isSubmitted: () => ({}),
      applicationsState: {
        applicationDetails: { applicationDefinition: { key: {} } },
      },
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchByPage],
      providers: [
        { provide: FormBuilder },
        { provide: Router, useFactory: routerStub },
        {
          provide: ApplicationsStateService,
          useFactory: applicationsStateServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(SearchByPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`firstInputName has default value`, () => {
    expect(component.firstInputName).toEqual(`first`);
  });

  it(`secondInputName has default value`, () => {
    expect(component.secondInputName).toEqual(`second`);
  });

  describe('searchRoommates', () => {
    it('makes expected calls', () => {
      const applicationsStateServiceStub: ApplicationsStateService =
        fixture.debugElement.injector.get(ApplicationsStateService);
      const roommateSearchOptionsStub: RoommateSearchOptions = <any>{};
      jest.spyOn(applicationsStateServiceStub, 'setRoommateSearchOptions');

      component.searchForm = component['fb'].group({
        [component.firstInputName]: [''],
        [component.secondInputName]: [''],
      });
      component.searchRoommates(roommateSearchOptionsStub);
      expect(applicationsStateServiceStub.setRoommateSearchOptions).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(FormBuilder);
      jest.spyOn(formBuilderStub, 'group');
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('isApplicationSubmitted', () => {
    it('makes expected calls', () => {
      const applicationsStateServiceStub: ApplicationsStateService =
        fixture.debugElement.injector.get(ApplicationsStateService);
      jest.spyOn(applicationsStateServiceStub, 'isSubmitted');
      component.isApplicationSubmitted();
      expect(applicationsStateServiceStub.isSubmitted).toHaveBeenCalled();
    });
  });
});
