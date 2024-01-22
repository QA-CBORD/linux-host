import { Injectable } from "@angular/core";
import { IonItemSliding, ItemSlidingCustomEvent } from "@ionic/angular";

@Injectable({
    providedIn: 'root',
  })
  export class NotificationBackgroundEffect {
    private notificationsSwiped: HTMLElement[] = [];

    private colors = {
      RED_COLOR: 'rgba(188, 14, 50, 0.5)',
      PURPLE_COLOR: 'rgba(157, 84, 199, 0.5)',
    };
  
    private constants = {
      PROPERTY: '--background',
      SIDE: {
        left: -1,
        right: 1,
      },
    };
  
    private config = {
      ...this.colors,
      ...this.constants,
    };

    async setBackgroundColor(event: ItemSlidingCustomEvent) {
        const ratio = await event.target.getSlidingRatio();
        if (ratio > this.config.SIDE.right) {
          this.setElementBackground(event.target, this.config.RED_COLOR);
        } else if (ratio < this.config.SIDE.left) {
          this.setElementBackground(event.target, this.config.PURPLE_COLOR);
        } else {
          this.resetElementBackground();
        }
    
        if (event.target && event.target.firstChild && event.target.firstChild.nextSibling) {
          this.notificationsSwiped.push(event.target.firstChild.nextSibling as HTMLElement);
        }
      }

      async resetList(ionItem: IonItemSliding) {
        await ionItem.closeOpened();
        this.resetElementBackground();
      }

      private setElementBackground(target: HTMLIonItemSlidingElement, color: string) {
        if (target && target.firstChild && target.firstChild.nextSibling) {
          const element = target.firstChild.nextSibling as HTMLElement;
          element.style.setProperty(this.config.PROPERTY, color);
        }
      }

      private resetElementBackground() {
        this.notificationsSwiped.forEach(item => {
          item.style.setProperty(this.config.PROPERTY, 'white');
        });
        this.notificationsSwiped = [];
      }
    
  }