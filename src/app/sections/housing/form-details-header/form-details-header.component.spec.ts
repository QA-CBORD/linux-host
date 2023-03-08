import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailsHeaderComponent } from './form-details-header.component';

describe('FormDetailsHeaderComponent', () => {
  let component: FormDetailsHeaderComponent;
  let fixture: ComponentFixture<FormDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDetailsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
