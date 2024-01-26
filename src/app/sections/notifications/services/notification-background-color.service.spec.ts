import { TestBed } from '@angular/core/testing';
import { ItemSlidingCustomEvent } from '@ionic/angular';
import { NotificationBackgroundColorService } from './notification-background-color.service';

describe('NotificationBackgroundColoring', () => {
  let service: NotificationBackgroundColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBackgroundColorService);
  });

  it('should set the background color of an element', () => {
    expect(service).toBeTruthy();
  });

  it('should call background', async () => {
    const spy = jest.spyOn(service as any, 'setElementBackground');
    const event = createItemSlidingCustomEvent(-2);
    await service.setBackgroundColor(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should turn background as red', async () => {
    const event = createItemSlidingCustomEvent(2);
    await service.setBackgroundColor(event);
    const notificationItem = event.target.firstChild.nextSibling as HTMLElement;
    expect(notificationItem.style.getPropertyValue(service['location'].BACKGROUND)).toBe(service['color'].RED);
  });

  it('should turn background as purple', async () => {
    const event = createItemSlidingCustomEvent(-2);
    await service.setBackgroundColor(event);
    const notificationItem = event.target.firstChild.nextSibling as HTMLElement;
    expect(notificationItem.style.getPropertyValue(service['location'].BACKGROUND)).toBe(service['color'].PURPLE);
  });

  it('should turn background as white', async () => {
    const event = createItemSlidingCustomEvent(1);
    const spyReset = jest.spyOn(service as any, 'resetElementBackground');
    await service.setBackgroundColor(event);
    expect(spyReset).toHaveBeenCalled();
  });

  it('should turn background as white', async () => {
    const spyReset = jest.spyOn(service as any, 'resetElementBackground');
    const ionItem = {
      closeOpened: jest.fn().mockResolvedValue(true),
    };
    await service.resetList(ionItem as any);
    expect(spyReset).toHaveBeenCalled();
  });

  function createSlidingItem(): ItemSlidingCustomEvent {
    const target = document.createElement('ion-item-sliding');
    return { target } as ItemSlidingCustomEvent;
  }

  function createItemSlidingCustomEvent(ratio: number) {
    const event = createSlidingItem();
    event.target.getSlidingRatio = jest.fn().mockResolvedValue(ratio);
    event.target.insertAdjacentElement('afterbegin', document.createElement('ion-item'));
    event.target.appendChild(document.createElement('ion-item'));
    return event;
  }
});
