// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { UserLogin } from '../app/core/model/user';

export const environment = {
  production: false
};


interface Dictionary<T> {
  [K: string]: T;
}

export const testCredentials:Dictionary<UserLogin> = {
  gold7: {
    userName: 'GSaas@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
  },

  gold7_1:  {
    userName: 'BSaas@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
  },

  gold7_Yarik: {
    userName: 'yxp@test.cbord.com',
    password: 'Dn210778pms#',
    domain: null,
    institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
  },

  odysseyPreview: {
    userName: 'getaws1@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
  },
  odysseyPreview2: {
    userName: 'getaws2@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
  },

  odysseyPreviewTest: {
    userName: 'yxp@test.cbord.com',
    password: 'Dn210778pms#',
    domain: null,
    institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
  },

  sethsInstitution: {
    userName: 'sac2@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: 'ec1307c4-d59e-4981-b5f9-860e23229a0d',
  },

  lowBalance:  {
    userName: 'lowbalance@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
