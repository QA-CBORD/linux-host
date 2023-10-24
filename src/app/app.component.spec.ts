import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const platformStub = () => ({ ready: () => ({}), is: string => ({}) });
    const mockTranslateService = {
      currentLang: 'en',
      setTranslation: jest.fn(),
    };
  
    await TestBed.configureTestingModule({
      imports: [TranslateModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: Platform, useFactory: platformStub }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
