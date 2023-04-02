import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagementApprovalSharedService {

  OldValue : any | null;
  ApprovalAuthorities;
  NewValue;


  constructor() {
    this.NewValue = {},
    this.OldValue = {},
    this.ApprovalAuthorities = {}
   }

   setOldValue(val : object){
    this.OldValue= val;
   }

   getOldValue(){
    return this.OldValue;
   }
   
   setNewValue(val : object){
    this.NewValue= val;
   }

   getNewValue(){
    return this.NewValue;
   }
  

   setApprovalAuthorities(val : object){
    this.ApprovalAuthorities= val;
   }

   getApprovalAuthorities(){
    return this.ApprovalAuthorities;
   }
}
