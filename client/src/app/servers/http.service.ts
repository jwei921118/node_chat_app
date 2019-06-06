import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams ,  HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry , mapTo } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  defaultHeaders = {'Content-type': 'application/json'};
  constructor(
    private http: HttpClient
  ) { }

  request(url: string, data?: any , method?: string , httpHeaders?: any): Observable<any> {
    if (!url) {
      return;
    }
    method ? method = method : method = 'GET';
    if (method.toLowerCase() === 'get') {
      const options = data ? {
        params: new HttpParams(data)
      } : {};
      return this.http.get(url , options)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
    } else {
      const headers = httpHeaders ? {...this.defaultHeaders, ...httpHeaders} : this.defaultHeaders;
      const httpOptions = {
        headers: new HttpHeaders(headers)
      };
      return this.http.post(url , data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  }


  /**
   *
   * @param error 请求错误响应
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
