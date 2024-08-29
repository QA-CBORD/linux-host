import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { is } from 'date-fns/locale';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockTranslateService = {
    currentLang: 'en',
    setTranslation: jest.fn(),
  };

  const platformStub = {
    ready: jest.fn().mockReturnValue(Promise.resolve()),
    is: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: Platform, useValue: platformStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    component.isBackdropShown$;
    expect(component).toBeTruthy();
  });

  it('should custom load for Android', () => {
    platformStub.is.mockReturnValueOnce(true);
    expect(component).toBeTruthy();
  });
});
