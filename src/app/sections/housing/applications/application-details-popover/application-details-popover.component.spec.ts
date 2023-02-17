import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsPopover } from './application-details-popover.component';

describe('ApplicationDetailsPopoverComponent', () => {
  let component: ApplicationDetailsPopover;
  let fixture: ComponentFixture<ApplicationDetailsPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDetailsPopover ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationDetailsPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
