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
  selector: 'vex-menu-master-interface',
  templateUrl: './menu-master-interface.component.html',
  styleUrls: ['./menu-master-interface.component.scss']
})
export class MenuMasterInterfaceComponent implements OnInit {

  userManagementApprovalobj: UserManagementApprovalModel = new UserManagementApprovalModel();
  mode: 'create' | 'update' = 'create';
  form: UntypedFormGroup;
  submitted = false;
  divMain : boolean =false;
  divHide : boolean =true;
  menuMasterValue:any;
  Program :any=[];
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

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,private fb: UntypedFormBuilder,
  private ApplicationMasterApi: ApplicationMasterApiService,
  private dialogRef: MatDialogRef<MenuMasterInterfaceComponent>,
    private MenuMasterApi:MenuMasterService, 
    private EventWiseWorkflowApi: EventWiseWorkflowApiService,
    private WorkflowDesignMasterApi: WorkflowDesignMasterApiService,
    private ComponentWiseEventMappingApi: ComponentWiseEventMappingApiService,
    private UserMangementApi:UserMangementService,
    private ComponentMasterApi: ComponentMasterApiService,
    private snackbar: MatSnackBar,) { }


  dropdownSelection(){
    console.log(this.menuMasterValue.menuType)
    if(this.menuMasterValue.menuType==='Menu'){
      this.Program= [
        { value: 'AP', label: 'Add parallel' },
        { value: 'AC', label: 'Add Child' },
        { value: 'Modify', label: 'Modify' },
      ];
    }
    else if(this.menuMasterValue.menuType==='Leaf'){
      this.Program= [
        { value: 'AP', label: 'Add parallel' },
        { value: 'Modify', label: 'Modify' },
      ];
    }
  }
   

  StatusFlag = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'In-Active' },
  ];

  MenuType = [
    { value: 'Menu', label: 'Menu' },
    { value: 'Leaf', label: 'Leaf' },
  ];

  ngOnInit(): void {

    this.menuMasterValue = this.MenuMasterApi.getMenuMasterByUniueId();

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as MenuMasterModel;
    }
    this.GetApplicationMasterList();
    this.GetComponentistMethod();
    this.form = this.fb.group({
      uniqueId:this.defaults.uniqueId ||  '',
      applicationUniqueId: this.defaults.applicationUniqueId || '',
      componentUniqueId : this.defaults.componentUniqueId || '',
      parentUniqueId : this.defaults.parentUniqueId || '',
      componentName : this.defaults.componentName || '',
      menuType : this.defaults.menuType || '',
      levelCode : this.defaults.levelCode || '',
      menuSerial : this.defaults.menuSerial || '',
      activeFlag :this.defaults.activeFlag ||  '',
      Child_Id: this.defaults.Child_Id || '',
      programId: this.defaults.programId || '',
      subProgramId: this.defaults.subProgramId || '',
    });
    this.dropdownSelection();
  }

  onSelectionChangedexchange() {
    if (this.form.value.menuType ==='Leaf') {
      this.form.get('componentUniqueId').enable();
    }
    else {
      this.form.get('componentUniqueId').disable();
    }
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
      this.ComponentWiseEventMappingApi.GetComponentist().
        subscribe(data => {
          this.componentName = data;
          // console.log(this.componentName)
        }, err => {
          alert(err)
        });
    }


    SerialNumber :number;
    GetMenuMasterSerial(res:any) {
      this.mode === 'create'
      if(res.parentUniqueId!= null){
        this.MenuMasterApi.GetMenuSerialByQuery(res.applicationUniqueId,res.parentUniqueId).
        subscribe(data => {
          this.SerialNumber = data;
          this.form.controls['applicationUniqueId'].patchValue(res.applicationUniqueId);
          this.form.controls['parentUniqueId'].patchValue(res.parentUniqueId);
          this.form.controls['menuType'].patchValue(res.menuType);
          this.form.controls['levelCode'].patchValue(res.levelCode);
          this.form.controls['menuSerial'].patchValue(this.SerialNumber);
          this.form.controls['activeFlag'].patchValue(res.activeFlag);
        }, err => {
          alert(err)
        });
      }else{
        this.MenuMasterApi.GetMenuSerialByQuery(res.applicationUniqueId,0).
        subscribe(data => {
          this.SerialNumber = data;
        }, err => {
          alert(err)
        });
      }
      
    }
    GetMenuMasterSerialforChild(res:any) {
      this.mode === 'create'
      if(res.parentUniqueId!= null){
        this.MenuMasterApi.GetMenuSerialByQuery(res.applicationUniqueId,res.uniqueId).
        subscribe(data => {
          this.SerialNumber = data;
          this.form.controls['applicationUniqueId'].patchValue(res.applicationUniqueId);
          this.form.controls['parentUniqueId'].patchValue(res.uniqueId);
          this.form.controls['menuType'].patchValue('Leaf');
          this.form.controls['levelCode'].patchValue(parseInt(res.levelCode)+1);
          this.form.controls['menuSerial'].patchValue(this.SerialNumber);
          this.form.controls['activeFlag'].patchValue(res.activeFlag);
        }, err => {
          alert(err)
        });
      }else{
        this.MenuMasterApi.GetMenuSerialByQuery(res.applicationUniqueId,0).
        subscribe(data => {
          this.SerialNumber = data;
        }, err => {
          alert(err)
        });
      }
      
    }

    EventWiseSelection(){
      if(this.form.value.programId ==='Modify'){
        this.divMain=true;
         this.mode = 'update';
         this.divHide = false;
         this.getOnForm(this.menuMasterValue);
      }
      else if(this.form.value.programId ==='AP'){
        this.divMain=true;
        this.divHide = false;
        this.getparallelMethod(this.menuMasterValue);
      }
      else{
        this.divMain=true;
        this.divHide = false;
        this.getChildMethod(this.menuMasterValue);
      }
    }

    getOnForm(res:any){
      this.form.controls['uniqueId'].patchValue(res.uniqueId); 
      this.form.controls['applicationUniqueId'].patchValue(res.applicationUniqueId);
      this.form.controls['componentUniqueId'].patchValue(res.componentUniqueId);    
      this.form.controls['parentUniqueId'].patchValue(res.parentUniqueId);
      this.form.controls['menuType'].patchValue(res.menuType);
      this.form.controls['levelCode'].patchValue(res.levelCode);
      this.form.controls['menuSerial'].patchValue(res.menuSerial);
      this.form.controls['activeFlag'].patchValue(res.activeFlag);
      this.form.controls['componentName'].patchValue(res.componentName); 
    }

    getparallelMethod(res:any){
      this.GetMenuMasterSerial(res);
    }

    getChildMethod(res:any){
      this.GetMenuMasterSerialforChild(res);      
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
          this.updateMenuMaster();
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

  updateMenuMaster() {
    this.getMenuMasterInfoById(this.form.value.uniqueId);
  }

  /* ComponentMaster Get by uniqueId
    URL :  */
  getMenuMasterInfoById(uniqueId: any) {
    this.MenuMasterApi.GetMenuMasterByUniqueId(uniqueId)
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
    this.ComponentMasterApi.GetComponentMasterByComponentId('menu-master')
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
