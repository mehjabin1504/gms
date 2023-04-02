import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewValueSharedService {

  NewValue;

  constructor() {
    this.NewValue = {}
   }

   setNewValue(val : object){
    this.NewValue= val;
   }

   getNewValue(){
    return this.NewValue;
   }
}
