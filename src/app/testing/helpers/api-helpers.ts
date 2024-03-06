/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpTestingController } from '@angular/common/http/testing';

export const simpleApiMethodAssert = <T>(
  httpTestingController: HttpTestingController,
  service: T,
  method: keyof T,
  params = [],
  serviceURL = '',
  httpMethod = 'POST'
) => {
  jest.spyOn(service, method.toString() as any);
  (service as any)[method](...params).subscribe(res => {
    expect(res).toEqual([]);
  });
  expect(service[method]).toHaveBeenCalled();
  const req = httpTestingController.expectOne(serviceURL);
  expect(req.request.method).toEqual(httpMethod);
  req.flush([]);
  httpTestingController.verify();
};

export const simpleServiceApiToAssert = <T>(
  httpTestingController: HttpTestingController,
  service: T
): ((method: keyof T, params?: any[], serviceURL?: string, httpMethod?: string) => void) => {
  return (method: keyof T, params = [], serviceURL = '', httpMethod = 'POST') => {
    simpleApiMethodAssert<T>(httpTestingController, service, method, params, serviceURL, httpMethod);
  };
};
