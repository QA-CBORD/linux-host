import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ShowMoreComponent } from './show-more.component';

describe('StActivateLocationItemComponent', () => {
  let component: ShowMoreComponent;
  let fixture: ComponentFixture<ShowMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [ShowMoreComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
