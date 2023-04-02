import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationMasterApiService } from 'src/app/gums_module_api/application-master/application-master-api.service';
import { ComponentWiseEventMappingApiService } from 'src/app/gums_module_api/component-wise-mapping/component-wise-event-mapping-api.service';
import { ComponentMasterApiService } from 'src/app/gums_module_api/component_master/component-master-api.service';
import { EventWiseWorkflowApiService } from 'src/app/gums_module_api/event-wise-workflow/event-wise-workflow-api.service';
import { RoleMasterService } from 'src/app/gums_module_api/role-master/role-master.service';
import { UserMangementService } from 'src/app/gums_module_api/user-management-approval/user-mangement.service';
import { WorkflowDesignMasterApiService } from 'src/app/gums_module_api/workflow-design-master/workflow-design-master-api.service';
import { UserManagementApprovalModel } from 'src/app/gums_module_approved/user-management-approval/interface/user-management-approval.model';
import { ComponentMasterInterfaceComponent } from '../../component-master/component-master-interface/component-master-interface.component';
import { RoleMasterModel } from '../model/role-master.model';

@Component({
  selector: 'vex-role-master-interface',
  templateUrl: './role-master-interface.component.html',
  styleUrls: ['./role-master-interface.component.scss']
})
export class RoleMasterInterfaceComponent implements OnInit {

  
  userManagementApprovalobj: UserManagementApprovalModel = new UserManagementApprovalModel();
  // static id = 100;
  itemArr: any = [];
  updateValueArray: any = [];
  oldValueArray: any = [];
  ApprovalAuthoritiesArrayData: any = [];
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';
  myDate = new Date();
  /*Value Assign Variable */
  submitted = false;
  currentDate: any;
  minDate : any;
  ComponentUniqueId: any;
  EventCode: any;
  WorkflowUniqueId: any;

  /*End*/ 

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ComponentMasterInterfaceComponent>,
    private fb: UntypedFormBuilder, private UserMangementApi:UserMangementService,
    private ComponentMasterApi: ComponentMasterApiService,
    private ComponentWiseEventMappingApi: ComponentWiseEventMappingApiService,
    private EventWiseWorkflowApi: EventWiseWorkflowApiService,
    private WorkflowDesignMasterApi: WorkflowDesignMasterApiService,
    private snackbar: MatSnackBar,private RoleMasterApi:RoleMasterService
    ) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';      
    } else {
      this.defaults = {} as RoleMasterModel;
    }

    this.form = this.fb.group({
      uniqueId: this.defaults.uniqueId || '',
      roleId: [this.defaults.roleId ||'', [Validators.required]],
      roleName: [ this.defaults.roleName ||'', [Validators.required]],
      activeFlag: [ this.defaults.activeFlag ||'', [Validators.required]],
    });

  }

  tellerType = [
    { value: 'User', label: 'User' },
    { value: 'Role', label: 'Role' },
  ];



  operationCode = [
    { value: 'Debit', label: 'Debit' },
    { value: 'Credit', label: 'Credit' },
  ];


  limitType = [
    { value: 'Maker', label: 'Maker' },
    { value: 'Checker', label: 'Checker' }
  ];

  StatusFlag = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'In-Active' },
  ];

  get f() {
    return this.form.controls;
  }

  prevent(event) {
    event.preventDefault();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      this.snackbar.open('Please fill all the required fields to Setup Role Master Info!', null, {
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
        this.updateRoleMaster();
      }
    }
  }


  onReset(){
    this.submitted = false;
    this.form.reset()
  }

  /*Calling Component Master Api*/
  /**/
  /* Component Id get from Enter this Page */
  GetComponentMasterByComponentID() {
    this.ComponentMasterApi.GetComponentMasterByComponentId('role-master')
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
    this.userManagementApprovalobj.newValueView = this.itemArr;

    this.UserMangementApi.CreateUserMangementApproval(this.userManagementApprovalobj)
      .subscribe(res => {
        alert('data added')
      },
        err => {
          alert('No data added')
        })
  }


  createRoleMaster() {
    const message = this.form.value;
    this.dialogRef.close(message);
    this.GetComponentMasterByComponentID();
  }



  

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  updateRoleMaster() {
    this.getRoleMasterInfoById(this.form.value.uniqueId);
  }

  /* ComponentMaster Get by uniqueId
    URL :  */
  getRoleMasterInfoById(uniqueId: any) {
    this.RoleMasterApi.GetRoleMasterByUniqueId(uniqueId)
      .subscribe(res => {
        this.oldValueArray.push(res);
        this.GetComponentMasterByComponentID1();
      },
        err => {
          alert('Old Value Not Found for Modify Unique Id ! ')
        })
  }

  /*Calling Component Master Api*/
  /**/
  /* Component Id get from Enter this Page */
  GetComponentMasterByComponentID1() {
    this.ComponentMasterApi.GetComponentMasterByComponentId('role-master')
      .subscribe(res => {
        this.ComponentUniqueId = res.uniqueId;
        this.GetComponentWiseEventMappingByComponentUniqueIdAndEventAction1();
      },
        err => {
          alert('Interface Url Not Found !')
        })
  }
  /*End Component Master Api*/


  /*Calling ComponentWiseEventMapping*/
  /**/
  GetComponentWiseEventMappingByComponentUniqueIdAndEventAction1() {
    this.ComponentWiseEventMappingApi.GetComponentEventByComponentUniqueIdAndEventAction
      (this.ComponentUniqueId, 'Modify')
      .subscribe(res => {
        this.EventCode = res.eventUniqueId;
        this.GetEventWiseWorkflowByEventUniqueId1();
        console.log("this.EventCode" + this.EventCode)
      },
        err => {
          alert('Event Code Not Found !')
        })

  }
  /*End Component Wise Event Mapping Api*/


  /*Calling Event Wise Workflow*/
  /**/
  GetEventWiseWorkflowByEventUniqueId1() {
    this.EventWiseWorkflowApi.GetEventWiseWorkflowByEventUniqueId
      (this.EventCode)
      .subscribe(res => {
        this.WorkflowUniqueId = res.workflowUniqueId;
        this.WorkflowDetails1();
      },
        err => {
          alert('Workflow Id Not Found !')
        })
  }

  WorkflowDetails1() {
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

        this.DataSave1();
      },
        err => {
          alert('Workflow Details Not Found !')
        })
  }

  DataSave1() {
    this.userManagementApprovalobj.operationType = 'Modify';
    this.formValue = this.form.value;
    this.masterAccount = Object.assign(this.formValue, { updatedBy: '100141' });

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
    this.userManagementApprovalobj.oldValue = this.oldValueArray;
    this.userManagementApprovalobj.newValue = this.itemArr;
    this.userManagementApprovalobj.newValueView = this.itemArr;

    this.UserMangementApi.CreateUserMangementApproval(this.userManagementApprovalobj)
      .subscribe(res => {
        // console.log(res)
        alert('data added')
      },
        err => {
          alert('No data added')
        })
  }
}
