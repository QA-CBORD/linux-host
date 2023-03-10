import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HousingService } from '@sections/housing/housing.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StFormsHeaderComponent } from './st-forms-header.component';
import { housingServiceStub } from '../pages/application-details/application-details.page.spec';

describe('StFormsHeaderComponent', () => {
  let component: StFormsHeaderComponent;
  let fixture: ComponentFixture<StFormsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, CommonModule],
      declarations: [StFormsHeaderComponent],
      providers: [{ provide: HousingService, useFactory: housingServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(StFormsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
