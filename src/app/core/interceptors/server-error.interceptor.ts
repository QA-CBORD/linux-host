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
  constructor(private readonly toastService: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (res: HttpEvent<any>) => {
          if (
            res instanceof HttpResponse &&
            res.body instanceof Object &&
            'exception' in res.body &&
            res.body.exception !== null
          ) {
            if (shouldDelegateErrorToCaller(req.body.method)) {
              throw new Error(res.body.exception);
            }
            this.handleServerException(res.body.exception, req.body.method);
          }
        },
        async ({ error, message, status, statusText }: HttpErrorResponse) => {
          // if (status >= 500) await this.presentToast('Internal server error');
          if (status === 404) await this.presentToast('Page was not found');
          return throwError(message);
        }
      ),
      catchError(error => {
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

  private isKnownError(errorString): boolean {
    return errorString.search(NUM_DSCRPTN_REGEXP) !== -1;
  }

  private handleServerException(exceptionString: string = '', method: string): never {
    if (this.isKnownError(exceptionString)) {
      const errorMessageParts = exceptionString.split('|');
      throw this.determineErrorByCodeAndThrow(errorMessageParts as [string, string], method);
    } else {
      throw new Error('Unexpected error occurred.');
    }
  }

  private determineErrorByCodeAndThrow([code, message = '']: [string, string], method: string): never {
    const newError = new Error(`${code}|${message}`);
    if (Number(code) in GENERAL_ERRORS) {
      newError.message = GENERAL_ERRORS[code][method] || GENERAL_ERRORS[code].default;
    }
    throw newError;
  }
}

const shouldDelegateErrorToCaller = (method): boolean => {
  return registeredMethods[method];
};

const registeredMethods = {
  register: true,
};

const GENERAL_ERRORS = {
  9004: {
    default: 'There was an issue with the transaction, user phone number missing and required',
  },
  9999: {
    default: 'Unable to parse response',
  },
  4001: {
    default: 'Invalid session',
  },
  4002: {
    default: 'Invalid user session',
  },
  9801: {
    default: 'Invalid Service Argument Exception',
  },
  6100: {
    deposit: 'There was an issue with the transaction',
    default: 'Unable to retrieve mobile locations.',
  },
  6113: {
    default: 'There was an issue with the transaction',
  },
};
