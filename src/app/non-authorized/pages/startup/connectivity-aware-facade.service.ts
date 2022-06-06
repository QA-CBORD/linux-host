import { Injectable } from "@angular/core";
import { LoadingService } from "@core/service/loading/loading.service";
import { ConnectionFacadeService } from "@shared/services/connection-facade.service";
import { ExecStatus, RetryHandler } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";
import { Observable } from "rxjs";
import { firstValueFrom } from '@shared/utils';


export interface PromiseExecResult<T> {
    execStatus: ExecStatus,
    data: T;
}

export enum PromiseExecStatus {
    RESOLVED,
    REJECTED
}

export interface ExecOptions<T> {
    promise: () => Promise<T> | Observable<T>,
    showLoading?: boolean;
    rejectOnError?: (error: any) => boolean
}

@Injectable({ providedIn: 'root' })
export class ConnectivityAwareFacadeService {


    constructor(
        private readonly connectionFacadeService: ConnectionFacadeService,
        private readonly loadingService: LoadingService) { }


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
        options.showLoading = options.showLoading == undefined ? true : options.showLoading;
        options.rejectOnError = options.rejectOnError ? options.rejectOnError : () => false;
    }

    async execute<T>(options: ExecOptions<T>, isVaultLocked = true): Promise<PromiseExecResult<T>> {
        this.setOptionsDefaults(options);
        return new Promise((resolve, reject) => {
            this.runExecutionLogic(resolve, reject, options, isVaultLocked);
        });

    }

    private async runExecutionLogic(resolve, reject, { rejectOnError, promise, showLoading }: ExecOptions<any>, isVaultLocked: boolean) {
        try {
            resolve({ execStatus: ExecStatus.Execution_success, data: await this.run(promise, showLoading) });
        } catch (error) {
            if (rejectOnError(error)) {
                reject(error);
            } else {
                const { data, promiseResolved } = await this.handleConnectivityError({ rejectOnError, promise }, isVaultLocked);
                if (promiseResolved) {
                    resolve(data);
                } else {
                    reject(data);
                }
            }
        }
    }

    private async handleConnectivityError<T>({ promise, rejectOnError }: ExecOptions<T>, isVaultLocked: boolean): Promise<{ data, promiseResolved }> {
        let promiseResolved = false;
        let data = null;
        const showLoading = true;
        await this.connectionFacadeService.handleConnectionError({
            onRetry: async () => {
                return this.run(promise, showLoading)
                    .then(r => (promiseResolved = true) && (((data = r) && true) || true))
                    .catch(e => rejectOnError(e) && ((data = e) && true));
            }
        }, true, isVaultLocked);
        return { promiseResolved, data };
    }


    async onConnectivityError(handler: RetryHandler, showAsModal = true) {
        return this.connectionFacadeService.handleConnectionError(handler, showAsModal);
    }

    private async run<T>(actualMethod: () => Promise<T> | Observable<T>, showLoading: boolean): Promise<T> {
        if (showLoading) {
            await this.loadingService.showSpinner();
            return await this.firstValueFromw(actualMethod)
                .finally(() => this.loadingService.closeSpinner());
        } else {
            return await this.firstValueFromw(actualMethod);
        }
    }

    private async firstValueFromw<T>(method: () => Promise<T> | Observable<T>) {
        if (method instanceof Observable) {
            return await firstValueFrom(method)
        }
        return await method();
    }
}
