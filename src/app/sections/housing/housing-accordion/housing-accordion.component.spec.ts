import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingAccordionComponent } from './housing-accordion.component';

describe('HousingAccordionComponent', () => {
  let component: HousingAccordionComponent;
  let fixture: ComponentFixture<HousingAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
