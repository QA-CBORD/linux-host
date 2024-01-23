import { NotificationBackgroundColorService } from './notification-background-color.service';
import { TestBed } from '@angular/core/testing';

describe('NotificationBackgroundColoring', () => {
  let service: NotificationBackgroundColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBackgroundColorService);
  });

  it('should set the background color of an element', () => {
    expect(service).toBeTruthy();
  });
});
