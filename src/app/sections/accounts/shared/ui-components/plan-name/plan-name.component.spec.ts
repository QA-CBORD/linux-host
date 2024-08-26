import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNameComponent } from './plan-name.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlanNameComponent', () => {
  let component: PlanNameComponent;
  let fixture: ComponentFixture<PlanNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanNameComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a planName$', () => {
    expect(component.planName$).toBeDefined();
  });
});
