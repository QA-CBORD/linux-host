import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StAlertBannerComponent } from './st-alert-banner.component';

describe('StAlertBannerComponent', () => {
  let component: StAlertBannerComponent;
  let fixture: ComponentFixture<StAlertBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StAlertBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StAlertBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the iconScr correctly', () => {
    const iconScr = 'caution';
    component._iconScr = iconScr;
    expect(component.iconScr).toBe(`/assets/icon/${iconScr}.svg`);
  });
});
