import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, last } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploaderServices {
  constructor(
    private http: HttpClient
  ) { }

   request(url, data, method , callback) {
       const req = new HttpRequest(method, url, data, {reportProgress: true});
       return this.http.request(req)
       .pipe(
           map(event => this.getEventMessage(event , callback)),
           tap(message => this.showProgress(message)),
           last(),
           catchError(this.handleError)
       );
   }

   private getEventMessage(event: HttpEvent<any> , callback) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file of size.`;
      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        callback(percentDone);
        return percentDone;
      case HttpEventType.Response:
        return event.body;
      default:
        return `http surprising upload event: ${event.type}.`;
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

  private showProgress(message) {
      return message;
  }
}
