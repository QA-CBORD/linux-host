import { ComponentFixture, TestBed } from '@angular/core/testing';
import { now } from '@ionic/core/dist/types/utils/helpers';

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
    const date = new Date();
    component.details = {
      name: "",
      isSubmitted: true,
      created: date,
      firstSubmitted: date,
      lastSubmitted: date
    };
    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });
});
