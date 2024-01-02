import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { notifications } from '../notifications.component.spec';
import { IonicModule } from '@ionic/angular';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  const mockDatePipe = {
    transform: jest.fn()
  };
  const mockTranslateService = {
    instant: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [NotificationComponent],
      providers: [
        { provide: DatePipe, useValue: mockDatePipe },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    });
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    component.notifications = notifications.map(notification => ({
      ...notification,
      insertTime: new Date(notification.insertTime),
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
