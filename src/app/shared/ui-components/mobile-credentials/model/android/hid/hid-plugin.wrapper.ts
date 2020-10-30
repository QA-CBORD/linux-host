import { Plugins } from '@capacitor/core';
const { HIDPlugin } = Plugins;

interface HIDSdkTransactionResponse {
  sdkTransactionResult: string | any;
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
      onCompleteCallback: () => void;
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
    this.config.onCompleteCallback();
    this.config.execOptions.executionTrace = 0;
  }
}

export class HIDSdkManager {
  static TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';
  static TRANSACTION_FAILED = 'TRANSACTION_FAILED';
  static LOCATION_PERMISSION_REQUIRED = 'LOCATION_PERMISSION_REQUIRED';
  private static instance: HIDSdkManager;
  private constructor() {}

  static getInstance(): HIDSdkManager {
    if (!this.instance) {
      this.instance = new HIDSdkManager();
    }
    return this.instance;
  }

  async initializeSdk(): Promise<string> {
    return await this.executeCall(HIDPlugin.initializeSdk);
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
    return transactionResponse.sdkTransactionResult;
  }

  async refreshEndpoint(): Promise<boolean> {
    return (await this.executeCall(HIDPlugin.refreshEndpoint)) == HIDSdkManager.TRANSACTION_SUCCESS;
  }

  private async taskExecutor(controller: ExecutionController): Promise<void> {
    controller.incrementExecCount();
    let locationPermissionRequired: boolean = false;
    let executeCall = async (pluginCall: (param?) => Promise<HIDSdkTransactionResponse>, args?: any): Promise<any> => {
      let transactionResponse: HIDSdkTransactionResponse = await pluginCall(args);
      return transactionResponse.sdkTransactionResult;
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
          controller.stopTaskExecution(); // mobile credential is in a "fine state", whoohoo!!!
        } else if (locationPermissionRequired && controller.remainingExecCount == 1) {
          controller.stopTaskExecution();
          // notify user that location needs to be turned on for mobile credential to work.
        }
      }
    } else if (controller.maxExecutionReached()) {
      controller.stopTaskExecution();
      // notify user that something went wrong with his mobile credential.
    }
  }

  private async startTaskExecution(execOptions: ExecutionOptions): Promise<void> {
    let intervalId = setInterval(
      this.taskExecutor,
      execOptions.executionInterval,
      new ExecutionController({
        execOptions,
        onCompleteCallback: () => clearInterval(intervalId),
      })
    );
  }

  async doPostInstallWork(): Promise<void> {
    this.startTaskExecution({
      maxExecutionCount: 10,
      executionInterval: 3000,
    });
  }

  async doPostInitWork(): Promise<void> {
    this.startTaskExecution({
      maxExecutionCount: 15,
      executionInterval: 3500,
    });
  }
}
