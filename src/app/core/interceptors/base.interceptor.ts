/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, zip } from 'rxjs';
import { catchError, first, map, observeOn, subscribeOn, switchMap, take, timeout } from 'rxjs/operators';
import { queue } from 'rxjs/internal/scheduler/queue';
import { async } from 'rxjs/internal/scheduler/async';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  private TIMEOUT_MS = 30000;

  constructor(
    private readonly authFacadeService: AuthFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.resolveRequest(req, next).pipe(
      subscribeOn(async),
      observeOn(queue)
    );
  }

  /**
   * Here is checking if only POST request was called with special object config
   * inside the body. In case it is met that means than this call intended for
   * base Server, and it has to be modified to further request based on config object inside
   * @param req - HttpRequest
   * @param next - HttpHandler
   */
  resolveRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRPCCall(req)) {
      return next.handle(req);
    }
    const rpcConfig: RPCQueryConfig = req.body;
    const timeOut = rpcConfig.timeOut ? rpcConfig.timeOut : this.TIMEOUT_MS;
    return this.environmentFacadeService.getSavedEnvironmentInfo$().pipe(
      first(),
      switchMap(({ services_url: servicesURL }) => {
        const url = servicesURL.concat(req.url);
        const clone = req.clone({ url, body: rpcConfig.requestBody, headers: this.baseHeaders });
        const request =
          rpcConfig.useSessionId || rpcConfig.useInstitutionId
            ? this.updatedRequest(next, rpcConfig, clone)
            : next.handle(clone);
        return request.pipe(timeout(timeOut),
          catchError(error => {
            error.request = req;
            throw error;
          }));
      })
    );
  }

  private isRPCCall(req: HttpRequest<any>): boolean {
    return req.method === 'POST' && req.body instanceof RPCQueryConfig;
  }

  private get baseHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  private updatedRequest(
    next: HttpHandler,
    { useInstitutionId, useSessionId }: RPCQueryConfig,
    req: HttpRequest<any>
  ): Observable<any> {
    let { params } = req.body;
    return this.getRequiredData(req).pipe(
      switchMap(([institutionId, sessionId]) => {
        if ((useInstitutionId && institutionId === null) || (useSessionId && sessionId === null)) {
          this.redirectToLogin();
        } else {
          if (useInstitutionId) params = { ...params, institutionId };
          if (useSessionId) params = { ...params, sessionId };
          const modifiedRequest = req.clone({ body: { ...req.body, params } });
          return next.handle(modifiedRequest);
        }
      })
    );
  }

  private redirectToLogin() {
    /// the sessionId and institutionId timeouts have been removed, this is unused
    /// we need to fix this later if we want dynamic session timout state management on frontend
  }

  private getRequiredData({ body: { params } }: HttpRequest<any>): Observable<[string, string]> {
    // eslint-disable-next-line no-prototype-builtins
    const hasInstitutionId: boolean = params.hasOwnProperty('institutionId');
    // eslint-disable-next-line no-prototype-builtins
    const hasSessionId: boolean = params.hasOwnProperty('sessionId');

    const institutionId$ = hasInstitutionId
      ? of(params['institutionId'])
      : this.institutionFacadeService.cachedInstitutionInfo$.pipe(
          map(institution => (institution ? institution.id : institution)),
          take(1)
        );

    let sessionId$: Observable<string>;
    if (!hasSessionId) {
      sessionId$ = this.authFacadeService.cachedAuthSessionToken$.pipe(
        take(1),
        switchMap(sessionId =>
          sessionId ? of(sessionId) : this.authFacadeService.getAuthSessionToken$().pipe(take(1))
        )
      );
    } else {
      sessionId$ = of(params['sessionId']);
    }
    return zip(institutionId$, sessionId$);
  }
}
