import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';

@Injectable({
  providedIn: 'root'
})
export class EventWiseDynamicItemService {

  constructor(private http : HttpClient) { }


  GetEventWiseDynamicItemList(): Observable<any>{
    return this.http.get(gums_api_url+'/event-wise-item-setup')
    .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
        console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
       return throwError('There is the problem with the Service, Please contact with System Administrator.');
  }

}