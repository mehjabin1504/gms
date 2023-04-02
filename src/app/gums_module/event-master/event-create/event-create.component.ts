import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentWiseEventMappingApiService } from 'src/app/gums_module_api/component-wise-mapping/component-wise-event-mapping-api.service';
import { ComponentMasterApiService } from 'src/app/gums_module_api/component_master/component-master-api.service';
import { EventWiseWorkflowApiService } from 'src/app/gums_module_api/event-wise-workflow/event-wise-workflow-api.service';

import { UserMangementService } from 'src/app/gums_module_api/user-management-approval/user-mangement.service';
import { WorkflowDesignMasterApiService } from 'src/app/gums_module_api/workflow-design-master/workflow-design-master-api.service';
import { UserManagementApprovalModel } from 'src/app/gums_module_approved/user-management-approval/interface/user-management-approval.model';
import { EventMasterComponent } from '../event-master.component';
import { EventMasterModel } from '../interface/event-master.model';

import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { UntilDestroy } from '@ngneat/until-destroy';



@UntilDestroy()
@Component({
  selector: 'vex-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]

})
export class EventCreateComponent implements OnInit {

  static id = 100;
  itemArr: any = [];
  gridView: boolean = true;


  /*Value Assign Variable */

  ComponentUniqueId: any;
  EventCode: any;
  WorkflowUniqueId: any;

  form: UntypedFormGroup;
  myDate = new Date();
  ApprovalAuthoritiesArrayData : any = [];

  mode: 'create' | 'update' = 'create';

