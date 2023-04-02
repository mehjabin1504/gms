import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';

@Injectable({
  providedIn: 'root'
})
export class ComponentMasterApiService {

  constructor(private http : HttpClient) { }


  GetComponentMasterByComponentId(componentId:any): Observable<any>{
     return this.http.get(gums_api_url+'/component-master/ComponentId/'+componentId)    
    .pipe(catchError(this.handleError));
  }

  
  GetComponentMasterList(): Observable<any>{
    return this.http.get(gums_api_url+'/component-master')    
   .pipe(catchError(this.handleError));
 }
 GetComponentMasterListByQuery(): Observable<any>{
  return this.http.get(gums_api_url+'/component-master/list')    
 .pipe(catchError(this.handleError));
}

 GetComponentMasterByUniqueId(id :any): Observable<any>{
   return this.http.get(gums_api_url+'/component-master/'+id)
   .pipe(catchError(this.handleError));
 }


 CreateComponentMaster(data:any){
   return this.http.post<any>(gums_api_url+'/component-master',data)
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
