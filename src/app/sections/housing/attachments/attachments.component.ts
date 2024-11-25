import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AttachmentStateService } from './attachments-state.service';
import { TermsService } from '../terms/terms.service';
import { statusBarForm } from 'src/app/app.global';
import { Router } from '@angular/router';

@Component({
  selector: 'st-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public urlEditForm: string;

  constructor(
    public _attachmentStateService: AttachmentStateService,
    public _termService: TermsService,
    private router: Router
  ) { }

  ngOnInit() {
    this._initTermsSubscription();
  }

  private _initTermsSubscription() {
    this._subscription.add(
      this._termService.termId$
        .subscribe(termId => {
          this.urlEditForm = `/patron/housing/attachment/${termId}/`;
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

  createAttachmentDefault(id?: string) {
    this.router.navigateByUrl(`/patron/housing/attachments/${id}`);
  }

  getPath(key: number): string {
    return `/patron/housing/attachments/${key}`;
  }
}
