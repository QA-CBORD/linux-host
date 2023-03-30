import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StAlertBannerComponent } from './st-alert-banner.component';

describe('StAlertBannerComponent', () => {
  let component: StAlertBannerComponent;
  let fixture: ComponentFixture<StAlertBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StAlertBannerComponent],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StAlertBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
