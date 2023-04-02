import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApprovalAuthoritiesSharedService {

  ApprovalAuthorities;

  constructor() {
    this.ApprovalAuthorities = {}
   }

   setApprovalAuthorities(val : object){
    this.ApprovalAuthorities= val;
   }

   getApprovalAuthorities(){
    return this.ApprovalAuthorities;
   }
}
