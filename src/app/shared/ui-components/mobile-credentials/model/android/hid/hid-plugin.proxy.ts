/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subject } from 'rxjs';
import { EndpointStatuses } from '../../shared/credential-state';
import { registerPlugin } from '@capacitor/core';
const  HIDPlugin  = registerPlugin<any>('HIDPlugin');

interface HIDSdkTransactionResponse {
  transactionStatus: string | any;
}

interface ExecutionOptions {
  maxExecutionCount: number;
  executionInterval: number;
  executionTrace?: number;
}
class Task {
  constructor(
    public executor: (controller: TaskExecutionController) => Promise<unknown>,
    public execOptions: ExecutionOptions
  ) {}
}

class TaskExecutionController {
  constructor(private execOptions: ExecutionOptions, private taskCompletionCallback: (result?: any) => void) {
    execOptions.executionTrace = 0;
  }

  get currentExecCount(): number {
    return this.execOptions.executionTrace;
  }

  get maxExecutionCount(): number {
    return this.execOptions.maxExecutionCount;
  }

  get remainingExecCount(): number {
    return this.maxExecutionCount - this.currentExecCount;
  }

  incrementExecCount(): void {
    this.execOptions.executionTrace++;
  }
  maxExecutionReached(): boolean {
    return this.execOptions.executionTrace == this.execOptions.maxExecutionCount;
  }
  stopTaskExecution(result?: any): void {
    this.taskCompletionCallback(result);
    this.execOptions.executionTrace = 0;
  }
}

export enum HID_SDK_ERR {
  INVALID_INVITATION_CODE = 'INVALID_INVITATION_CODE',
  DEVICE_SETUP_FAILED = 'DEVICE_SETUP_FAILED',
  SDK_INCOMPATIBLE = 'SDK_INCOMPATIBLE',
  DEVICE_NOT_ELIGIBLE = 'DEVICE_NOT_ELIGIBLE',
  ENDPOINT_NOT_SETUP = 'ENDPOINT_NOT_SETUP',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVER_UNREACHABLE = 'SERVER_UNREACHABLE',
  SDK_BUSY = 'SDK_BUSY',
  KEY_ALREADY_INSTALLED = 'KEY_ALREADY_INSTALLED',
  TRANSACTION_SUCCESS = 'success',
  TRANSACTION_FAILED = 'failed',
  LOCATION_PERMISSION_REQUIRED = 'LOCATION_PERMISSION_REQUIRED',
  TRANSACTION_FAILED_INVALID_KEY= 'invalid key',
}

export enum HID_WALLET_SDK_ERR {
  WALLET_ACCOUNT_NOT_AVAILABLE = "WALLET_ACCOUNT_NOT_AVAILABLE",
  ADD_CARD_TO_WALLET_FAILED = "ADD_CARD_TO_WALLET_FAILED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  INVALID_APPLICATION_ID = "INVALID_APPLICATION_ID",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  OS_NOT_COMPATIBLE = "OS_NOT_COMPATIBLE",
  DEVICE_NOT_COMPATIBLE = "DEVICE_NOT_COMPATIBLE",
  TAP_AND_PAY_UNAVAILABLE = "TAP_AND_PAY_UNAVAILABLE",
  TAP_AND_PAY_NO_ACTIVE_WALLET = "TAP_AND_PAY_NO_ACTIVE_WALLET",
  MULTIPLE_WALLET_NOT_SUPPORTED = "MULTIPLE_WALLET_NOT_SUPPORTED",
  WALLET_READY_TO_USE = "WALLET_READY_TO_USE",
  PLAY_SERVICE_NOT_SUPPORTED = "PLAY_SERVICE_NOT_SUPPORTED",
  MULTIPLE_IDP_NOT_SUPPORTED_TEMPORARILY = "MULTIPLE_IDP_NOT_SUPPORTED_TEMPORARILY",
  INVALID_INVITATION_CODE = "INVALID_INVITATION_CODE",
  ISSUANCE_TOKEN_EXPIRED = "ISSUANCE_TOKEN_EXPIRED",
  UNSUPPORTED_REQUEST = "UNSUPPORTED_REQUEST",
  INVALID_ISSUANCE_TOKEN = "INVALID_ISSUANCE_TOKEN",
  ORIGO_ENVIRONMENT_MISMATCH_ERROR = "ORIGO_ENVIRONMENT_MISMATCH_ERROR"
}


class TaskExecutor {
  private intervalId: any;
  constructor(private task: Task, private taskCompletionCallback: (result) => void) {}

  initTask(): void {
    const task = this.task;
    const taskCompletionCallback = this.taskCompletionCallback;
    this.intervalId = setInterval(
      task.executor,
      task.execOptions.executionInterval,
      new TaskExecutionController(task.execOptions, result => {
        clearInterval(this.intervalId);
        taskCompletionCallback(result);
      })
    );
  }

