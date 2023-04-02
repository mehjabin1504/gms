import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';

@Injectable({
  providedIn: 'root'
})
export class UserMangementService {

  constructor(private http : HttpClient) { }

  GetUserMangementApprovalList(status:any): Observable<any> {
    return this.http.get(gums_api_url+'/user-management-approval/All/'+status+','+3)
    .pipe(catchError(this.handleError));
  }

  GetUserMangementListByUniqueId(id :any): Observable<any>{
    return this.http.get(gums_api_url+'/user-management-approval/'+id)
    .pipe(catchError(this.handleError));
  }

  UserMangementApprovalStatus(status:any,uniqueId:any){
    return this.http.get(gums_api_url+'/user-management-approval/approvalStatus/'+status+','+uniqueId)
    .pipe(catchError(this.handleError));
  }

  CreateUserMangementApproval(data:any){
    return this.http.post<any>(gums_api_url+'/user-management-approval/',data)
    .pipe(catchError(this.handleError));
  }

  UpdateUserMangementApproval(uniqueId:any,data:any){
    return this.http.patch<any>(gums_api_url+'/user-management-approval/'+uniqueId,data)
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
