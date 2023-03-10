import { ResponseStatus } from '@sections/housing/housing.model';
import { StatusCodes } from 'http-status-codes';


export function isSuccessful(status: ResponseStatus) {
  if (_isOkay(status.statusCode)) {
    return true;
  }

  return false;
}


function _isOkay(statusCode: number) {
  return (statusCode === StatusCodes.OK || statusCode === StatusCodes.NO_CONTENT);
}
