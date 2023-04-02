import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OldValueSharedService } from 'src/app/common-shared-service/old-value/old-value-shared.service';
import { ComponentWiseActivityMappingApiService } from 'src/app/gums_module_api/component-wise-activity-mapping/component-wise-activity-mapping-api.service';
import { ComponentWiseEventMappingApiService } from 'src/app/gums_module_api/component-wise-mapping/component-wise-event-mapping-api.service';
import { ComponentMasterApiService } from 'src/app/gums_module_api/component_master/component-master-api.service';
import { EventWiseWorkflowApiService } from 'src/app/gums_module_api/event-wise-workflow/event-wise-workflow-api.service';
import { UserMangementService } from 'src/app/gums_module_api/user-management-approval/user-mangement.service';
import { WorkflowDesignMasterApiService } from 'src/app/gums_module_api/workflow-design-master/workflow-design-master-api.service';
import { UserManagementApprovalModel } from 'src/app/gums_module_approved/user-management-approval/interface/user-management-approval.model';

import { ComponentWiseEventMappingModel } from '../../component-wise-event-mapping/interfaces/component-wise-event-mapping-model';
import { ComponentWiseActivityMappingModel } from '../interfaces/component-wise-activity-mapping-model';

@Component({
  selector: 'vex-component-wise-activity-mapping-entry',
  templateUrl: './component-wise-activity-mapping-entry.component.html',
  styleUrls: ['./component-wise-activity-mapping-entry.component.scss']
})
export class ComponentWiseActivityMappingEntryComponent implements OnInit {

  userManagementApprovalobj: UserManagementApprovalModel = new UserManagementApprovalModel();

  oldValueArray: any = []; 
  itemArr: any = [];
  newValueViewObject={}
  viewParameter : string;
  submitted = false;
  currentDate: any;
  minDate : any;
  ComponentUniqueId: any;
  EventCode: any;
  WorkflowUniqueId: any;

  myDate = new Date();
  ApprovalAuthoritiesArrayData: any = [];
  
   
  form: UntypedFormGroup;
  mode: 'create' | 'update' |'view' = 'create';
  // array of additionalCheck required dropdown Field
  
  componentName: any = [];
  activityName :any=[];
 activeFlag = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  ActivityName1:any; 
  ComponentName1:any;

 
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ComponentWiseActivityMappingEntryComponent>,
        private fb: UntypedFormBuilder,
        private OldValueShared:OldValueSharedService,private ComponentWiseApi:ComponentWiseEventMappingApiService,
        private ComponentWiseActivityMappingApi :ComponentWiseActivityMappingApiService,
        private snackbar: MatSnackBar,
        private ComponentMasterApi: ComponentMasterApiService,
        private ComponentWiseEventMappingApi: ComponentWiseEventMappingApiService,
        private EventWiseWorkflowApi: EventWiseWorkflowApiService,
        private WorkflowDesignMasterApi: WorkflowDesignMasterApiService,
        private UserMangementApi:UserMangementService,
        
  ) { }

  ngOnInit() {
    // this.viewParameter = this.OldValueShared.getViewParameter();
    // console.log("this.viewParameter = "+this.viewParameter)
    if (this.defaults && this.viewParameter != 'V') {     
      this.mode = 'update';
    }
    else if(this.viewParameter === 'V'){
      this.mode = 'view';
    } else {
      this.defaults = {} as ComponentWiseActivityMappingModel;
    }

    this.form = this.fb.group({
   
      uniqueId:this.defaults.uniqueId || '',
      activityUniqueId:  [this.defaults.activityUniqueId || '', [Validators.required]],
      //  activityName:this.defaults.activityName || '',

      componentUniqueId:  [this.defaults.componentUniqueId|| '', [Validators.required]],
      //  componentName:this.defaults.componentName || '', 
      
      activeFlag: [this.defaults.activeFlag || '', [Validators.required]],
      
    });


    this.GetComponentistMethod();
    this.GetActivityListMethod()
    

  }

  GetComponentistMethod() {
    this.ComponentWiseApi. GetComponentist().
      subscribe(data => {
        this.componentName = data;
        console.log(this.componentName)
      }, err => {
        alert(err)
      });
  }

  GetActivityListMethod() {
    this.ComponentWiseActivityMappingApi.GetActivityList().
      subscribe(data => {
        this.activityName = data;
         console.log(this.activityName)
      }, err => {
        alert(err)
      });
  }


  // save() {
  //   if (this.mode === 'create') {
  //     // this.createMessage();
  //   } else if (this.mode === 'update') {
  //     // this.updateMesage();
  //   }
  // }

  get f() {
    return this.form.controls;
  }
 
