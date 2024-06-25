import { HttpErrorResponse } from '@angular/common/http';
import { isString } from '@sentry/utils';

function extractHttpModuleError(error: HttpErrorResponse): string | Error {
  // The `error` property of http exception can be either an `Error` object, which we can use directly...
  if (isErrorOrErrorLikeObject(error.error)) {
    return error.error;
  }

  // ... or an`ErrorEvent`, which can provide us with the message but no stack...
  if (error.error instanceof ErrorEvent && error.error.message) {
    return error.error.message;
  }

  // ...or the request body itself, which we can use as a message instead.
  if (typeof error.error === 'string') {
    return `Server returned code ${error.status} with body "${error.error}"`;
  }

  // If we don't have any detailed information, fallback to the request message itself.
  return error.message;
}

type ErrorCandidate = {
  name?: unknown;
  message?: unknown;
  stack?: unknown;
};

function isErrorOrErrorLikeObject(value: unknown): value is Error {
  if (value instanceof Error) {
    return true;
  }

  if (value === null || typeof value !== 'object') {
    return false;
  }

  const candidate = value as ErrorCandidate;

  return (
    isString(candidate.name) &&
    isString(candidate.name) &&
    isString(candidate.message) &&
    (undefined === candidate.stack || isString(candidate.stack))
  );
}

/**
 * Used to pull a desired value that will be used to capture an event out of the raw value captured by ErrorHandler.
 */
export function extractError(error: unknown): unknown {
  return _defaultExtractor(error);
}

/**
 * Default implementation of error extraction that handles default error wrapping, HTTP responses, ErrorEvent and few other known cases.
 */
function _defaultExtractor(errorCandidate: unknown): unknown {
  const error = tryToUnwrapZonejsError(errorCandidate);

  // If it's http module error, extract as much information from it as we can.
  if (error instanceof HttpErrorResponse) {
    return extractHttpModuleError(error);
  }

  // We can handle messages and Error objects directly.
  if (typeof error === 'string' || isErrorOrErrorLikeObject(error)) {
    return error;
  }

  // Nothing was extracted, fallback to default error message.
  return null;
}

function tryToUnwrapZonejsError(error: unknown): unknown | Error {
  // TODO: once Angular14 is the minimum requirement ERROR_ORIGINAL_ERROR and
  //  getOriginalError from error.ts can be used directly.
  return error && (error as { ngOriginalError: Error }).ngOriginalError
    ? (error as { ngOriginalError: Error }).ngOriginalError
    : error;
}
