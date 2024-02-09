import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let environmentFacadeService = {
    getImageURL: jest.fn().mockReturnValue(''),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: EnvironmentFacadeService, useValue: environmentFacadeService }],
      imports: [CategoryListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate...', () => {
    expect(component).toBeTruthy();
  });
});
