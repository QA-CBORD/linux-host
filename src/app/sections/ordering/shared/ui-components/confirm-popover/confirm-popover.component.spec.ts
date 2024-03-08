import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmPopoverComponent } from './confirm-popover.component';
import { PopupTypes } from '@sections/rewards/rewards.config';

describe('ConfirmPopoverComponent', () => {
  let component: ConfirmPopoverComponent;
  let fixture: ComponentFixture<ConfirmPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmPopoverComponent]
    });
    fixture = TestBed.createComponent(ConfirmPopoverComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should merge data input with default config on ngOnInit', () => {
    const mockData = {
     "type": PopupTypes.CLAIM,
     "title": "title",
     "code": "",
     "message": "",
    };

    component.data = mockData;
    component.ngOnInit();

    expect(component.config).toBeDefined();
  });
});
