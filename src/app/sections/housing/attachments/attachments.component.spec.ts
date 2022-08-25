import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttachmentsComponent } from './attachments.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActionsModule } from '../actions/actions.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AttachmentStateService } from './attachments-state.service';
import { TermsService } from '../terms/terms.service';
import { EMPTY } from 'rxjs';

describe('AttachmentsComponent', () => {
  let component: AttachmentsComponent;
  let fixture: ComponentFixture<AttachmentsComponent>;
  let attachmentStateService,termService;

  beforeEach(waitForAsync(() => {
    termService = {
      termId$: EMPTY
    }
    attachmentStateService = {
      getAttachmentList: jest.fn()
    }
  }))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        IonicModule,
        ActionsModule,
        RouterModule,
        HttpClientModule
      ],
      declarations: [ AttachmentsComponent ],
      providers: [
        { provide: AttachmentStateService, useValue: attachmentStateService },
        { provide: TermsService, useValue: termService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
