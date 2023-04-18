import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NUM_DSCRPTN_REGEXP } from '@core/utils/regexp-patterns';
import { ToastService } from '@core/service/toast/toast.service';

@Injectable()
export class ServerError implements HttpInterceptor {
  constructor(private readonly toastService: ToastService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

            console.error('handleServerException res: ', res);
            console.error('handleServerException req: ', req);
            this.handleServerException(req.body.method, res.body.exception);
          }
        },
        async ({ message, status }: HttpErrorResponse) => {
          if (status === 404) await this.presentToast('Page was not found');
          return throwError(message);
        }
      )
    );
  }

  private async presentToast(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  private isKnownError(errorString): boolean {
    return errorString.search(NUM_DSCRPTN_REGEXP) !== -1;
  }

  private handleServerException(method: string, exceptionString = ''): never {
    if (this.isKnownError(exceptionString)) {
      const errorMessageParts = exceptionString.split('|');
      throw this.determineErrorByCodeAndThrow([errorMessageParts[0], errorMessageParts[1]], method);
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
    depositForUserFromAnyAccount: 'There was an issue with the transaction',
    deposit: 'There was an issue with the transaction',
    sale: 'Your billing information does not match your credit card.',
    getMobileLocations: 'Unable to retrieve mobile locations.',
    default: 'There was an issue with your transaction. Contact your institution for more details.',
  },
  6113: {
    default: 'There was an issue with the transaction',
  },
};

export class GetThrowable extends Error {
  constructor(public message: string, public code?: string | number) {
    super(message);
  }
}
