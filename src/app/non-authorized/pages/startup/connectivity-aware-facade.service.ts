import { Injectable } from "@angular/core";
import { LoadingService } from "@core/service/loading/loading.service";
import { ConnectionFacadeService } from "@shared/services/connection-facade.service";
import { ExecStatus, RetryHandler } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";
import { NavigationService } from "@shared/services/navigation.service";


export interface PromiseExecResult<T> {
    execStatus: ExecStatus,
    data: T;
}

export enum PromiseExecStatus {
    RESOLVED,
    REJECTED
}

export interface ExecOptions<T> {
    promise: () => Promise<T>,
    showLoading?: boolean;
    rejectOnError?: (error: any) => boolean,
    shouldNavigate?: boolean
}

@Injectable({ providedIn: 'root' })
export class ConnectivityAwareFacadeService {


    constructor(
        private readonly connectionFacadeService: ConnectionFacadeService,
        private readonly loadingService: LoadingService, private routingService: NavigationService) { }


    async watchForConnectionIssuesOnExec<T>(options: { promise: () => Promise<T>, showLoading?: boolean }): Promise<PromiseExecResult<T>> {
        return this.execute({ ...options, rejectOnError: (e) => !this.isConnectionError(e) });
    }

    private isConnectionError(error): boolean {
        return this.connectionFacadeService.isConnectionError(error);
    }

    isModalOpened(): boolean {
        return this.connectionFacadeService.isModalOpened();
    }

    setPinModalOpened(isOpened: boolean) {
        this.connectionFacadeService.setPinModalOpened(isOpened);
    }

    private setOptionsDefaults(options: ExecOptions<any>) {
        options.showLoading = options.showLoading === undefined ? true : options.showLoading;
        options.rejectOnError = options.rejectOnError || (() => false);
    }

    async execute<T>(options: ExecOptions<T>, isVaultLocked = true): Promise<PromiseExecResult<T>> {
        this.setOptionsDefaults(options);
        return new Promise((resolve, reject) => {
            this.runExecutionLogic(resolve, reject, options, isVaultLocked);
        });

    }

    private async runExecutionLogic<T>(resolve: (data: PromiseExecResult<T>) => void, reject: (e) => void, options: ExecOptions<T>, isVaultLocked: boolean) {
        const { rejectOnError, promise, showLoading, shouldNavigate } = options;
        try {
            resolve({ execStatus: ExecStatus.Execution_success, data: await this.run(promise, showLoading) });
        } catch (error) {
            if (rejectOnError(error)) {
                reject(error);
            } else {
                const response = await this.handleConnectivityError({ rejectOnError, promise, shouldNavigate }, isVaultLocked);
                if (response.connectionReEstablished) {
                    resolve({
                        data: response.results,
                        execStatus: ExecStatus.Execution_success
                    });
                } else {
                    reject(response);
                }
            }
        }
    }

    private async handleConnectivityError<T>({ promise, rejectOnError, shouldNavigate }: ExecOptions<T>, isVaultLocked: boolean): Promise<{ results: T, connectionReEstablished: boolean }> {
        let connectionReEstablished = false;
        let results = null;
        await this.connectionFacadeService.handleConnectionError({
            onRetry: () => this.run(promise)
                .then(r => (connectionReEstablished = true) && (((results = r) && true) || true))
                .catch(e => rejectOnError(e) && ((results = e) && true))
        }, !shouldNavigate, isVaultLocked);

        return { connectionReEstablished, results };
    }


    async onConnectivityError(handler: RetryHandler, showAsModal = true) {
        return this.connectionFacadeService.handleConnectionError(handler, showAsModal);
    }

    private async run<T>(actualMethod: () => Promise<T>, showLoading = true): Promise<T> {
        if (showLoading) {
            await this.loadingService.showSpinner();
            return await actualMethod()
                .finally(() => this.loadingService.closeSpinner());
        } else {
            return await actualMethod();
        }
    }
}