// isCreateMode() {
//     return this.mode === 'create';
    
//   }

//   isUpdateMode() {
//     return this.mode === 'update';
//   }
  
  isViewMode(){
    return this.mode === 'view'
  }


  
  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      this.snackbar.open('Please fill all the required  Info!', null, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['snackbar1']
      });
      return false;
    } else {
      if (this.mode === 'create') {
        this.createRoleMaster();
      } else if (this.mode === 'update') {
        //  this.updateRoleMaster();
      }
    }
  }

  onReset(){
    this.submitted = false;
    this.form.reset()
  }


  GetComponentMasterByComponentID() {
    this.ComponentMasterApi.GetComponentMasterByComponentId('component-wise-activity-mappin')
      .subscribe(res => {
        this.ComponentUniqueId = res.uniqueId;
        this.GetComponentWiseEventMappingByComponentUniqueIdAndEventAction();
      },
        err => {
          alert('Interface Url Not Found !')
        })
  }
  /*End Component Master Api*/


  /*Calling ComponentWiseEventMapping*/
  /**/
  GetComponentWiseEventMappingByComponentUniqueIdAndEventAction() {
    this.ComponentWiseEventMappingApi.GetComponentEventByComponentUniqueIdAndEventAction
      (this.ComponentUniqueId, 'New')
      .subscribe(res => {
        this.EventCode = res.eventUniqueId;
        this.GetEventWiseWorkflowByEventUniqueId();
        console.log("this.EventCode" + this.EventCode)
      },
        err => {
          alert('Event Code Not Found !')
        })

  }
  /*End Component Wise Event Mapping Api*/


  /*Calling Event Wise Workflow*/
  /**/
  GetEventWiseWorkflowByEventUniqueId() {
    this.EventWiseWorkflowApi.GetEventWiseWorkflowByEventUniqueId
      (this.EventCode)
      .subscribe(res => {
        this.WorkflowUniqueId = res.workflowUniqueId;
        this.WorkflowDetails();
      },
        err => {
          alert('Workflow Id Not Found !')
        })
  }


  ApprovalAuthorities: any;
  nextRoleId: any;
  options: any = {};
  WorkflowDetails() {
    this.WorkflowDesignMasterApi.WorkflowDetailsByWorkflowId
      (this.WorkflowUniqueId)
      .subscribe(res => {
        this.ApprovalAuthorities = res.WorkFlowDetails;
        for (let i = 0; i < this.ApprovalAuthorities.length; i++) {
          // delete this.ApprovalAuthorities[i].roleUniqueId;
          if (this.ApprovalAuthorities[i].makerCheckerLevel == 1) {
            this.ApprovalAuthorities[i].updateBy = "Sabbir"
            this.ApprovalAuthorities[i].updateDate = this.myDate
            this.ApprovalAuthorities[i].status = "Done"
          }
          if (this.ApprovalAuthorities[i].makerCheckerLevel == 2) {
            this.nextRoleId = this.ApprovalAuthorities[i].roleUniqueId;
          }

          this.ApprovalAuthoritiesArrayData = this.ApprovalAuthorities[i]
        }

        this.DataSave();
      },
        err => {
          alert('Workflow Details Not Found !')
        })
  }




  ComponentNameListMethodByUniqueId() {
    this.ComponentWiseApi.getComponentNameByUniqueId(this.form.value.componentUniqueId).
      subscribe(data => {
        console.log("data : "+data)
        this.ComponentName1 = data[0].label;
      }, err => {
        alert(err)
      });
  }

  ActivityNameListMethodByUniqueId() {
    this.ComponentWiseActivityMappingApi.getActivityNameByUniqueId(this.form.value.activityUniqueId).
      subscribe(data => {
        console.log("data : "+data)
        this.ActivityName1 = data[0].label;
      }, err => {
        alert(err)
      });
  }

  /*End Component Wise Event Mapping Api*/
  masterAccount: any;
  formValue: any;
  DataSave() {
    this.userManagementApprovalobj.operationType = 'New';
    this.formValue = this.form.value;
    this.masterAccount = Object.assign(this.formValue, { createdBy: '100140' });
    this.userManagementApprovalobj.componentUniqueId = this.ComponentUniqueId;
    this.userManagementApprovalobj.eventUniqueId = this.EventCode;
    this.userManagementApprovalobj.workflowUniqueId = this.WorkflowUniqueId;

    this.userManagementApprovalobj.approvalStatus = 'Pending';
    this.userManagementApprovalobj.createdBy = '100140';

    this.userManagementApprovalobj.nextLevel = '2';
    this.userManagementApprovalobj.nextRole = this.nextRoleId;
    this.userManagementApprovalobj.approvalLevel = this.ApprovalAuthorities.length;


    this.userManagementApprovalobj.approvalAuthorities = this.ApprovalAuthorities;
    this.itemArr.push(this.masterAccount);
    this.userManagementApprovalobj.oldValue = null;
    this.userManagementApprovalobj.newValue = this.itemArr;
    this.userManagementApprovalobj.newValueView = this.NewViewArray;
    console.log(this.userManagementApprovalobj);

    this.UserMangementApi.CreateUserMangementApproval(this.userManagementApprovalobj)
   
      .subscribe(res => {
        alert('data added')
      },
        err => {
          alert('No data added')
        })
  }



  // getRoleMasterInfoById(uniqueId: any) {
  //   this.ComponentWiseActivityMappingApi.GetComponentWiseActivityMappingByUniqueId(uniqueId)
  //     .subscribe(res => {
  //       this.oldValueArray.push(res);
  //       this.GetComponentMasterByComponentID1();
  //     },
  //       err => {
  //         alert('Old Value Not Found for Modify Unique Id ! ')
  //       })
  // }

  // /*Calling Component Master Api*/
  // /**/
  // /* Component Id get from Enter this Page */
  // GetComponentMasterByComponentID1() {
  //   this.ComponentMasterApi.GetComponentMasterByComponentId('component-wise-activity-mappin')
  //     .subscribe(res => {
  //       this.ComponentUniqueId = res.uniqueId;
  //       this.GetComponentWiseEventMappingByComponentUniqueIdAndEventAction1();
  //     },
  //       err => {
  //         alert('Interface Url Not Found !')
  //       })
  // }
  // /*End Component Master Api*/


  // /*Calling ComponentWiseEventMapping*/
  // /**/
  // GetComponentWiseEventMappingByComponentUniqueIdAndEventAction1() {
  //   this.ComponentWiseEventMappingApi.GetComponentEventByComponentUniqueIdAndEventAction
  //     (this.ComponentUniqueId, 'Modify')
  //     .subscribe(res => {
  //       this.EventCode = res.eventUniqueId;
  //       this.GetEventWiseWorkflowByEventUniqueId1();
  //       console.log("this.EventCode" + this.EventCode)
  //     },
  //       err => {
  //         alert('Event Code Not Found !')
  //       })

  // }
  // /*End Component Wise Event Mapping Api*/


  // /*Calling Event Wise Workflow*/
  // /**/
  // GetEventWiseWorkflowByEventUniqueId1() {
  //   this.EventWiseWorkflowApi.GetEventWiseWorkflowByEventUniqueId
  //     (this.EventCode)
  //     .subscribe(res => {
  //       this.WorkflowUniqueId = res.workflowUniqueId;
  //       this.WorkflowDetails1();
  //     },
  //       err => {
  //         alert('Workflow Id Not Found !')
  //       })
  // }

  // WorkflowDetails1() {
  //   this.WorkflowDesignMasterApi.WorkflowDetailsByWorkflowId
  //     (this.WorkflowUniqueId)
  //     .subscribe(res => {
  //       this.ApprovalAuthorities = res.WorkFlowDetails;
  //       for (let i = 0; i < this.ApprovalAuthorities.length; i++) {
  //         // delete this.ApprovalAuthorities[i].roleUniqueId;
  //         if (this.ApprovalAuthorities[i].makerCheckerLevel == 1) {
  //           this.ApprovalAuthorities[i].updateBy = "Sabbir"
  //           this.ApprovalAuthorities[i].updateDate = this.myDate
  //           this.ApprovalAuthorities[i].status = "Done"
  //         }
  //         if (this.ApprovalAuthorities[i].makerCheckerLevel == 2) {
  //           this.nextRoleId = this.ApprovalAuthorities[i].roleUniqueId;
  //         }

  //         this.ApprovalAuthoritiesArrayData = this.ApprovalAuthorities[i]
  //       }

  //       this.DataSave1();
  //     },
  //       err => {
  //         alert('Workflow Details Not Found !')
  //       })
  // }

  // DataSave1() {
  //   this.userManagementApprovalobj.operationType = 'Modify';
  //   this.formValue = this.form.value;
  //   this.masterAccount = Object.assign(this.formValue, { updatedBy: '100141' });

  //   this.userManagementApprovalobj.componentUniqueId = this.ComponentUniqueId;
  //   this.userManagementApprovalobj.eventUniqueId = this.EventCode;
  //   this.userManagementApprovalobj.workflowUniqueId = this.WorkflowUniqueId;

  //   this.userManagementApprovalobj.approvalStatus = 'Pending';
  //   this.userManagementApprovalobj.createdBy = '100140';

  //   this.userManagementApprovalobj.nextLevel = '2';
  //   this.userManagementApprovalobj.nextRole = this.nextRoleId;
  //   this.userManagementApprovalobj.approvalLevel = this.ApprovalAuthorities.length;


  //   this.userManagementApprovalobj.approvalAuthorities = this.ApprovalAuthorities;
  //   this.itemArr.push(this.masterAccount);
  //   this.userManagementApprovalobj.oldValue = this.oldValueArray;
  //   this.userManagementApprovalobj.newValue = this.itemArr;
  //   this.userManagementApprovalobj.newValueView = this.itemArr;

  //   this.UserMangementApi.CreateUserMangementApproval(this.userManagementApprovalobj)
  //     .subscribe(res => {
  //       // console.log(res)
  //       alert('data added')
  //     },
  //       err => {
  //         alert('No data added')
  //       })
  // }





  createRoleMaster() {
    const message = this.form.value;
    this.dialogRef.close(message);
    this.GetComponentMasterByComponentID();
  }

  // updateRoleMaster() {
  //   this.getRoleMasterInfoById(this.form.value.uniqueId);
  // }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  NewViewArray :any =[];
  NewViewMethod(){
    
    this.masterAccount = Object.assign(this.newValueViewObject,{ComponentName:this.ComponentName1},
      {ActiveFlag:this.form.value.activeFlag},{ActivityName:this.ActivityName1} 
             
      )
      this.NewViewArray.push(this.masterAccount);
      
  }



}
