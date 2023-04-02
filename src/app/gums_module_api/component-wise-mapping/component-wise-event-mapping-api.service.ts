import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';

@Injectable({
  providedIn: 'root'
})
export class ComponentWiseEventMappingApiService {

  constructor(private http : HttpClient) { }


  GetComponentEventByComponentUniqueIdAndEventAction(componentUniqueId:any,eventAction:any): Observable<any>{
    return this.http.get(gums_api_url+'/component-event/ComponentWiseEvent/'+componentUniqueId+','+eventAction)    
   .pipe(catchError(this.handleError));
 }



 getComponentNameByUniqueId(id:any): Observable<any>{
  return this.http.get(gums_api_url+'/component-master/UniqueId/'+id)
 .pipe(catchError(this.handleError));
}


getEventNameByUniqueId(id:any): Observable<any>{
  return this.http.get(gums_api_url+'/event-master/UniqueId/'+id)
 .pipe(catchError(this.handleError));
}





  GetComponentWiseEventListList(): Observable<any>{
    return this.http.get(gums_api_url+'/component-event')    
   .pipe(catchError(this.handleError));
 }

 GetComponentist(): Observable<any>{
  return this.http.get(gums_api_url+'/component-master/component')    
 .pipe(catchError(this.handleError));
}

GetEventList(): Observable<any>{
  return this.http.get(gums_api_url+'/event-master/event')    
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
