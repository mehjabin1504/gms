import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OldValueSharedService {

  OldValue;

  constructor() {
    this.OldValue = {}
   }

   setOldValue(val : object){
    this.OldValue= val;
   }

   getOldValue(){
    return this.OldValue;
   }
}
