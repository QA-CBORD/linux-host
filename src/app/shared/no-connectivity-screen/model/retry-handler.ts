export interface RetryHandler {
    onRetry(args?:any): Promise<any>;
}