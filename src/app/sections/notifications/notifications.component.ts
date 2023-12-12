import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'st-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  notificationPeriod = {
    today: this.translateService.instant('patron-ui.notifications.period.today'),
    yesterday: this.translateService.instant('patron-ui.notifications.period.yesterday'),
    pastWeek: this.translateService.instant('patron-ui.notifications.period.pastWeek'),
    pastMonth: this.translateService.instant('patron-ui.notifications.period.pastMonth'),
  };

  //  with Rewards! See what is available to redeem within the Rewards tab.
   
  // ly changed to Dining Cash
  notifications: Notification[] = [
    { title: 'Breakfast Express', message: 'Order #23424', date: new Date(), icon: NotificationIcon.order, status: true },
    { title: 'Reward Claimed', message: 'Contratulations you have reached level 5.', date: new Date(), icon: NotificationIcon.reward, status: true },
    { title: 'Meal Plan', message: 'Your meal plan Meal Account has been succesful.', date: new Date(Date.now() - 24 * 60 * 60 * 1000), icon: NotificationIcon.meal },
    { title: 'Breakfast Express', message: 'It is going great', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), icon: NotificationIcon.order },
    {
      title: 'Photo upload',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.photoUpload, message: 'Your uploaded photo has been rejected.'
      
    },
    {
      title: 'Automatic Deposit',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.automaticDeposit, message: '$100 has been added to your Dining Dollars account.'
    },
    {
      title: 'Guest Deposit Successful',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.guestDeposit, message: 'A guest deposit of $100 was completed.'
    },
    {
      title: 'Low Balance',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.lowBalance, message: 'Your Dinig Dollars account has low balance'
    },
    {
      title: 'Breakfast Express',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.walkOut, message: 'Order Number #334224'
    },
  ];

  notificationGroups: NotificationGroup[] = [];
  notificationTitle: string;

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit() {
    this.groupNotifications();
    this.notificationTitle = this.translateService.instant('patron-ui.notifications.title');
  }

  groupNotifications() {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayDate: Date = new Date();
    const yesterday = new Date(today - 24 * 60 * 60 * 1000);
    const pastWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
    const pastMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, todayDate.getDate());

    this.notificationGroups = [
      {
        date: this.notificationPeriod.today,
        notifications: this.notifications.filter(notification => +notification.date >= today),
      },
      {
        date: this.notificationPeriod.yesterday,
        notifications: this.notifications.filter(
          notification => notification.date >= yesterday && +notification.date < today
        ),
      },
      {
        date: this.notificationPeriod.pastWeek,
        notifications: this.notifications.filter(
          notification => notification.date >= pastWeek && notification.date < yesterday
        ),
      },
      {
        date: this.notificationPeriod.pastMonth,
        notifications: this.notifications.filter(
          notification => notification.date >= pastMonth && notification.date < pastWeek
        ),
      },
    ];
  }

  onIonInfinite($event: any) {
    throw new Error('Method not implemented.');
  }

  canShowPeriod(notifications: Notification[]) {
    return notifications.length > 0;
  }
}

enum NotificationIcon {
  order = 'order',
  meal = 'meal',
  reward = 'reward',
  photoUpload = 'photo-upload',
  automaticDeposit = 'automatic-deposit',
  lowBalance = 'low-balance',
  guestDeposit = 'guest-deposit',
  walkOut = 'walk-out',
}

interface Notification {
  title: string;
  message: string;
  date: Date;
  icon?: NotificationIcon;
  status?: boolean;
}

interface NotificationGroup {
  date: string;
  notifications: Notification[];
}
