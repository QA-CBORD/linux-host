import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IonItemSliding, IonicModule, ItemSlidingCustomEvent } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NotificationBackgroundColorService } from '../services/notification-background-color.service';
import { NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { notifications } from '../notifications.component.spec';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  const mockIonItem: IonItemSliding = {} as any;

  const mockTranslateService = {
    instant: jest.fn().mockReturnValue(''),
  };

  const mockUserNotificationsFacadeService = {
    fetchNotifications: jest.fn().mockResolvedValue(true),
    refreshNotifications: jest.fn(),
    deleteNotification: jest.fn(),
    markAsPinned: jest.fn(),
    markAsDismissed: jest.fn(),
  };

  const mockToastService = {
    showToast: jest.fn(() => ({
      onDidDismiss: jest.fn().mockResolvedValue({ data: true }),
    })),
  };
  const mockNotificationColoring = {
    setBackgroundColor: jest.fn(),
    resetList: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, HttpClientTestingModule],
      declarations: [NotificationComponent],
      providers: [
        { provide: DatePipe },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: UserNotificationsFacadeService, useValue: mockUserNotificationsFacadeService },
        { provide: ToastService, useValue: mockToastService },
        { provide: NotificationBackgroundColorService, useValue: mockNotificationColoring },
      ],
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

  it('should unpin a notification', async () => {
    await component.unpin(notifications[0] as any, mockIonItem);
    expect(mockUserNotificationsFacadeService.markAsPinned).toHaveBeenCalled();
    expect(mockUserNotificationsFacadeService.fetchNotifications).toHaveBeenCalled();
  });

  it('should pin a notification', async () => {
    await component.pin(notifications[0] as any, mockIonItem);
    expect(mockUserNotificationsFacadeService.markAsPinned).toHaveBeenCalled();
    expect(mockUserNotificationsFacadeService.fetchNotifications).toHaveBeenCalled();
  });

  it('should delete a notification', async () => {
    await component.delete(notifications[0] as any, mockIonItem);
    expect(mockUserNotificationsFacadeService.markAsDismissed).toHaveBeenCalled();
    expect(mockUserNotificationsFacadeService.fetchNotifications).toHaveBeenCalled();
  });

  it('should handle drag event', async () => {
    const mockEvent: ItemSlidingCustomEvent = {} as any;
    await component.onDrag(mockEvent);
    expect(mockNotificationColoring.setBackgroundColor).toHaveBeenCalled();
  });

  it('should refresh notifications', async () => {
    await component['refreshNotifications'](mockIonItem);
    expect(mockUserNotificationsFacadeService.fetchNotifications).toHaveBeenCalled();
  });

  it('should check if a date is today', () => {
    const today = new Date();
    const result = component['isToday'](today);
    expect(result).toBe(true);
  });

  it('should show a toast with unpin status', async () => {
    await component.unpin(notifications[0] as any, mockIonItem);
    expect(mockToastService.showToast).toHaveBeenCalled();
  });

  it('should show a toast with delete status', async () => {
    await component.unpin(notifications[0] as any, mockIonItem);
    expect(mockToastService.showToast).toHaveBeenCalled();
  });

  it('should no show a toast with pin status', async () => {
    jest.resetAllMocks();
    await component.pin(notifications[0] as any, mockIonItem);
    expect(mockToastService.showToast).not.toHaveBeenCalled();
  });
});
