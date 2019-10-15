import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ApplicationsService } from './applications.service';
import { QuestionsStorageService } from '../questions/questions-storage.service';
import { ApplicationsStateService } from './applications-state.service';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  constructor(
    private _applicationsService: ApplicationsService,
    private _questionsStorageService: QuestionsStorageService,
    public applicationsStateService: ApplicationsStateService
  ) {}

  ngOnInit() {
    this._applicationsService.getPatronApplications().subscribe();
  }

  async handleClear(applicationId: number): Promise<void> {
    await this._questionsStorageService.removeApplicationQuestions(applicationId);
  }
}
