import { Plugins } from '@capacitor/core';
import { Subject } from 'rxjs';
const { HIDPlugin } = Plugins;

interface HIDSdkTransactionResponse {
  transactionStatus: string | any;
}

interface ExecutionOptions {
  maxExecutionCount: number;
  executionInterval: number;
  executionTrace?: number;
}

class ExecutionController {
  constructor(
    private config: {
      execOptions: ExecutionOptions;
      onCompleteCallback: (data?: any) => void;
    }
  ) {
    config.execOptions.executionTrace = 0;
  }

  get currentExecCount(): number {
    return this.config.execOptions.executionTrace;
  }

  get maxExecutionCount(): number {
    return this.config.execOptions.maxExecutionCount;
  }

  get remainingExecCount(): number {
    return this.maxExecutionCount - this.currentExecCount;
  }

  incrementExecCount(): void {
    this.config.execOptions.executionTrace++;
  }
  maxExecutionReached(): boolean {
    return this.config.execOptions.executionTrace == this.config.execOptions.maxExecutionCount;
  }
  stopTaskExecution(result?: any): void {
    this.config.onCompleteCallback(result);
    this.config.execOptions.executionTrace = 0;
  }
}

export enum EndpointStatuses {
  SETUP_ACTIVE = 1,
  SETUP_INACTIVE = 0,
  NOT_SETUP = -1,
  LOCATION_PERMISSION_REQUIRED = 2,
}

export class HIDSdkManager {
  static TRANSACTION_SUCCESS = 'success';
  static TRANSACTION_FAILED = 'failed';
  static LOCATION_PERMISSION_REQUIRED = 'LOCATION_PERMISSION_REQUIRED';
  private static instance: HIDSdkManager;
  public subject: Subject<EndpointStatuses> = new Subject<EndpointStatuses>();

  private constructor() {}

  static getInstance(): HIDSdkManager {
    if (!this.instance) {
      this.instance = new HIDSdkManager();
    }
    return this.instance;
  }

  async initializeSdk(): Promise<boolean> {
    const initializationStatus = await this.executeCall<string>(HIDPlugin.initializeSdk);
    return initializationStatus == HIDSdkManager.TRANSACTION_SUCCESS || Promise.reject(initializationStatus);
  }

  async endpointStatus(): Promise<EndpointStatuses> {
    if (await this.isEndpointSetup$()) {
      if (await this.isEndpointActive()) {
        return EndpointStatuses.SETUP_ACTIVE;
      } else {
        return EndpointStatuses.SETUP_ACTIVE;
      }
    } else {
      return EndpointStatuses.NOT_SETUP;
    }
  }

  async setupEndpoint(invitationCode: string): Promise<string> {
    return await this.executeCall(HIDPlugin.setupEndpoint, { invitationCode });
  }

  async deleteEndpoint(): Promise<string> {
    return await this.executeCall(HIDPlugin.deleteEndpoint);
  }

  async getEndpointInfo(): Promise<object> {
    return await this.executeCall(HIDPlugin.getEndpointInfo);
  }

  async isEndpointSetup$(): Promise<boolean> {
    return await this.executeCall(HIDPlugin.isEndpointSetup);
  }

  async isEndpointActive(): Promise<boolean> {
    if (await this.refreshEndpoint()) {
      return await this.executeCall<boolean>(HIDPlugin.isEndpointActive);
    } else {
      return false;
    }
  }

  private async executeCall<T>(pluginCall: (param?) => Promise<HIDSdkTransactionResponse>, args?: any): Promise<T> {
    let transactionResponse: HIDSdkTransactionResponse = await pluginCall(args);
    return transactionResponse.transactionStatus;
  }

  async refreshEndpoint(): Promise<boolean> {
    return (await this.executeCall(HIDPlugin.refreshEndpoint)) == HIDSdkManager.TRANSACTION_SUCCESS;
  }

  private async taskExecutor(controller: ExecutionController): Promise<void> {
    controller.incrementExecCount();
    let locationPermissionRequired: boolean = false;
    let executeCall = async (pluginCall: (param?) => Promise<HIDSdkTransactionResponse>, args?: any): Promise<any> => {
      let transactionResponse: HIDSdkTransactionResponse = await pluginCall(args);
      return transactionResponse.transactionStatus;
    };

    let endpointRefreshSuccess = async (): Promise<boolean> => {
      let endpointRefreshResult = await executeCall(HIDPlugin.refreshEndpoint);
      return endpointRefreshResult == HIDSdkManager.TRANSACTION_SUCCESS;
    };
    let isEndpointActiveNow = async (): Promise<boolean> => {
      return await executeCall(HIDPlugin.isEndpointActive);
    };
    let startScanningSuccess = async (): Promise<boolean> => {
      let startScanTransactionResult = await executeCall(HIDPlugin.startScanning);
      locationPermissionRequired = startScanTransactionResult == HIDSdkManager.LOCATION_PERMISSION_REQUIRED;
      return startScanTransactionResult == HIDSdkManager.TRANSACTION_SUCCESS;
    };
    if ((await endpointRefreshSuccess()) && !controller.maxExecutionReached()) {
      if (await isEndpointActiveNow()) {
        if (await startScanningSuccess()) {
          controller.stopTaskExecution(EndpointStatuses.SETUP_ACTIVE); // mobile credential is in a "fine state", whoohoo!!!
        } else if (locationPermissionRequired && controller.remainingExecCount == 1) {
          controller.stopTaskExecution(EndpointStatuses.LOCATION_PERMISSION_REQUIRED);
        }
      }
    } else if (controller.maxExecutionReached()) {
      controller.stopTaskExecution(EndpointStatuses.SETUP_INACTIVE);
    } else {
      controller.stopTaskExecution(EndpointStatuses.NOT_SETUP);
    }
  }

  private async startTaskExecution(execOptions: ExecutionOptions): Promise<void> {
    let intervalId = setInterval(
      this.taskExecutor,
      execOptions.executionInterval,
      new ExecutionController({
        execOptions,
        onCompleteCallback: data => {
          clearInterval(intervalId);
          this.subject.next(data);
        },
      })
    );
  }

  async doPostInstallWork(): Promise<void> {
    this.startTaskExecution({
      maxExecutionCount: 25,
      executionInterval: 5000,
    });
  }

  async doPostInitWork(): Promise<void> {
    this.startTaskExecution({
      maxExecutionCount: 25,
      executionInterval: 5000,
    });
  }
}
