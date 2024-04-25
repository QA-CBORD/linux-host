import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MMobileLocationInfo } from '@sections/dashboard/models';
import { of } from 'rxjs';
import { StActivateLocationItemComponent } from './st-activate-location-item.component';

describe('StActivateLocationItemComponent', () => {
  let component: StActivateLocationItemComponent;
  let fixture: ComponentFixture<StActivateLocationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [ StActivateLocationItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StActivateLocationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind userInfoId input correctly', () => {
    component.userInfoId = 'testId';
    expect(component.userInfoId).toBe('testId');
  });

  it('should bind isShowId input correctly', () => {
    component.isShowId = false;
    expect(component.isShowId).toBe(false);
  });

  it('should bind location$ input correctly', () => {
    const location$ = of({} as MMobileLocationInfo);
    component.location$ = location$;
    expect(component.location$).toBe(location$);
  });
});