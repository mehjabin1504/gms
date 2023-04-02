import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationMasterApiService } from 'src/app/gums_module_api/application-master/application-master-api.service';
import { ComponentWiseEventMappingApiService } from 'src/app/gums_module_api/component-wise-mapping/component-wise-event-mapping-api.service';
import { EventWiseDynamicItemModel } from '../model/event-wise-dynamic-item.model';

@Component({
  selector: 'vex-event-wise-dynamic-item-interface',
  templateUrl: './event-wise-dynamic-item-interface.component.html',
  styleUrls: ['./event-wise-dynamic-item-interface.component.scss']
})
export class EventWiseDynamicItemInterfaceComponent implements OnInit {

  itemArr: any = [];
  componentName: any = [];
  eventName:any=[];
  gridView :  boolean = true;
  submitted = false;
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<EventWiseDynamicItemInterfaceComponent>,
              private fb: UntypedFormBuilder,private ApplicationMasterApi: ApplicationMasterApiService,
              private ComponentWiseApi:ComponentWiseEventMappingApiService,) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as EventWiseDynamicItemModel;
    }

    this.GetApplicationMasterList();
    this.GetComponentistMethod();
    this.GetEventListMethod();
    
    this.form = this.fb.group({
      uniqueId: [this.defaults.uniqueId || ''],
      applicationUniqueId: [this.defaults.applicationUniqueId || ''],
      componentUniqueId: [this.defaults.componentUniqueId || ''],
      eventUniqueId: [this.defaults.eventUniqueId || ''],
      itemId: [this.defaults.itemId || ''],
      itemUniqueDataType: [this.defaults.itemUniqueDataType || ''],
      itemName: [this.defaults.itemName || ''],
      itemLevel: [this.defaults.itemLevel || ''],
      minNumber: [this.defaults.minNumber || ''],
      maxNumber: [this.defaults.maxNumber || ''],
      required: [this.defaults.required || ''],
      minLength: [this.defaults.minLength || ''],
      maxLength: [this.defaults.maxLength || ''],
      pattern: [this.defaults.pattern || ''],
      createdBy: [this.defaults.createdBy || ''],
      approvalAuthorities: [this.defaults.approvalAuthorities || ''],
      updatedBy: [this.defaults.updatedBy || ''],
      activeFlag: [this.defaults.activeFlag || ''],
      additionalInformation: [this.defaults.additionalInformation || ''],
      patternType: [this.defaults.patternType || ''],
      email: [this.defaults.email || ''],
      patternExpresion:[this.defaults.patternExpresion || ''],
      rightOfPrevious: [this.defaults.rightOfPrevious || ''],
      xposition: [this.defaults.xposition || ''],
      yposition:[this.defaults.yposition || '']
    });
  }

   /* Application Master Get Api Calling
     URL : http://192.168.88.122:8088/teller/v1/positive-pay-instruction */
     Application:any=[];
     GetApplicationMasterList(){
      this.ApplicationMasterApi.GetApplicationsListByQuery().
      subscribe(data=>{
        this.Application = data.application
      },err=>{
        alert(err)
      });
     }

     GetComponentistMethod() {
      this.ComponentWiseApi. GetComponentist().
        subscribe(data => {
          this.componentName = data;
          // console.log(this.componentName)
        }, err => {
          alert(err)
        });
    }

    GetEventListMethod() {
      this.ComponentWiseApi.GetEventList().
        subscribe(data => {
          this.eventName = data;
          // console.log(this.eventName)
        }, err => {
          alert(err)
        });
    }

     get f() {
      return this.form.controls;
    }
    onReset(){
      this.submitted = false;
      this.form.reset()    
    }
    onSubmit(){
      console.log("Submit : "+ JSON.stringify(this.form.value))
    }
  
    prevent(event) {
      event.preventDefault();
    }

  save() {
    if (this.mode === 'create') {
      this.createEventWiseDynamicItem();
    } else if (this.mode === 'update') {
      this.updateEventWiseDynamicItem();
    }
  }

  createEventWiseDynamicItem() {
    const c_eventWiseDynamicItem = this.form.value;
    this.dialogRef.close(c_eventWiseDynamicItem);
  }

  updateEventWiseDynamicItem() {
    const c_eventWiseDynamicItem = this.form.value;
    this.dialogRef.close(c_eventWiseDynamicItem);
  }

  isCreateMode() {
    this.showGridView();
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }


  showGridView(){
    this.gridView = false;
  }

  

  addContractInfo(item: any) {
    setTimeout(() => {
        this.itemArr.push(item)
        console.log(this.itemArr)
        this.form.reset();
    });
  };

  onDeleteItem(index: number) {
    this.itemArr.splice(index, 1);
  }


  Submit(){
    console.log("this.itemArr"+this.itemArr)
  }
}
