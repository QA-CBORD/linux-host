import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StFormsHeaderComponent } from './st-forms-header.component';

describe('StFormsHeaderComponent', () => {
  let component: StFormsHeaderComponent;
  let fixture: ComponentFixture<StFormsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StFormsHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StFormsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
