import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse, HttpParams, HttpResponseBase } from '@angular/common/http';
import { map, catchError, retry, skipWhile } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { R3ResolvedDependencyType } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private JSON = {
    type: 'application/json; charset=utf-8',
    responseType: 'json'
  };

  constructor(
    private httpClient: HttpClient,
  ) { }

  private get(endPoint: string, options: { type: string; responseType: string; }): Observable<any> {
    return this.httpClient.request(new HttpRequest('GET', `${endPoint}`,
      {
        observe: 'response',
        reportProgress: false,
        responseType: options.responseType,
      }))
      .pipe(
        retry(2),
        catchError(this.handleError),
        skipWhile((value: HttpResponse<any>) => !!!value.body),
        map((data: HttpResponse<any>) => data.body)
      );
  }

  data(filter?: string): Observable<any> {
    let sendData = environment.data;
    if (filter) {
      sendData = `${environment.data}${filter}`;
    }
    return this.get(sendData, this.JSON);
  }


  // tslint:disable-next-line: typedef
  public handleError(error: HttpErrorResponse) {
    return throwError('API COMPAQi Service: Something bad happened; please try again later.');
  }
}
