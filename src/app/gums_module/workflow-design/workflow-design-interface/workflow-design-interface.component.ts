import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkflowMasterModel } from '../model/workflow-design.model';

@Component({
  selector: 'vex-workflow-design-interface',
  templateUrl: './workflow-design-interface.component.html',
  styleUrls: ['./workflow-design-interface.component.scss']
})
export class WorkflowDesignInterfaceComponent implements OnInit {
  mode: 'create' | 'update' = 'create';

  masterFormGroup: UntypedFormGroup;
  detailsFormGroup: UntypedFormGroup;

  itemArr: any = [];
  gridView :  boolean = true;


  passwordInputType = 'password';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,private fb: UntypedFormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as WorkflowMasterModel;
    }
    
     
     
    this.masterFormGroup = this.fb.group({
      uniqueId:this.defaults.uniqueId,
      workflowId: [this.defaults.workflowId || '',Validators.required],
      workflowName: [this.defaults.workflowName || '',Validators.required],
      fromAmount: [this.defaults.fromAmount|| '',Validators.required],
      toAmount: [this.defaults.toAmount|| '',Validators.required],
      makerCheckerLevel: [this.defaults.makerCheckerLevel|| '',Validators.required],
      createdBy: this.defaults.createdBy|| '',
      approvalAuthorities: this.defaults.approvalAuthorities|| '',
      updatedBy: this.defaults.updatedBy|| '',
      activeFlag: this.defaults.activeFlag|| '',
      additionalInformation: this.defaults.additionalInformation|| '', 
      additionalCheckerLevel: [this.defaults.additionalCheckerLevel|| '',Validators.required],
    });

    this.detailsFormGroup = this.fb.group({
      uniqueId:this.defaults.uniqueId,
      workflowUniqueId: [this.defaults.workflowUniqueId || '',Validators.required],
      tellerLimitType: [this.defaults.tellerLimitType|| '',Validators.required],
      warningOverride: [this.defaults.warningOverride|| '',Validators.required],
      rollId: [this.defaults.rollId|| '',Validators.required],
      makerCheckerLevel:[this.defaults.makerCheckerLevel|| ''],
      createdBy: this.defaults.createdBy|| '',
      approvalAuthorities: this.defaults.approvalAuthorities|| '',
      updatedBy: this.defaults.updatedBy|| '',
      activeFlag: this.defaults.activeFlag|| '',
      additionalInformation: this.defaults.additionalInformation|| '', 
      additionalCheckerLevel: this.defaults.additionalCheckerLevel|| '', 
    });
  }

  


  addDetailsInfo(item: any) {
    setTimeout(() => {
        this.itemArr.push(item)
        console.log(this.itemArr)
        this.detailsFormGroup.reset();
    });
  };

  onDeleteItem(index: number) {
    this.itemArr.splice(index, 1);
  }

  isCreateMode() {
    this.gridView = false;
    return this.mode === 'create';    
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  workflowMaster : any;
  workflow : any =[];
  Submit(){
    this.workflowMaster = this.masterFormGroup.value;
    this.workflow.push(Object.assign(this.workflowMaster,{workFlowDesignDetailsSet:this.detailsFormGroup.value}))
    console.log("this.workflow : "+JSON.stringify(this.workflow))

  }
}