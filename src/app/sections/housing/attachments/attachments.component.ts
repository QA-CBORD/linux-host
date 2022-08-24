import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AttachmentStateService } from './attachments-state.service';
import { TermsService } from '../terms/terms.service';
import { statusBarForm } from 'src/app/app.global';

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

  constructor(
    public _attachmentStateService: AttachmentStateService,
    private _termService: TermsService
  ) { }

  ngOnInit() {
    this._initTermsSubscription();
  }

  private _initTermsSubscription() {
    this._subscription.add(
      this._termService.termId$
        .subscribe(termId => {
          this.urlEditForm = `/patron/housing/attachment/${termId}/`;
          this.selectedTermKey = termId;
        }));

  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  getStatus(key: number): string {
    if (key || key !== 0) {
      return statusBarForm.SUBMITTED;
    }

    return statusBarForm.NEW;
  }

  createAttachmentDefault(id?: string): string {
    return `/patron/housing/attachments/${id}`;
  }

  getPath(key: number): string {
    return `/patron/housing/attachments/${key}`;
  }
}
