import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';

@Injectable({
  providedIn: 'root'
})
export class DataTypeSetupService {

  constructor(private http : HttpClient) {  }

  GetAllDataTypeList(): Observable<any>{
    return this.http.get(gums_api_url+'/data-type-setup')
    .pipe(catchError(this.handleError));
  }

  GetDataTypeByUniqueId(uniqueId:any): Observable<any>{
    return this.http.get(gums_api_url+'/data-type-setup/'+uniqueId)
    .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
        console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
       return throwError('There is the problem with the Event Service, Please contact with System Administrator.');
  }
}
