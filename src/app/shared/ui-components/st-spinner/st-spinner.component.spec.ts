import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StSpinnerComponent } from './st-spinner.component';

describe('StSpinnerComponent', () => {
  let component: StSpinnerComponent;
  let fixture: ComponentFixture<StSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input for refreshText', () => {
    const testRefreshText = 'Test Refresh Text';
    component.refreshText = testRefreshText;
    expect(component.refreshText).toBe(testRefreshText);
  });
});