  userManagementApprovalModelobj: UserManagementApprovalModel = new UserManagementApprovalModel();

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EventMasterComponent>,
    private fb: UntypedFormBuilder,
    private ComponentMasterApi: ComponentMasterApiService,
    private ComponentWiseEventMappingApi: ComponentWiseEventMappingApiService,
    private EventWiseWorkflowApi: EventWiseWorkflowApiService,
    private WorkflowDesignMasterApi: WorkflowDesignMasterApiService,
    private userManagementApi: UserMangementService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as EventMasterModel;
    }

    this.form = this.fb.group({
      eventId: [this.defaults.eventId || ''],
      // accountSubGroupCode: [this.defaults.accountSubGroupCode || ''],
      eventName: [this.defaults.eventName || ''],
      activeFlag: [this.defaults.activeFlag || '']     
    });
  }


  createThirdPartySolution() {
    const message = this.form.value;
    this.dialogRef.close(message);
    this.GetComponentMasterByComponentID();
  }

  GetComponentMasterByComponentID() {
    this.ComponentMasterApi.GetComponentMasterByComponentId('Application_Master')
      .subscribe(res => {
        this.ComponentUniqueId = res.uniqueId;
        console.log("Component Unique Id:" + this.ComponentUniqueId)
        // this.GetComponentWiseEventMappingByComponentUniqueIdAndEventAction();
      },
        err => {
          alert('Interface Url Not Found !')
        })
  }
  /*End Component Master Api*/


  /*Calling ComponentWiseEventMapping*/
  /*http://localhost:8089/gums/v1/component-event/ComponentWiseEvent/{componentUniqueId},{EventAction}*/
  // GetComponentWiseEventMappingByComponentUniqueIdAndEventAction() {
  //   this.ComponentWiseEventMappingApi.GetComponentEventByComponentUniqueIdAndEventAction
  //     (this.ComponentUniqueId, 'New')
  //     .subscribe(res => {
  //       this.EventCode = res.eventUniqueId;
  //       this.GetEventWiseWorkflowByEventUniqueId();
  //       console.log("this.EventCode" + this.EventCode)
  //     },
  //       err => {
  //         alert('Event Code Not Found !')
  //       })

  // }
  /*End Component Wise Event Mapping Api*/


  /*Calling Event Wise Workflow*/
    /*http://10.11.200.78:8089/gums/v1/event-wise-work-flow/EventUniqueId/{EventUniqueId}*/
    GetEventWiseWorkflowByEventUniqueId(){
      this.EventWiseWorkflowApi.GetEventWiseWorkflowByEventUniqueId
      (this.EventCode)
      .subscribe(res=>{
        this.WorkflowUniqueId = res.workflowUniqueId;
        console.log("WorkflowUniqueId:"+this.WorkflowUniqueId);
        this.WorkflowDetails();
      },
      err=>{
        alert('Workflow Id Not Found !')
      })
    }


  ApprovalAuthorities:any;
  nextRoleId :any;
   options:any = {};
    WorkflowDetails(){
      this.WorkflowDesignMasterApi.WorkflowDetailsByWorkflowId
      (this.WorkflowUniqueId)
      .subscribe(res=>{
        this.ApprovalAuthorities = res.WorkFlowDetails;
        for(let i = 0; i<this.ApprovalAuthorities.length;i++){
          // delete this.ApprovalAuthorities[i].roleUniqueId;
          if(this.ApprovalAuthorities[i].makerCheckerLevel == 1){
            this.ApprovalAuthorities[i].updateBy="Ahnaf"
            this.ApprovalAuthorities[i].updateDate=this.myDate
            this.ApprovalAuthorities[i].status="Done"
          }
          if(this.ApprovalAuthorities[i].makerCheckerLevel == 2){
            this.nextRoleId = this.ApprovalAuthorities[i].roleUniqueId;
          }

          this.ApprovalAuthoritiesArrayData = this.ApprovalAuthorities[i]      
        }      
        
        this.DataSave();
      },
      err=>{
        alert('Workflow Details Not Found !')
      })    
  }

  /*End Component Wise Event Mapping Api*/


  detailsAccountValue : any =[];

  
  detailsValue:any;

  DataSave() {
    const message = this.form.value;
    //  console.log(this.form.value);

    for(let i=0;i<this.itemArr.length;i++){
      this.detailsValue = Object.assign(this.itemArr[i],{createdBy : '100100'},
      {createTime : '2012-12-12'},{activeFlag:'Y'});

      this.detailsAccountValue.push(this.detailsValue)

      console.log("this.detailsAccountValue"+ JSON.stringify(this.detailsAccountValue))
      
    }

    this.userManagementApprovalModelobj.operationType = 'New';

    this.userManagementApprovalModelobj.approvalStatus = 'Pending';
    this.userManagementApprovalModelobj.createdBy = '100100';

    this.userManagementApprovalModelobj.nextLevel = '2';
    this.userManagementApprovalModelobj.nextRole = this.nextRoleId;

    this.userManagementApprovalModelobj.eventUniqueId = this.EventCode ;
    this.userManagementApprovalModelobj.componentUniqueId = this.ComponentUniqueId ;
    this.userManagementApprovalModelobj.workflowUniqueId = this.WorkflowUniqueId;

    this.userManagementApprovalModelobj.approvalLevel = this.ApprovalAuthorities.length;
    this.userManagementApprovalModelobj.approvalAuthorities = this.ApprovalAuthorities;
    this.userManagementApprovalModelobj.oldValue = null;
    this.userManagementApprovalModelobj.newValue = this.itemArr;

    console.log(this.userManagementApprovalModelobj);
    console.log(this.itemArr);

    const createAppObserver = {
      next: res => {
        console.log(res)
        alert('data added')
      },
      error: err => {
        alert('No data added')

      },
    };

    this.userManagementApi.CreateUserMangementApproval(this.userManagementApprovalModelobj)
      .subscribe(createAppObserver);

    //this.dialogRef.close(this.userManagementApprovalModelobj);
    this.dialogRef.close(message);
  }


  save() {
    if (this.mode === 'create') {
      this.createThirdPartySolution();
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


  showGridView() {
    this.gridView = false;
  }



  addAppInfo(item: any) {
    setTimeout(() => {
      this.itemArr.push(item)
      console.log(this.itemArr)
      this.form.reset();
    });
  };

  onDeleteItem(index: number) {
    this.itemArr.splice(index, 1);
  }


  Submit() {
    console.log("this.itemArr" + this.itemArr)

  }

}
