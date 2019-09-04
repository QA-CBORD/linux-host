import { UserLogin } from '../app/core/model/user';

export const environment = {
  production: true
};

interface Dictionary<T> {
  [K: string]: T;
}

export const testCredentials:Dictionary<UserLogin> = {
  
}