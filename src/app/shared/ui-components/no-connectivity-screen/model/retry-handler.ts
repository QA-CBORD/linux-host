export interface RetryHandler {
    onRetry(args?:any): Promise<boolean>;
    onScanCode(args?: any): Promise<any>
}