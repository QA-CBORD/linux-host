import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnitsTabComponent } from './units-tab.component';

describe('UnitsTabComponent', () => {
  let component: UnitsTabComponent;
  let fixture: ComponentFixture<UnitsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [UnitsTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
