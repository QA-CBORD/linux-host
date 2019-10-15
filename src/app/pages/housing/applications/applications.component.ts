import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApplicationsService } from './applications.service';
import { QuestionsStorageService } from '../questions/questions-storage.service';
import { ApplicationsStateService } from './applications-state.service';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  private _applicationsSubscription: Subscription;

  constructor(
    private _applicationsService: ApplicationsService,
    private _questionsStorageService: QuestionsStorageService,
    public applicationsStateService: ApplicationsStateService
  ) {}

  ngOnInit(): void {
    this._applicationsSubscription = this._applicationsService.getPatronApplications().subscribe();
  }

  ngOnDestroy(): void {
    this._applicationsSubscription.unsubscribe();
  }

  async handleClear(applicationId: number): Promise<void> {
    await this._questionsStorageService.removeApplicationQuestions(applicationId);
  }
}
