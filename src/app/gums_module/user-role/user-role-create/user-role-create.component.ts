import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { ComponentWiseEventMappingApiService } from 'src/app/gums_module_api/component-wise-mapping/component-wise-event-mapping-api.service';
import { ComponentMasterApiService } from 'src/app/gums_module_api/component_master/component-master-api.service';
import { EventWiseWorkflowApiService } from 'src/app/gums_module_api/event-wise-workflow/event-wise-workflow-api.service';
import { UserMangementService } from 'src/app/gums_module_api/user-management-approval/user-mangement.service';
import { UserRoleApiService } from 'src/app/gums_module_api/user-role/user-role-api.service';
import { WorkflowDesignMasterApiService } from 'src/app/gums_module_api/workflow-design-master/workflow-design-master-api.service';
import { UserManagementApprovalModel } from 'src/app/gums_module_approved/user-management-approval/interface/user-management-approval.model';
import { UserRoleModel } from '../interface/user-role.model';

@Component({
  selector: 'vex-user-role-create',
  templateUrl: './user-role-create.component.html',
  styleUrls: ['./user-role-create.component.scss'],
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
export class UserRoleCreateComponent implements OnInit {

  static id = 100;
  itemArr: any = [];
  gridView: boolean = true;
  submitted = false;
  ComponentUniqueId: any;
  EventCode: any;
  WorkflowUniqueId: any;
  User:any=[];
  Role:any=[];
  form: UntypedFormGroup;
  myDate = new Date();
  ApprovalAuthoritiesArrayData : any = [];

  mode: 'create' | 'update' = 'create';

  userManagementApprovalModelobj: UserManagementApprovalModel = new UserManagementApprovalModel();

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UserRoleCreateComponent>,
    private fb: UntypedFormBuilder,
    private ComponentMasterApi: ComponentMasterApiService,
    private userApi:UserRoleApiService,
    private ComponentWiseEventMappingApi: ComponentWiseEventMappingApiService,
    private EventWiseWorkflowApi: EventWiseWorkflowApiService,
    private WorkflowDesignMasterApi: WorkflowDesignMasterApiService,
    private userManagementApi: UserMangementService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as UserRoleModel;
    }

    
    this.form = this.fb.group({
      userCode: [this.defaults.userCode || ''],
      roleId: [this.defaults.roleId || ''],
      // accountSubGroupCode: [this.defaults.accountSubGroupCode || ''],
      branchCode: [this.defaults.branchCode || ''],
      activeFlag: [this.defaults.activeFlag || ''],
      createdBy: [this.defaults.createdBy || ''],

    });

    this.getAllUsers();
    this.getAllRoles();
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
      },
        err => {
          alert('Interface Url Not Found !')
        })
  }


  getAllUsers(){
   
    this.userApi.GetAllUser()
    .subscribe(data=>{
      this.User = data;  
      console.log("dropdown data :",this.User);
    })
  }

  getAllRoles(){
    this.userApi.GetAllRole()
    .subscribe(data=>{
      this.Role = data;  
      console.log("dropdown role :",this.Role);
    })
  }
  
   
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
  
    prevent(event) {
      event.preventDefault();
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

  detailsAccountValue : any =[];

  
  detailsValue:any;

  DataSave() {
    const message = this.form.value;    

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
    console.log("this.itemArr " + this.itemArr)
  }
}