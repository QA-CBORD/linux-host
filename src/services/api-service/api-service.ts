import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from "rxjs/Observable";
import { Environment } from "../../app/environment";





export enum HttpResponseType {
    json,
    text
}

@Injectable()
export class APIService {

    constructor(
        private http: HttpClient
    ) {
    }

    public get<T>(url: string, responseType: HttpResponseType = HttpResponseType.json, params?: HttpParams,
        headers?: HttpHeaders): Observable<T> {

        const options: Object = this.getOptions(responseType, params, headers);

        return (this.http.get(url, options)) as Observable<T>;
    }

    public put(url: string, body: any, responseType: HttpResponseType = HttpResponseType.json, params?: HttpParams,
        headers?: HttpHeaders): Observable<any> {
        const options = this.getOptions(responseType, params, headers);
        return this.http.put(url, body, options);
    }

    public post(url: string, body: any, responseType: HttpResponseType = HttpResponseType.json, params?: HttpParams,
        headers?: HttpHeaders): Observable<any> {
        const options = this.getOptions(responseType, params, headers);
        return this.http.post(url, body, options);
    }

    public authenticatedHTTPCall(callType: string, serviceURL: string, responseType: HttpResponseType = HttpResponseType.json,
        body?: any, params?: HttpParams, headers?: HttpHeaders): Observable<any> {

        let finalURL = Environment.getAPIGatewayServicesBaseURL().concat(serviceURL);

        console.log("API Call: |" + callType + "| - " + finalURL);

        return Observable.create((observer: any) => {
            // sort by call type
            if (callType === 'get') {

                this.get<any>(finalURL, responseType, params, headers).subscribe(response => {

                    observer.next(response);
                },
                    (error: any) => {

                        if (error.status === 401) {

                        } else {
                            observer.error(error);
                        }
                    });
            } else if (callType === 'post') {
                this.post(finalURL, body, responseType, params, headers).subscribe(response => {
                    observer.next(response);
                },
                    (error: any) => {
                        if (error.status === 401) {

                        } else {
                            observer.error(error);
                        }
                    });
            } else if (callType === 'put') {
                this.put(finalURL, body, responseType, params, headers).subscribe(response => {
                    observer.next(response);
                },
                    (error: any) => {
                        if (error.status === 401) {

                        } else {
                            observer.error(error);
                        }
                    });
            } else {
                observer.error('Incorrect call type');
            }
        });
    }


    private getOptions(responseType: HttpResponseType = HttpResponseType.json, params?: HttpParams,
        headers?: HttpHeaders): object {
        let options = { responseType: responseType === HttpResponseType.json ? 'json' : 'text' };
        if (params) {
            Object.assign(options, { params: params });
        }
        if (headers) {
            Object.assign(options, { headers: headers });
        }
        return options;
    }

}