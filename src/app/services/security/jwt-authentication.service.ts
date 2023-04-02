import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { gums_api_url } from 'src/app/app.middleware.url';
import { LocalStorageService } from './local-storage.service';
export const TOKEN = 'token';
export const SESSIONID = 'sessionid';
export const AUTHENTICATED_ID = 'authenticaterUserId';
export const AUTHENTICATED_NAME = 'authenticaterUserName';
export const BRANCH_CODE = 'branchCode';
export const BRANCH_NAME = 'branchName';
export const GROUP_CODE = 'groupCode';
@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService
   ) { }

  tokenVal = '';
  userId = '';
  compcode = '';
  userCode = '';
  userGroupCode = '';
  userName: any = '';
  designation: any = '';
  companyName: any = '';
  branchName: any = '';
  hubType: any = '';
  branchCode: any = '';
  errorCode: any = '';
  errorMsg: any = '';
  nodes: any = [];
  menuList: any = [];


  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse.error);
    }
    return throwError(errorResponse.message + 'There is the problem on Service');
  }
  executeJWTAuthenticationService(username: any, password: any) {
    return this.httpClient.post<any>(`${gums_api_url}/authenticate`, { username, password }).pipe(
      map(
        data => {
          this.tokenVal = `${data.token}`;
          console.log("Token: " + this.tokenVal);
          if (this.tokenVal.length > 0) {

            this.localStorageService = new LocalStorageService();

            // sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            // sessionStorage.setItem(AUTHENTICATED_ID, `${data.info.userInfo.usercode}`);
            // sessionStorage.setItem(AUTHENTICATED_NAME, `${data.info.userInfo.username}`);
            // sessionStorage.setItem(BRANCH_CODE, `${data.info.userInfo.branchcode}`);
            // sessionStorage.setItem(BRANCH_NAME, `${data.info.userInfo.branchname}`);
            // sessionStorage.setItem(GROUP_CODE, `${data.info.userInfo.groupcode}`);

            this.localStorageService.setItem(TOKEN, `Bearer ${data.token}`);
            this.localStorageService.setItem(AUTHENTICATED_ID, `${data.info.userInfo.usercode}`);
            this.localStorageService.setItem(AUTHENTICATED_NAME, `${data.info.userInfo.username}`);
            this.localStorageService.setItem(BRANCH_CODE, `${data.info.userInfo.branchcode}`);
            this.localStorageService.setItem(BRANCH_NAME, `${data.info.userInfo.branchname}`);
            this.localStorageService.setItem(GROUP_CODE, `${data.info.userInfo.groupcode}`);

            

           

            sessionStorage.setItem('checkMenu', '');
            this.errorMsg = data.info.errorMsg;
            return data;
          } else {
            return data;
          }
        }
      ), catchError(this.handleError)
    );
  }

  logOut() {

    // sessionStorage.removeItem(AUTHENTICATED_ID);
    // sessionStorage.removeItem(TOKEN);
    // sessionStorage.removeItem(AUTHENTICATED_NAME);
    // sessionStorage.removeItem(BRANCH_CODE);
    // sessionStorage.removeItem(BRANCH_NAME);
    // sessionStorage.removeItem(GROUP_CODE);

    this.localStorageService.clear();

    //localStorage.removeItem(AUTHENTICATED_ID);

  }

  isUserLoggedIn() {
    //let userId = localStorage.getItem(AUTHENTICATED_ID);
    // let userId = sessionStorage.getItem(AUTHENTICATED_ID);
    // this.userName = sessionStorage.getItem(AUTHENTICATED_NAME);
    // this.designation = sessionStorage.getItem(GROUP_CODE);
    // this.branchName = sessionStorage.getItem(BRANCH_NAME);
    // this.branchCode = sessionStorage.getItem(BRANCH_CODE);

    let userId = this.localStorageService.getItem(AUTHENTICATED_ID);
    this.userName = this.localStorageService.getItem(AUTHENTICATED_NAME);
    this.designation = this.localStorageService.getItem(GROUP_CODE);
    this.branchName = this.localStorageService.getItem(BRANCH_NAME);
    this.branchCode = this.localStorageService.getItem(BRANCH_CODE);

    return !(userId === null);
  }

  getAuthenticatedUser() {
    sessionStorage.setItem('checkMenu', '');
    //return sessionStorage.getItem(AUTHENTICATED_ID)

    return this.localStorageService.getItem(AUTHENTICATED_ID);
  }

  getAuthenticatedToken(): any {
    if (this.getAuthenticatedUser()){
      //return sessionStorage.getItem(TOKEN)
      return this.localStorageService.getItem(TOKEN);
    }
  }

}
