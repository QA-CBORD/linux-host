import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/service/base-service/base.service';

@Injectable()
export class OrderingApiService extends BaseService {

  private readonly serviceUrl: string = '/json/ordering';

  constructor(protected readonly http: HttpClient) { 
    super(http);
    
  }
}
