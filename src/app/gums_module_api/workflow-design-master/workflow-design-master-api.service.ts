import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';

@Injectable({
  providedIn: 'root'
})
export class WorkflowDesignMasterApiService {

  constructor(private http : HttpClient) { }


  GetWorkflowDesignMasterList(): Observable<any>{
    return this.http.get(gums_api_url+'/workflow-design-master')
    .pipe(catchError(this.handleError));
  }

  GetWorkflowDesignMasterByUniqueId(id :any): Observable<any>{
    return this.http.get(gums_api_url+'/workflow-design-master/'+id)
    .pipe(catchError(this.handleError));
  }


  CreateWorkflowDesignMaster(data:any){
    return this.http.post<any>(gums_api_url+'/workflow-design-master/',data)
    .pipe(catchError(this.handleError));
  }


  UpdateWorkflowDesignMaster(data:any){
    return this.http.patch<any>(gums_api_url+'/workflow-design-master/',data)
    .pipe(catchError(this.handleError));
  }


  GetWorkflowDesignMasterByWorkflowId(WorkflowId :any): Observable<any>{
    return this.http.get(gums_api_url+'/workflow-design-master/WorkflowId/'+WorkflowId)
    .pipe(catchError(this.handleError));
  }


  WorkflowDesignMasterList(): Observable<any>{
    return this.http.get(gums_api_url+'/workflow-design-master/DesignMasterId')
    .pipe(catchError(this.handleError));
  }
  
  WorkflowDetailsByWorkflowId(WorkflowId:any): Observable<any>{
    return this.http.get(gums_api_url+'/workflow-design-master/WorkflowDetails/'+WorkflowId)
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