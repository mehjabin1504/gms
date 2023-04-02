import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { catchError, Observable, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';

@Injectable({
  providedIn: 'root'
})
export class EventWiseWorkflowApiService {

  constructor(private http : HttpClient) { }


  GetEventWiseWorkflowByEventUniqueId(EventUniqueId:any): Observable<any>{
     return this.http.get(gums_api_url+'/event-wise-workflow/EventUniqueId/'+EventUniqueId)    
    .pipe(catchError(this.handleError));
  }

  GetAllEventWiseWorkflow(): Observable<any>{
    return this.http.get(gums_api_url+'/event-wise-workflow')    
   .pipe(catchError(this.handleError));
 }
 GetAllEventWiseWorkflowByQuery(): Observable<any>{
  return this.http.get(gums_api_url+'/event-wise-workflow/query')    
 .pipe(catchError(this.handleError));
}

 GetAllEventWiseWorkflowByUniqueId(uniqueId:any): Observable<any>{
  return this.http.get(gums_api_url+'/event-wise-workflow/'+uniqueId)    
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
