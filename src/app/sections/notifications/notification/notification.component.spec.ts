import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { notifications } from '../notifications.component.spec';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, HttpClientTestingModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format the date correctly', () => {
    const formattedNotifications = component.notificationsFormatted(notifications as any);
    expect(formattedNotifications[1].insertTime).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{1,2}/);
  });

  it('should only should the time', () => {
    const formattedNotifications = component.notificationsFormatted(notifications as any);
    expect(formattedNotifications[0].insertTime).toMatch(/\d{1,2}:\d{1,2}/);
  });

  it('should get avatar for notification category', () => {
    const avatar = component.getAvatar(NotificationCategory.order);
    expect(avatar).toBe('order');
  });
});
