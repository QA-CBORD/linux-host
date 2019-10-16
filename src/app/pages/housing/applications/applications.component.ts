import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationsService } from './applications.service';
import { QuestionsStorageService } from '../questions/questions-storage.service';

import { Application } from './applications.model';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  constructor(
    private _applicationsService: ApplicationsService,
    private _questionsStorageService: QuestionsStorageService
  ) {}

  applications$: Observable<Application[]>;

  ngOnInit(): void {
    this.applications$ = this._applicationsService.getApplications();
  }

  async handleClear(applicationId: number): Promise<void> {
    await this._questionsStorageService.removeQuestionsGroup(applicationId);
  }
}
