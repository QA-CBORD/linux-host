import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { CartService } from '@sections/ordering/services';
import { CaloriesDisplayPipe } from '@shared/pipes/calories-display-pipe/calories-display.pipe';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let environmentFacadeService = {
    getImageURL: jest.fn().mockReturnValue(''),
  };
  const cartService = {
    caloriesDisplay: jest.fn().mockReturnValue(''),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: CartService, useValue: cartService },
      ],
      imports: [CategoryListComponent,CaloriesDisplayPipe],
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
