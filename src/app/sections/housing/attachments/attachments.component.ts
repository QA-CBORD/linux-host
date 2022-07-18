import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AttachmentsService } from './attachments.service';

import { Attachment } from './attachments.model';
import { AttachmentStateService } from './attachments-state.service';
import { TermsService } from '../terms/terms.service';
import { ROLES } from 'src/app/app.global';

@Component({
  selector: 'st-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public urlEditForm: string;
  private selectedTermKey = 0;

  constructor(private _attachmentsService: AttachmentsService,
    public _workOrderStateService: AttachmentStateService,
    private _termService : TermsService
    ) {}

  workOrders: Attachment[];

  ngOnInit() {
    // const workOrdersSubscription: Subscription = this._attachmentsService
    //   .getAttachments()
    //   .subscribe();

    // this._initTermsSubscription();
    // this._subscription.add(workOrdersSubscription);
  }

  private _initTermsSubscription() {
    this._subscription.add(
      this._termService.termId$
          .subscribe(termId => {
            this.urlEditForm = `/patron/housing/work-orders/${termId}/`;
            this.selectedTermKey = termId;
          }));
    
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  getStatus(key: number): string {
    if (key || key !== 0) {
      return 'Submitted'
    }

    return 'New';
  }
  
  createAttachmentDefault(): string {
    return `/patron/housing/attachments`;
  }

  getPath(key: number): string {
    return `${ROLES.patron}/housing/work-orders/${this.selectedTermKey}/${key}`;
  }

  getClass(key: number){
    if(key === 1){
      return 'open';
    }else if(key === 2){
      return 'inProcess';
    }else if(key === 6){
      return 'close';
    }else if(key === 5){
      return 'toCancel';
    }else if(key === 90){
      return 'cleaning';
    }else {
      return 'thinking';
    }
  }
}
