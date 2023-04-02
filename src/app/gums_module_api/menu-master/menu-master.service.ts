import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';

@Injectable({
  providedIn: 'root'
})
export class MenuMasterService {

  menuMasterByUniueId;
  applicationUniqueId : number;
  menuSerial:number

  constructor(private http: HttpClient) {
    this.menuMasterByUniueId = {}
    this.applicationUniqueId = 0;
    this.menuSerial= 0;
  }

  setMenuMasterByUniueId(val: object) {
    this.menuMasterByUniueId = val;
  }
  setApplicationUniqueId(val: number) {
    this.applicationUniqueId = val;
  }
  setMenuSerial(val: number) {
    this.menuSerial = val;
  }

  getMenuMasterByUniueId() {
    return this.menuMasterByUniueId;
  }
  getApplicationUniqueId(){
    return this.applicationUniqueId;
  }
  getMenuSerial(){
    return this.menuSerial;
  }

  GetMenuMasterList(applicationUniqueId: any): Observable<any> {
    return this.http.get(gums_api_url + '/menu-master/' + applicationUniqueId)
      .pipe(catchError(this.handleError));
  }

  GetMenuMasterByUniqueId(uniqueId: any): Observable<any> {
    return this.http.get(gums_api_url + '/menu-master/menu/' + uniqueId)
      .pipe(catchError(this.handleError));
  }

  GetMenuMasterByUniqueIdQuery(uniqueId: any): Observable<any> {
    return this.http.get(gums_api_url + '/menu-master/menu-query/' + uniqueId)
      .pipe(catchError(this.handleError));
  }

  GetMenuSerialByQuery(applicationUniqueId: any,parentUniqueId: any): Observable<any> {
    return this.http.get(gums_api_url + '/menu-master/menu-serial/' + applicationUniqueId +','+parentUniqueId)
      .pipe(catchError(this.handleError));
  }



  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is the problem with the Service, Please contact with System Administrator.');
  }
}
