import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionInfoComponent } from './nutrition-info.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/testing/classes/translate-service.spec';

describe('NutritionInfoComponent', () => {
  let component: NutritionInfoComponent;
  let fixture: ComponentFixture<NutritionInfoComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionInfoComponent],
      providers: [{ provide: TranslateService, useClass: TranslateServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
