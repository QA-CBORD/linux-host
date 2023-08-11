/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectivityErrorType } from "./connectivity-error.enum";
import { ConnectivityScreenCsModel } from "./no-connectivity.cs.model";

export interface RetryHandler {
    onRetry(args?: any): Promise<boolean>;
    onClose?: (args?: any) => void
}

export interface ConnectivityPageInfo {
    csModel: ConnectivityScreenCsModel,
    freshContentStringsLoaded: boolean,
    errorType: ConnectivityErrorType,
    retryHandler?: RetryHandler,
    isVaultLocked: boolean,
    navBackUrl?: string
}

export enum ExecStatus {
    Execution_success = "exec_success"
}
