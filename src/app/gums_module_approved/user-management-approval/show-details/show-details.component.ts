import { Component, Inject, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApprovalAuthoritiesSharedService } from 'src/app/common-shared-service/approval-authorities/approval-authorities-shared.service';
import { OldValueSharedService } from 'src/app/common-shared-service/old-value/old-value-shared.service';
import { NewValueSharedService } from 'src/app/common-shared-service/new-value/new-value-shared.service';


@Component({
  selector: 'vex-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  form: UntypedFormGroup;
  p_oldvalue:  any =[];
  p_newvalue:  any =[];
  newValue :any =[];
  p_approval_authorities: any =[];
  
  _object = Object ;
  _object1 = Object;
  _object2 = Object;
  _object3 = Object;
  _object4 = Object;
  
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<ShowDetailsComponent>,
  private OldValueShared:OldValueSharedService,private NewValueShared:NewValueSharedService,
  private ApprovalAuthoritiesShared:ApprovalAuthoritiesSharedService) { }
    
  
  ngOnInit() {
    this.AllDataStoreMethod()
  }

  oldValue : any;
  AllDataStoreMethod(){
    this.p_oldvalue = this.OldValueShared.getOldValue();
    this.p_newvalue = this.NewValueShared.getNewValue();
    this.newValue = this.p_newvalue[0];
   
    if(this.p_oldvalue != null){
      this.parseJsonOldValue(this.p_oldvalue[0]);
    }
    
    this.p_approval_authorities = this.ApprovalAuthoritiesShared.getApprovalAuthorities();

    this.parseJsonNewValue(this.newValue);

    
  }


  detailsObject : any ;
  KeyValue : any;
  parseJsonNewValue(json: any) {
    for (let key in json) {
        if (typeof json[key] === 'object') {
          if(json[key]!=null){
            this.KeyValue = key;
            this.detailsObject = json[key];
          }        
          
        } else {
        }
    }
  }


  detailsObject1 : any ;
  KeyValue1 : any;
  parseJsonOldValue(json: any) {
    for (let key in json) {
        if (typeof json[key] === 'object') {
          if(json[key]!=null){
            if(key!='approvalAuthorities'){
              this.KeyValue1 = key;
              this.detailsObject1 = json[key];
            }                       
          }        
          
        } else {
        }
    }
  }

 
}
