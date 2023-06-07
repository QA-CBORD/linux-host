import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessibleSelectDirective } from './accessible-select.directive';
import { CUSTOM_ELEMENTS_SCHEMA, Component, DebugElement } from '@angular/core';
import { AccessibleSelectModule } from './accessible-select.module';
import { IonSelect, IonicModule } from '@ionic/angular';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { of } from 'rxjs';
import { ScreenReader } from '@capacitor/screen-reader';
import { By } from '@angular/platform-browser';
import { Term } from '@sections/housing/terms/terms.model';

@Component({
  template: `
    <div>
      <ion-select class="terms-select" interface="popover" mode="md">
        <ion-select-option [value]="term" *ngFor="let term of terms; trackBy: trackById">
          {{ term.termName }}
        </ion-select-option>
      </ion-select>
    </div>
  `,
})
class TestDirectiveComponent {
  terms: Term[] = [{ key: 1, termEndDateTime: '2', termName: 'name', termStartDateTime: '01/01/2020' }];
}

describe(AccessibleSelectDirective, () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let inputEl: DebugElement;
  let directive: AccessibleSelectDirective;

  let _host, _sessionService, _screenReader;

  beforeEach(async () => {
    _host = {
      selectedText: 'hello world',
      ionChange: jest.fn(() => of(null)),
    };
    _sessionService = {
      getIsWeb: jest.fn(() => true),
    };
    _screenReader = {
      isEnabled: jest.fn(() =>
        Promise.resolve({
          value: true,
        })
      ),
      speak: jest.fn(value => Promise.resolve()),
    };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), AccessibleSelectModule],
      declarations: [AccessibleSelectDirective, TestDirectiveComponent],
      providers: [
        { provide: IonSelect, useValue: _host },
        { provide: SessionFacadeService, useValue: _sessionService },
        { provide: ScreenReader, useValue: _screenReader },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('ion-select'));
  });

  it('should create the directive', () => {
    expect(component).toBeTruthy();
  });
});
