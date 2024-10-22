import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NUM_DSCRPTN_REGEXP } from '@core/utils/regexp-patterns';
import { ToastService } from '@core/service/toast/toast.service';
import { Injectable, inject } from '@angular/core';
import { ConnectionService } from '@shared/index';
import { LoadingService } from '@core/service/loading/loading.service';

@Injectable()
export class ServerError implements HttpInterceptor {
  private readonly loadingService: LoadingService = inject(LoadingService);
  private readonly conectionService = inject(ConnectionService);
  constructor(private readonly toastService: ToastService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next: (res: HttpEvent<any>) => {
          if (
            res instanceof HttpResponse &&
            res.body instanceof Object &&
            'exception' in res.body &&
            res.body.exception !== null
          ) {
            if (this.shouldDelegateErrorToCaller(req.body.method)) {
              throw new Error(res.body.exception);
            }
            console.error('handleServerException: ', req, res);
            console.error('handleServerException Body: ', req.body);
            this.handleServerException(req.body.method, res.body.exception);
          }
        },
        error: async ({ message, status }: HttpErrorResponse) => {
          if (status === 404) await this.presentToast('Page was not found');
          return throwError(() => new Error(message));
        },
      }),
      catchError(({ message, status }: HttpErrorResponse) => {
        if (this.conectionService.isConnectionIssues({ message, status })) {
          this.loadingService.closeSpinner();
          this.connectionToast();
          return throwError(() => new Error(`Due to connection issues, ${message}`));
        }
        return throwError(() => new Error(message));
      })
    );
  }

  private async connectionToast(): Promise<void> {
    await this.toastService.showToast({
      message: 'Please check your internet connection and try again.',
    });
  }

  private async presentToast(message: string): Promise<void> {
    await this.toastService.showError({ message });
  }

  private hasKnownErrorFormat(errorString: string): boolean {
    return errorString.search(NUM_DSCRPTN_REGEXP) !== -1;
  }

  private handleServerException(method: string, exceptionString = '') {
    if (this.hasKnownErrorFormat(exceptionString)) {
      const errorMessageParts = exceptionString.split('|');
      const newError = this.determineErrorByCode([errorMessageParts[0], errorMessageParts[1]], method);
      throw newError;
    } else {
      console.error(exceptionString);
      throw new Error('Unexpected error occurred.');
    }
  }

  private determineErrorByCode([code, message = '']: [string, string], method: string): Error {
    const newError = new Error(`${code}|${message}`);
    if (Number(code) in GENERAL_ERRORS) {
      newError.message = GENERAL_ERRORS[code][method] || GENERAL_ERRORS[code].default;
    }
    return newError;
  }

  shouldDelegateErrorToCaller = (method): boolean => {
    return this.registeredMethods[method];
  };

  registeredMethods = {
    register: true,
  };
}

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
