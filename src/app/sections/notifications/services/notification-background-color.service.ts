import { Injectable } from '@angular/core';
import { IonItemSliding, ItemSlidingCustomEvent } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationBackgroundColorService {
  private notificationsSwiped: HTMLElement[] = [];

  private color = {
    RED: '#fed1cf',
    PURPLE: '#f4eaf8',
    WHITE: 'white',
  };

  private location = {
    BACKGROUND: '--background',
    SIDE: {
      left: -1,
      right: 1,
    },
  };


  async setBackgroundColor(event: ItemSlidingCustomEvent) {
    const ratio = await event.target.getSlidingRatio();
    if (ratio > this.location.SIDE.right) {
      this.setElementBackground(event, this.color.RED);
    } else if (ratio < this.location.SIDE.left) {
      this.setElementBackground(event,this.color.PURPLE);
    } else {
      this.resetElementBackground();
    }

    if (this.isElementAvailable(event)) {
      this.notificationsSwiped.push(event.target.firstChild.nextSibling as HTMLElement);
    }
  }

  async resetList(ionItem: IonItemSliding) {
    await ionItem.closeOpened();
    this.resetElementBackground();
  }

  private setElementBackground(event: ItemSlidingCustomEvent, color: string) {
    if (this.isElementAvailable(event)) {
      const element = event.target.firstChild.nextSibling as HTMLElement;
      element.style.setProperty(this.location.BACKGROUND, color);
    }
  }

  private resetElementBackground() {
    this.notificationsSwiped.forEach(item => {
      item.style.setProperty(this.location.BACKGROUND, this.color.WHITE);
    });
    this.notificationsSwiped = [];
  }

  private isElementAvailable(event: ItemSlidingCustomEvent) {
    return event.target?.firstChild?.nextSibling;
  }
}
