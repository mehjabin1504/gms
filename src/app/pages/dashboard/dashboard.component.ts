import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { gums_api_url } from 'src/app/app.middleware.url';
import { LocalStorageService } from 'src/app/services/security/local-storage.service';

@Component({
  selector: 'vex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vaccessList: any=[];
  taccessList: any=[];
  constructor(private localStorageService: LocalStorageService,private http: HttpClient
    ) { }
   ngOnInit(): void {
    
     
     this.http.get(gums_api_url+'/getModuleList').pipe(catchError(this.handleError)).subscribe(res=>{
     
      this.taccessList = res;
 
       console.log("ModuleList", res);
       console.log("ModuleList assign", typeof(this.vaccessList));
       console.log(this.taccessList)
 
       for(let i=0; i < this.taccessList.length; i++){
 
         this.addmoduleInfo(this.taccessList[i]);
         console.log("Test ",this.taccessList[i]);
       }
 
     });

    }
   private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
        console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
       return throwError('There is the problem with the Service, Please contact with System Administrator.');
  }
 
 
   addmoduleInfo(item: any) {
     setTimeout(() => {
       this.vaccessList.push(item)
       console.log(this.vaccessList);
      
     });
   };
 
 }
 



