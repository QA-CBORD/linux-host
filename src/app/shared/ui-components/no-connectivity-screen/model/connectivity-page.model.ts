import { ConnectivityErrorType, ConnectivityScreenCsModel } from "./no-connectivity.cs.model";

export interface RetryHandler {
    onRetry(args?: any): Promise<boolean>;
    onScanCode?: (args?: any) => Promise<any>
}

export interface ConnectivityPageInfo {
    csModel: ConnectivityScreenCsModel,
    freshContentStringsLoaded: boolean,
    errorType: ConnectivityErrorType,
    retryHandler?: RetryHandler,
    isVaultLocked: boolean
}

export enum ExecStatus {
    Execution_success = "exec_success"
}