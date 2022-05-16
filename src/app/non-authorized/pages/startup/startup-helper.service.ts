import { Injectable } from "@angular/core";
import { LoadingService } from "@core/service/loading/loading.service";
import { OptionsName } from "@sections/housing/pages/roommate-search/pages/search-by/search-by.page";
import { ConnectionService } from "@shared/services/connection-service";
import { ConnectivityService } from "@shared/services/connectivity.service";
import { ExecStatus } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";


export interface PromiseExecResult<T> {
    execStatus: ExecStatus,
    data: T;
}

export enum PromiseExecStatus {
    RESOLVED,
    REJECTED
}

export interface PromiseExecOptions<T> {
    actualMethod: () => Promise<T>,
    showLoading?: boolean;
    skipError?: (error: any) => boolean
}

@Injectable({ providedIn: 'root' })
export class StartupService {


    constructor(
        private readonly connectivityService: ConnectivityService,
        private readonly loadingService: LoadingService,
        private readonly connectionService: ConnectionService) { }




    async watchForConnectionIssuesOnExec<T>(options: PromiseExecOptions<T>): Promise<PromiseExecResult<T>> {

        const showLoading = options.showLoading == undefined ? true : options.showLoading;

        return await new Promise(async (resolve, reject) => {
            let result = null;
            try {
                console.log("EXECUTING ACTUAL METHOD 2: WAIT ******");
                result = await this.run(options.actualMethod, showLoading);
                resolve({ execStatus: ExecStatus.Execution_success, data: result });
            } catch (error) {
                console.log("CATCHED error here 2: ", error);
                if (this.isConnectionError(error)) {
                    await this.connectivityService.handleConnectionError({
                        onRetry: async () => {
                            this.loadingService.showSpinner();
                            try {
                                result = await this.run(options.actualMethod, showLoading);
                                resolve(result);
                                return true;
                            } catch (error) {
                                if (this.isConnectionError(error)) {
                                    console.log("CATCHED error here AGAIN 2: ", error);
                                    return false;
                                } else {
                                    reject(error);
                                    return true;
                                }
                            } finally {
                                this.loadingService.closeSpinner();
                            }
                        }
                    }, true);
                } else {
                    reject(error);
                }
            }
        });
    }

    private isConnectionError(error): boolean {
        return this.connectionService.isConnectionIssues(error);
    }


    async executePromise<T>(options: PromiseExecOptions<T>): Promise<PromiseExecResult<T>> {
        const showLoading = options.showLoading == undefined ? true : options.showLoading;
        options.showLoading = showLoading;
        return await new Promise(async (resolve, reject) => {
            try {
                resolve({ execStatus: ExecStatus.Execution_success, data: await this.run(options.actualMethod, showLoading) });
            } catch (error) {
                if (options.skipError && options.skipError(error)) {
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
                this.loadingService.showSpinner();
                return this.run(options.actualMethod, options.showLoading)
                    .then(r => (promiseResolved = true) && (((data = r) && true) || true))
                    .catch(e => options.skipError && options.skipError(e) && ((data = e) && true))
                    .finally(() => this.loadingService.showSpinner())
            }
        }, true);
        return { promiseResolved, data };
    }




    // private shoulSkipError({ message, code }, options: PromiseExecOptions<any>): boolean {
    //     if (options.errorSkipList) {
    //         return !!options.errorSkipList.find((e) => e == message || e == code);
    //     }
    //     return false;
    // }

    private async run<T>(actualMethod: () => Promise<T>, showLoading: boolean): Promise<T> {
        if (showLoading) {
            await this.loadingService.showSpinner();
            return await actualMethod().finally(() => this.loadingService.closeSpinner());
        } else {
            return await actualMethod();
        }
    }



    // await this.connectivityService.handleConnectionError({
    //     onRetry: async () => {
    //         this.loadingService.showSpinner();
    //         try {
    //             resolve(await this.run(options.actualMethod, showLoading));
    //             return true;
    //         } catch (error) {
    //             if (this.shoulSkipError(options, error)) {
    //                 reject(error);
    //                 return true;
    //             }
    //             return false;
    //         } finally {
    //             this.loadingService.showSpinner();
    //         }
    //     }
    // }, true);
}