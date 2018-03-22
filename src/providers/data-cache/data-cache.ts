import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import moment from 'moment';
import 'rxjs/add/operator/map';


@Injectable()
export class DataCache {

  constructor(private storage: Storage) {
  }


  public set(key: string, value: any, expireTime?: Date) {
    if (expireTime == undefined) {
      expireTime = moment().add(1, 'days').toDate();
    }

    let newItem = new DataCacheItem(key, value, expireTime);
    this.storage.set(key, newItem);
  }

  public get(key: string) {
    return new Promise((resolve, reject) => {
      this.storage.get(key).then((res: DataCacheItem) => {
        // check expiration
        if (moment().isAfter(res.expireTime)) {
          this.storage.remove(key);
          reject(undefined);
        } else {
          resolve(res.data);
        }
      }).catch((err) => {
        reject(undefined);
      })
    });
  }

}

export class DataCacheItem {
  insertTime: Date;
  expireTime: Date;
  key: string;
  data: any;

  constructor(key: any, data: any, expireTime: Date) {
    this.insertTime = new Date();
    this.expireTime = expireTime;
    this.key = key;
    this.data = data;
  }
}
