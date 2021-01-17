import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NUM_DSCRPTN_REGEXP } from '@core/utils/regexp-patterns';
import { ToastService } from '@core/service/toast/toast.service';

@Injectable()
export class ServerError implements HttpInterceptor {

  constructor(private readonly toastService: ToastService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(
        (res: HttpEvent<any>) => {
          if (res instanceof HttpResponse &&  res.body instanceof Object && 'exception' in res.body && res.body.exception !== null) {
            this.handleServerException(res.body.exception);
          }
        },
        async ({ error, message, status, statusText }: HttpErrorResponse) => {
          // if (status >= 500) await this.presentToast('Internal server error');
          if (status === 404) await this.presentToast('Page was not found');
          return throwError(message);
        },
      ),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError('Timeout Exception');
        }
        return throwError(error);
      })
    );
  }

  private async presentToast(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  private handleServerException(exceptionString: string = ''): never {
    if (exceptionString.search(NUM_DSCRPTN_REGEXP) !== -1) {
      const errorMessageParts = exceptionString.split('|');
      throw this.determineErrorByCodeAndThrow(errorMessageParts as [string, string]);
    } else {
      throw new Error('Unexpected error occurred.');
    }
  }

  private determineErrorByCodeAndThrow([code, message = '']: [string, string]): never {
    const newError = new Error(`${code}|${message}`);
    if (Number(code) in GENERAL_ERRORS) {
      newError.message = GENERAL_ERRORS[code];
    }
    throw newError;
  }
}

const GENERAL_ERRORS = {
  9999: 'Unable to parse response',
  4001: 'Invalid session',
  4002: 'Invalid user session',
  9801: 'Invalid Service Argument Exception',
  6100: 'Unable to retrieve mobile locations.',
  6113: 'There was an issue with the transaction',
};
