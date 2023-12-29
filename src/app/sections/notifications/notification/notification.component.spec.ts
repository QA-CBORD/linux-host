import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  
  const mockDatePipe = {};
  const mockTranslateService = {};
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      providers: [
        { provide: DatePipe, useValue: mockDatePipe },
        { provide: TranslateService, useValue: mockTranslateService }]
    });
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
