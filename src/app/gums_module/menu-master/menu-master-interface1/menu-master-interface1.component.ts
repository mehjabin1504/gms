import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationMasterApiService } from 'src/app/gums_module_api/application-master/application-master-api.service';
import { ComponentWiseEventMappingApiService } from 'src/app/gums_module_api/component-wise-mapping/component-wise-event-mapping-api.service';
import { ComponentMasterApiService } from 'src/app/gums_module_api/component_master/component-master-api.service';
import { EventWiseWorkflowApiService } from 'src/app/gums_module_api/event-wise-workflow/event-wise-workflow-api.service';
import { MenuMasterService } from 'src/app/gums_module_api/menu-master/menu-master.service';
import { UserMangementService } from 'src/app/gums_module_api/user-management-approval/user-mangement.service';
import { WorkflowDesignMasterApiService } from 'src/app/gums_module_api/workflow-design-master/workflow-design-master-api.service';
import { UserManagementApprovalModel } from 'src/app/gums_module_approved/user-management-approval/interface/user-management-approval.model';
import { MenuMasterModel } from '../model/menu-master.model';

@Component({
  selector: 'vex-menu-master-interface1',
  templateUrl: './menu-master-interface1.component.html',
  styleUrls: ['./menu-master-interface1.component.scss']
})
export class MenuMasterInterface1Component implements OnInit {

  userManagementApprovalobj: UserManagementApprovalModel = new UserManagementApprovalModel();
  mode: 'create' | 'update' = 'create';
  form: UntypedFormGroup;
  submitted = false;
  divMain : boolean =false;
  divHide : boolean =true;
  /*Value Assign Variable */
  itemArr: any = [];
  updateValueArray: any = [];
  oldValueArray: any = [];
  currentDate: any;
  minDate : any;
  ComponentUniqueId: any;
  EventCode: any;
  WorkflowUniqueId: any;
  ApprovalAuthoritiesArrayData: any = [];
  myDate = new Date();
  /*End*/ 

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,private fb: UntypedFormBuilder,private ApplicationMasterApi: ApplicationMasterApiService,
    private MenuMasterApi:MenuMasterService,
    private dialogRef: MatDialogRef<MenuMasterInterface1Component>,
    private EventWiseWorkflowApi: EventWiseWorkflowApiService,
    private WorkflowDesignMasterApi: WorkflowDesignMasterApiService,
    private ComponentWiseEventMappingApi: ComponentWiseEventMappingApiService,
    private UserMangementApi:UserMangementService,
    private ComponentMasterApi: ComponentMasterApiService,
    private snackbar: MatSnackBar,) { }

   Program= [
    { value: 'AP', label: 'Add parallel' },
    { value: 'AC', label: 'Add Child' },
    { value: 'Modify', label: 'Modify' },
  ];

  StatusFlag = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'In-Active' },
  ];

  MenuType = [
    { value: 'Menu', label: 'Menu' },
    { value: 'Leaf', label: 'Leaf' },
  ];

  applicationId :any;
  serial :any;
  ngOnInit(): void {
    this.applicationId = this.MenuMasterApi.getApplicationUniqueId();
    this.serial = this.MenuMasterApi.getMenuSerial();
    console.log("this.applicationId :"+this.applicationId)
    console.log("this.serial "+this.serial)
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as MenuMasterModel;
    }
    this.GetApplicationMasterList();
    this.GetComponentistMethod();
    this.form = this.fb.group({
      uniqueId:this.defaults.uniqueId ||  '',
      applicationUniqueId: this.defaults.applicationUniqueId || this.applicationId,
      componentUniqueId : this.defaults.componentUniqueId || '',
      parentUniqueId : this.defaults.parentUniqueId || '',
      componentName : this.defaults.componentName || '',
      menuType : this.defaults.menuType || '',
      levelCode : this.defaults.levelCode || '',
      menuSerial : this.defaults.menuSerial || this.serial,
      createBy :this.defaults.createBy ||  '',
      updateBy : this.defaults.updateBy || '',
      activeFlag :this.defaults.activeFlag ||  '',
      Child_Id: this.defaults.Child_Id || '',
      programId: this.defaults.programId || '',
      subProgramId: this.defaults.subProgramId || '',
    });
  }


  isCreateMode() {
    return this.mode === 'create';

  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  onReset(){
     this.submitted = false;
    this.form.reset()
  }

  get f() {
    return this.form.controls;
  }

  prevent(event) {
    event.preventDefault();
  }

  /* Application Master Get Api Calling
     URL :  */
     Application:any=[];
     GetApplicationMasterList(){
      this.ApplicationMasterApi.GetApplicationsListByQuery().
      subscribe(data=>{
        this.Application = data.application
      },err=>{
        alert(err)
      });
     }

     componentName: any = [];
     GetComponentistMethod() {
      this.ComponentWiseEventMappingApi. GetComponentist().
        subscribe(data => {
          this.componentName = data;
          // console.log(this.componentName)
        }, err => {
          alert(err)
        });
    }

    EventWiseSelection(){
      if(this.form.value.programId ==='Modify'){
        this.divMain=true;
         this.mode = 'update';
         this.divHide = false;
      }
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
          this.createMenuMaster();
        } else if (this.mode === 'update') {
          // this.updateRoleMaster();
        }
      }
    }

    createMenuMaster() {
      const message = this.form.value;
      this.dialogRef.close(message);
      this.GetComponentMasterByComponentID();
    }



    /*Calling Component Master Api*/
  /**/
  /* Component Id get from Enter this Page */
  GetComponentMasterByComponentID() {
    this.ComponentMasterApi.GetComponentMasterByComponentId('menu-master')
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

}
