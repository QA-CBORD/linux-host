import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPreviewComponent } from './cart-preview.component';
import { NavigationService } from '@shared/index';

describe('CartPreviewComponent', () => {
  let component: CartPreviewComponent;
  let fixture: ComponentFixture<CartPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPreviewComponent],
      providers: [
        { provide: NavigationService, useValue: {} },

      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
