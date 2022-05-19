import { Injectable } from "@angular/core";
import { LoadingService } from "@core/service/loading/loading.service";
import { ConnectionService } from "@shared/services/connection-service";
import { ConnectivityService } from "@shared/services/connectivity.service";
import { ExecStatus, RetryHandler } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";


export interface PromiseExecResult<T> {
    execStatus: ExecStatus,
    data: T;
}

export enum PromiseExecStatus {
    RESOLVED,
    REJECTED
}

export interface PromiseExecOptions<T> {
    promise: () => Promise<T>,
    showLoading?: boolean;
    skipError?: (error: any) => boolean
}

@Injectable({ providedIn: 'root' })
export class ConnectivityFacadeService {


    constructor(
        private readonly connectivityService: ConnectivityService,
        private readonly loadingService: LoadingService,
        private readonly connectionService: ConnectionService) { }


    async watchForConnectionIssuesOnExec<T>(options: PromiseExecOptions<T>): Promise<PromiseExecResult<T>> {
        return this.exec({ ...options, skipError: (e) => !this.isConnectionError(e) });
    }

    private isConnectionError(error): boolean {
        return this.connectionService.isConnectionIssues(error);
    }
    async isModalOpened(): Promise<boolean> {
        return this.connectivityService.isModalOpened();
    }

    setPinModalOpened(isOpened: boolean) {
        this.connectivityService.setPinModalOpened(isOpened);
    }

    private setOptionsDefaults(options: PromiseExecOptions<any>) {
        options.showLoading = options.showLoading == undefined ? true : options.showLoading;
        options.skipError = options.skipError ? options.skipError : () => false;
    }

    async exec<T>(options: PromiseExecOptions<T>): Promise<PromiseExecResult<T>> {
        this.setOptionsDefaults(options);
        return await new Promise(async (resolve, reject) => {
            try {
                resolve({ execStatus: ExecStatus.Execution_success, data: await this.run(options.promise, options.showLoading) });
            } catch (error) {
                if (options.skipError(error)) {
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
        });

    }


    private async handleError<T>(options: PromiseExecOptions<T>): Promise<{ data, promiseResolved }> {
        let promiseResolved = false;
        let data = null;
        await this.connectivityService.handleConnectionError({
            onRetry: async () => {
                return this.run(options.promise, true)
                    .then(r => (promiseResolved = true) && (((data = r) && true) || true))
                    .catch(e => options.skipError(e) && ((data = e) && true));
            }
        }, true);
        return { promiseResolved, data };
    }


    async handleConnectionError(handler: RetryHandler, showAsModal: boolean = false) {
        return this.connectivityService.handleConnectionError(handler, showAsModal);
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