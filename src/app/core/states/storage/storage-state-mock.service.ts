/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
@Injectable()
export class MockStorageService {
  private data: { [key: string]: any } = {};
  set(key: string, value: any): Promise<any> {
    this.data[key] = value;
    return Promise.resolve();
  }
  get(key: string): Promise<any> {
    return Promise.resolve(this.data[key]);
  }
  remove(key: string): Promise<any> {
    delete this.data[key];
    return Promise.resolve();
  }
  clear(): Promise<any> {
    this.data = {};
    return Promise.resolve();
  }
}