  stopExecution(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

export class HIDPlugginProxy {
  private static instance: HIDPlugginProxy;
  taskExecutionObs$: Subject<EndpointStatuses> = new Subject<EndpointStatuses>();
  private taskExecutor: TaskExecutor;

  static getInstance(): HIDPlugginProxy {
    if (!this.instance) {
      this.instance = new HIDPlugginProxy();
    }
    return this.instance;
  }

  async initializeSdk(): Promise<boolean> {
    const initializationStatus = await this.executeCall<string>(HIDPlugin.initializeSdk);
    return initializationStatus == HID_SDK_ERR.TRANSACTION_SUCCESS || Promise.reject(initializationStatus);
  }

  async endpointStatus(isGoogleWallet = false): Promise<EndpointStatuses> {
    const isSetup = await this.isEndpointSetup$();
    if (!isSetup) {
      return EndpointStatuses.NOT_SETUP;
    }

    if (isGoogleWallet) {
      const hasCards = await this.hasWalletCards();
      return hasCards ? EndpointStatuses.PROVISIONED_ACTIVE : EndpointStatuses.NOT_SETUP;
    }

    const isActive = await this.isEndpointActive();
    return isActive ? EndpointStatuses.PROVISIONED_ACTIVE : EndpointStatuses.PROVISIONED_INACTIVE;
  }

  async setupEndpoint(params): Promise<boolean> {
    const transactionResult = await this.executeCall<HID_SDK_ERR>(HIDPlugin.setupEndpoint, { ...params });
    if (transactionResult == HID_SDK_ERR.TRANSACTION_SUCCESS) {
      return true;
    }
    throw new Error(transactionResult);
  }

  async deleteEndpoint(): Promise<HID_SDK_ERR> {
    return await this.executeCall(HIDPlugin.deleteEndpoint);
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

  async hasWalletCards(): Promise<boolean> {
    return await this.executeCall<boolean>(HIDPlugin.hasWalletCards);
  }

  private async executeCall<T>(pluginCall: (param?) => Promise<HIDSdkTransactionResponse>, args?: any): Promise<T> {
    try {
      const transactionResponse: HIDSdkTransactionResponse = await pluginCall(args);
      return transactionResponse.transactionStatus;
    } catch (error) {
      console.error("Error calling HID plugin", error);
      return Promise.reject(HID_SDK_ERR.TRANSACTION_FAILED);
    }
  }

  async refreshEndpoint(): Promise<boolean> {
    return (await this.executeCall(HIDPlugin.refreshEndpoint)) == HID_SDK_ERR.TRANSACTION_SUCCESS;
  }

  private async startScanning(controller: TaskExecutionController): Promise<void> {
    controller.incrementExecCount();
    const executeCall = async (pluginCall: (param?) => Promise<HIDSdkTransactionResponse>, args?: any): Promise<any> => {
      const transactionResponse: HIDSdkTransactionResponse = await pluginCall(args);
      return transactionResponse.transactionStatus;
    };

    const endpointRefreshSuccess = async (): Promise<boolean> => {
      const endpointRefreshResult = await executeCall(HIDPlugin.refreshEndpoint);
      return endpointRefreshResult == HID_SDK_ERR.TRANSACTION_SUCCESS;
    };
    const isEndpointActiveNow = async (): Promise<boolean> => {
      return await executeCall(HIDPlugin.isEndpointActive);
    };
    const startScanningSuccess = async (): Promise<boolean> => {
      const startScanTransactionResult = await executeCall(HIDPlugin.startScanning);
      return startScanTransactionResult == HID_SDK_ERR.TRANSACTION_SUCCESS;
    };
    if ((await endpointRefreshSuccess()) && !controller.maxExecutionReached()) {
      if (await isEndpointActiveNow()) {
        if (await startScanningSuccess()) {
          controller.stopTaskExecution(EndpointStatuses.PROVISIONED_ACTIVE); // mobile credential is in a "fine state", whoohoo!!!
        }
      }
    } else if (controller.maxExecutionReached()) {
      controller.stopTaskExecution(EndpointStatuses.PROVISIONED_INACTIVE);
    } else {
      controller.stopTaskExecution(EndpointStatuses.NOT_SETUP);
    }
  }

  async doPostInstallWork(): Promise<void> {
    const task = new Task(this.startScanning, {
      maxExecutionCount: 30,
      executionInterval: 6000,
    });

    this.taskExecutor = new TaskExecutor(task, result => {
      this.taskExecutionObs$.next(result);
    });
    this.taskExecutor.initTask();
  }

  async stopTaskExecution(): Promise<void> {
    if (this.taskExecutor) {
      this.taskExecutor.stopExecution();
    }
  }

  async doPostInitWork(): Promise<void> {
    const task = new Task(this.startScanning, {
      maxExecutionCount: 10,
      executionInterval: 15000,
    });

    this.taskExecutor = new TaskExecutor(task, result => {
      this.taskExecutionObs$.next(result);
    });
    this.taskExecutor.initTask();
  }
}
