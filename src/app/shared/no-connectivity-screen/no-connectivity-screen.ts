import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { ConnectionService } from '@shared/services/connection-service';
import { ConnectivityScreenCsModel } from './model/no-connectivity.cs.model';
import { RetryHandler } from './model/retry-handler';

@Component({
  selector: 'st-no-connectivity-screen',
  templateUrl: './no-connectivity-screen.html',
  styleUrls: ['./no-connectivity-screen.scss'],
})
export class NoConnectivityScreen implements OnInit, AfterViewInit {

  @Input() strings: ConnectivityScreenCsModel;

  @Input() retryHandler: RetryHandler;

  isLoading: boolean = false;

  constructor(
    private readonly networkService: ConnectionService,
    private readonly loadingService: LoadingService,
    public readonly modalController: ModalController
  ) { }

  ngOnInit() {
    this.onNetworkStatusChanged();
  }

  async retryOperations() {
    this.loadingService.showSpinner();
    if ((await this.retryHandler.onRetry())) {
      await this.loadingService.closeSpinner();
      await this.modalController.dismiss();
    } else {
      await this.loadingService.closeSpinner();
    }
  }

  ngAfterViewInit(): void {
    this.validateComponentInput();
  }

  validateComponentInput(): void {
    if (!this.strings)
      throw new Error('Content Strings must be provided.');
    if (!this.retryHandler)
      throw new Error('retry handler must be provided.');
  }

  onNetworkStatusChanged() {
    this.networkService.networkStatus(200)
      .subscribe({
        next: (online) => console.log("isOnline: ", online),
        error: (err) => console.log('ERROR: ', err)
      })
  }
}
