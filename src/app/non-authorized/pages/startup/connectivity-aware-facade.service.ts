import { Injectable } from "@angular/core";
import { LoadingService } from "@core/service/loading/loading.service";
import { ConnectionFacadeService } from "@shared/services/connection-facade.service";
import { ExecStatus, RetryHandler } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";


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
    throwError?: (error: any) => boolean
}

@Injectable({ providedIn: 'root' })
export class ConnectivityAwareFacadeService {


    constructor(
        private readonly connectionFacadeService: ConnectionFacadeService,
        private readonly loadingService: LoadingService) { }


    async watchForConnectionIssuesOnExec<T>(options: { promise: () => Promise<T>, showLoading?: boolean }): Promise<PromiseExecResult<T>> {
        return this.execute({ ...options, throwError: (e) => !this.isConnectionError(e) });
    }

    private isConnectionError(error): boolean {
        return this.connectionFacadeService.isConnectionError(error);
    }
    async isModalOpened(): Promise<boolean> {
        return this.connectionFacadeService.isModalOpened();
    }

    setPinModalOpened(isOpened: boolean) {
        this.connectionFacadeService.setPinModalOpened(isOpened);
    }

    private setOptionsDefaults(options: ExecOptions<any>) {
        options.showLoading = options.showLoading == undefined ? true : options.showLoading;
        options.throwError = options.throwError ? options.throwError : () => false;
    }

    async execute<T>(options: ExecOptions<T>): Promise<PromiseExecResult<T>> {
        this.setOptionsDefaults(options);
        return new Promise((resolve, reject) => {
            this.runExecutionLogic(resolve, reject, options);
        });

    }

    private async runExecutionLogic(resolve, reject, options: ExecOptions<any>) {
        try {
            resolve({ execStatus: ExecStatus.Execution_success, data: await this.run(options.promise, options.showLoading) });
        } catch (error) {
            if (options.throwError(error)) {
                reject(error);
            } else {
                const { data, promiseResolved } = await this.handleError(options);
                if (promiseResolved) {
                    resolve(data);
                } else {
                    reject(data);
                }
            }
        }
    }

    private async handleError<T>(options: ExecOptions<T>): Promise<{ data, promiseResolved }> {
        let promiseResolved = false;
        let data = null;
        await this.connectionFacadeService.handleConnectionError({
            onRetry: async () => {
                return this.run(options.promise, true)
                    .then(r => (promiseResolved = true) && (((data = r) && true) || true))
                    .catch(e => options.throwError(e) && ((data = e) && true));
            }
        }, true);
        return { promiseResolved, data };
    }


    async onConnectivityError(handler: RetryHandler, showAsModal = true) {
        return this.connectionFacadeService.handleConnectionError(handler, showAsModal);
    }

    private async run<T>(actualMethod: () => Promise<T>, showLoading: boolean): Promise<T> {
        if (showLoading) {
            await this.loadingService.showSpinner();
            return await actualMethod().finally(() => this.loadingService.closeSpinner());
        } else {
            return await actualMethod();
        }
    }
}