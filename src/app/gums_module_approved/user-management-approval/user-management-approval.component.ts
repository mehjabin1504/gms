import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UserManagementApprovalModel } from './interface/user-management-approval.model';
import { catchError, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApprovalAuthoritiesSharedService } from 'src/app/common-shared-service/approval-authorities/approval-authorities-shared.service';
import { NewValueSharedService } from 'src/app/common-shared-service/new-value/new-value-shared.service';
import { UserManagementApprovalSharedService } from 'src/app/common-shared-service/user-management-approval/user-management-approval-shared.service';
import { OldValueSharedService } from 'src/app/common-shared-service/old-value/old-value-shared.service';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { UserMangementService } from 'src/app/gums_module_api/user-management-approval/user-mangement.service';
import { WorkflowDesignMasterApiService } from 'src/app/gums_module_api/workflow-design-master/workflow-design-master-api.service';
import { ComponentWiseEventMappingApiService } from 'src/app/gums_module_api/component-wise-mapping/component-wise-event-mapping-api.service';
import { gums_api_url } from 'src/app/app.middleware.url';


@UntilDestroy()
@Component({
  selector: 'vex-non-financial-approval-new',
  templateUrl: 'user-management-approval.component.html',
  styleUrls: ['./user-management-approval.component.scss']
})
export class UserManagementApprovalComponent implements OnInit {
  message: any = [];

  form: UntypedFormGroup;
  result: string;
  obj_NonFinancialModel: UserManagementApprovalModel[];

  searchCtrl = new UntypedFormControl();
  layoutCtrl = new UntypedFormControl('boxed');
  selectCtrl: UntypedFormControl = new UntypedFormControl();
  nonfinincialApprovalModelobj: UserManagementApprovalModel = new UserManagementApprovalModel();
  OldValue: any;
  NewValue: any;
  ApproveAuthorities: any;
  myDate = new Date();
  /*Copy*/
  p_NonFinancialDataList: any = [];

  var_ApprovalData: any = [];
  var_RejectData: any = [];
  var_uniqueId: any;


  subject$: ReplaySubject<UserManagementApprovalModel[]> = new ReplaySubject<UserManagementApprovalModel[]>();
  data$: Observable<UserManagementApprovalModel[]> = this.subject$.asObservable();
  obj_EventWiseDynamicItemModel: UserManagementApprovalModel[];

  columns: TableColumn<UserManagementApprovalModel>[] = [
    { label: 'Operation Type', property: 'operationType', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Event Name', property: 'eventName', type: 'text', visible: true },
    { label: 'Component Name', property: 'componentName', type: 'text', visible: true },
    { label: 'Workflow Name', property: 'workflowName', type: 'text', visible: false },
    { label: 'Show Details', property: 'showDetails', type: 'button', visible: true },
    { label: 'Approve Status', property: 'approvalStatus', type: 'button', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Next Level', property: 'nextLevel', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Next Role', property: 'nextRole', type: 'text', visible: false, cssClasses: ['font-medium'] },
    { label: 'Approval Level', property: 'approvalLevel', type: 'text', visible: false },
    //  { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<UserManagementApprovalModel> | null;
  selection = new SelectionModel<UserManagementApprovalModel>(true, []);



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  obj: any;

  constructor(private dialog: MatDialog, private non_financial_api: UserMangementService,
    private OldValueShared: OldValueSharedService, private NewValueShared: NewValueSharedService,
    private ApprovalAuthoritiesShared: ApprovalAuthoritiesSharedService,
    private fb: UntypedFormBuilder, private WorkflowMasterApi: WorkflowDesignMasterApiService,
    private ComponentWiseEventMappingApi: ComponentWiseEventMappingApiService,
    private http: HttpClient) {
  }


  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(this.p_NonFinancialDataList.map(data => new (data)));
  }

  ngOnInit() {
    this.GetGetUserMangementList();

    this.getData().subscribe(data => {
      this.subject$.next(data);
    });

    this.dataSource = new MatTableDataSource();

    this.Searching();

    this.form = this.fb.group({
      uniqueID: [''],
      operationType: [''],
      eventCode: [''],
      userInterfaceId: [''],
      workflowId: [''],
      approveStatus: [''],
      createBy: [''],
      nextLevel: [''],
      nextRole: [''],
      approvalLevel: [''],
      oldValue: [''],
      newValue: [''],
      approvalAuthorities: [''],
      updateBy: [''],
      updatedTime: [''],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: UserManagementApprovalModel) {
    const index = this.obj_EventWiseDynamicItemModel.findIndex(c => c === row);
    this.obj_EventWiseDynamicItemModel[index] = change.value;
    this.subject$.next(this.obj_EventWiseDynamicItemModel);
  }


  /* Non Financial Approval Get All Api Calling
     URL : http://192.168.88.122:4200/teller/v1/NonFinancialApproval */

  GetGetUserMangementList() {
    this.non_financial_api.GetUserMangementApprovalList('Pending').
      subscribe(data => {
        this.dataSource.data = data;
        this.obj_NonFinancialModel = data;
      }, err => {
        alert(err)
      });
  }

  /* Event Wise Dynamic Item Get Api Calling Value Search */

  Searching() {
    this.searchCtrl.valueChanges.pipe(untilDestroyed(this))
      .subscribe(value => this.onFilterChange(value));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  /* Open Dialog Source Code */
  OldValueDialog(row: any) {
    this.GetNonFinancialListByUniqueId(row.uniqueId);
  }


  GetUniqueId(p_NonFinancialDataList: UserManagementApprovalModel) {
    this.GetNonFinancialListByUniqueId(p_NonFinancialDataList.uniqueID);
  }


  /* Non Financial Approval Get Api by unique Id Calling
  URL : http://192.168.88.122:4200/teller/v1/NonFinancialApproval/{uniqueId}
  */

  GetNonFinancialListByUniqueId(uniqueID: any) {

    this.non_financial_api.GetUserMangementListByUniqueId(uniqueID).
      subscribe(data => {
        this.NewValueShared.setNewValue(data.newValueView);
        this.ApprovalAuthoritiesShared.setApprovalAuthorities(data.approvalAuthorities);
        this.OldValueShared.setOldValue(data.oldValue);

        /*  Open Show Details Modal*/
        this.dialog.open(ShowDetailsComponent, {
          disableClose: false,
          width: '100%'
        }).afterClosed().subscribe(result => {
          this.result = result;
        });
        /* End Modal */
      }, err => {
        alert(err)
      });
  }



  ValueGet($event: any, nonFinancialModel: UserManagementApprovalModel) {
    console.log(" $event1" + $event)

    if ($event == "Approve") {
      this.var_ApprovalData.push(nonFinancialModel);
      console.log("this.var_ApprovalData" + this.var_ApprovalData.length)
    }
    else if ($event == "Reject") {
      this.var_RejectData.push(nonFinancialModel);
      console.log(" this.var_RejectData" + this.var_RejectData)
    }
  }



  /* After Approval Call this method*/
  approvalAuthorities: any;
  nonfinancialUniqueId: any;
  nextLevelValue: any;
  ComponentUniqueId: any;
  operationType: any;
  newValue: any;
  uniqueId: any;
  nonfinincialApprovalModelValue: any;
  approvalAuthoritiesData: any;
  roleId: any;
  nextLevel: any;
  nextRole: any;
  DataInsertApi() {
    for (let i = 0; i < this.var_ApprovalData.length; i++) {
      this.uniqueId = this.var_ApprovalData[i].uniqueId;
      console.log("this.var_ApprovalData[i].uniqueId "+JSON.stringify(this.var_ApprovalData[i]));
      console.log("this.uniqueId :"+this.uniqueId)
      if (this.var_ApprovalData[i].eventUniqueId == 90) {
        this.newValue = this.var_ApprovalData[i].newValue;
      } else {
        this.newValue = this.var_ApprovalData[i].newValue[0];
      }
      this.nextLevelValue = this.var_ApprovalData[i].nextLevel;
      this.nextRole = this.var_ApprovalData[i].nextRole;
      this.operationType = this.var_ApprovalData[i].operationType;
      this.ComponentUniqueId = this.var_ApprovalData[i].componentUniqueId;
      this.approvalAuthoritiesData = this.var_ApprovalData[i].approvalAuthorities;
      this.nextLevel = this.var_ApprovalData[i].nextLevel;

      if (this.nextLevelValue == this.var_ApprovalData[i].approvalLevel) {
        if (this.operationType === 'New') {
          for (let i = 0; i < this.approvalAuthoritiesData.length; i++) {
            if (this.approvalAuthoritiesData[i].makerCheckerLevel === this.nextLevelValue) {
              this.approvalAuthoritiesData[i].updateBy = 'Jahirul';
              this.approvalAuthoritiesData[i].updateDate = this.myDate;
              this.approvalAuthoritiesData[i].status = 'Approve';
            }
          }
          this.nonfinincialApprovalModelobj.approvalAuthorities = this.approvalAuthoritiesData;
          this.nonfinincialApprovalModelobj.updatedBy = 'Jahirul';
          this.nonfinincialApprovalModelobj.updatedTime = this.myDate;
          this.nonfinincialApprovalModelobj.nextLevel = this.nextLevelValue;
          this.nonfinincialApprovalModelobj.nextRole = this.nextRole;
          Object.assign(this.newValue, { approvalAuthorities: this.approvalAuthoritiesData })
          this.nonfinincialApprovalModelValue = this.nonfinincialApprovalModelobj;
          this.PostGetComponentWiseEventMappingByComponentUniqueIdAndEventAction();
        } else {
          for (let i = 0; i < this.approvalAuthoritiesData.length; i++) {
            if (this.approvalAuthoritiesData[i].makerCheckerLevel === this.nextLevelValue) {
              this.approvalAuthoritiesData[i].updateBy = 'Jahirul';
              this.approvalAuthoritiesData[i].updateDate = this.myDate;
              this.approvalAuthoritiesData[i].status = 'Approve';
            }
          }
          this.nonfinincialApprovalModelobj.approvalAuthorities = this.approvalAuthoritiesData;
          this.nonfinincialApprovalModelobj.updatedBy = 'Jahirul';
          this.nonfinincialApprovalModelobj.updatedTime = this.myDate;
          this.nonfinincialApprovalModelobj.nextLevel = this.nextLevelValue;
          this.nonfinincialApprovalModelobj.nextRole = this.nextRole;
          Object.assign(this.newValue, { updatedApprovalAuthorities: this.approvalAuthoritiesData })
          this.nonfinincialApprovalModelValue = this.nonfinincialApprovalModelobj;
          this.ModifyGetComponentWiseEventMappingByComponentUniqueIdAndEventAction();
        }

      } else {
        this.nonfinancialUniqueId = this.var_ApprovalData[i].uniqueID
        this.approvalAuthorities = this.var_ApprovalData[i].approvalAuthorities;
        console.log("this.approvalAuthorities =" + JSON.stringify(this.approvalAuthorities))
        for (let i = 0; i < this.approvalAuthorities.length; i++) {
          if (this.approvalAuthorities[i].makerCheckerLevel === this.nextLevelValue) {
            this.approvalAuthorities[i].updateBy = 'Rahim'
            this.approvalAuthorities[i].updateDate = this.myDate
            this.approvalAuthorities[i].status = 'Approve'

          }
          else if (Number(this.approvalAuthorities[i].makerCheckerLevel) == Number(this.nextLevelValue) + 1) {
            this.roleId = this.approvalAuthorities[i].roleUniqueId;
            this.nextLevel = (Number(this.nextLevel) + 1);
            console.log(" this.nextLevel " + this.nextLevel)

          }
        }
        this.nonfinincialApprovalModelobj.approvalAuthorities = this.approvalAuthorities;
        this.nonfinincialApprovalModelobj.updatedBy = 'Rahim'
        this.nonfinincialApprovalModelobj.updatedTime = this.myDate
        this.nonfinincialApprovalModelobj.nextLevel = this.nextLevel.toString();
        this.nonfinincialApprovalModelobj.nextRole = this.roleId;
        this.non_financial_api.UpdateUserMangementApproval(this.nonfinancialUniqueId, this.nonfinincialApprovalModelobj)
          .subscribe(res => {
            alert('data Updated')
          },
            err => {
              alert('No data Updated')
            })
      }
    }
  }

  WorkflowDesignMasterApi(data: any) {
    this.WorkflowMasterApi.CreateWorkflowDesignMaster(data)
      .subscribe(res => {
        alert('data added')
        this.ApprovalStatusChange();
      },
        err => {
          alert('No data added')
        })
  }


  ApprovalStatusChange() {
    this.non_financial_api.UserMangementApprovalStatus("Active", this.uniqueId).
      subscribe(data => {
        alert("Approval Status Change Successfully")
        this.GetGetUserMangementList();
      },
        err => {
          alert('Error')
        })
  }


  /*Calling ComponentWiseEventMapping*/
  /*http://192.168.88.122:8089/gums/v1/component-event/ComponentWiseEvent/{componentUniqueId},{EventAction}*/
  apiReference: any;
  PostGetComponentWiseEventMappingByComponentUniqueIdAndEventAction() {
    this.ComponentWiseEventMappingApi.GetComponentEventByComponentUniqueIdAndEventAction
      (this.ComponentUniqueId, 'New')
      .subscribe(res => {
        console.log("Successfully! Calling ComponentWiseEventMapping")
        console.log("Successfully! Calling ComponentWiseEventMapping = " + res.apiReference)
        this.InsertApiCalling(res);
      },
        err => {
          alert('Create or New Api Reference URL Not Found !')
        })

  }

  /*Calling ComponentWiseEventMapping*/
  /*http://192.168.88.122:8089/gums/v1/component-event/ComponentWiseEvent/{componentUniqueId},{EventAction}*/
  apiReference1: any;
  ModifyGetComponentWiseEventMappingByComponentUniqueIdAndEventAction() {
    this.ComponentWiseEventMappingApi.GetComponentEventByComponentUniqueIdAndEventAction
      (this.ComponentUniqueId, 'Modify')
      .subscribe(res => {
        console.log("Rex :" + JSON.stringify(res))
        this.InsertApiCalling(res)
      },
        err => {
          alert('Modify Api Reference URL Not Found !')
        })

  }

  /* Insert Api Calling for All Setup page ! */
  InsertApiCalling(res: any) {
        if (res.eventAction === 'New') {
      return this.http.post<any>(gums_api_url + res.apiReference, this.newValue).subscribe(res => {
        this.non_financial_api.UpdateUserMangementApproval(this.uniqueId, this.nonfinincialApprovalModelValue)
          .subscribe(res => {
            // console.log(res)
            alert('data Updated')
            this.ApprovalStatusChange();
          },
            err => {
              alert('No data Updated ' + gums_api_url + res.apiReference || ' + ' || this.uniqueId || ' + ' || this.nonfinincialApprovalModelValue)
            })
        alert('Data Save In Database !')
      },
        err => {
          alert('Data  Do not Insert Successfully !')
        })
    } else {
      console.log("this.uniqueId : "+this.uniqueId)
      return this.http.patch<any>(gums_api_url + res.apiReference + '/' + this.newValue.uniqueId, this.newValue).subscribe(res => {
        this.non_financial_api.UpdateUserMangementApproval(this.uniqueId, this.nonfinincialApprovalModelValue)
          .subscribe(res => {
            alert('data Updated')
            this.ApprovalStatusChange();
          },
            err => {
              alert('No data Updated ' + gums_api_url + res.apiReference || ' + ' || this.uniqueId || ' + ' || this.nonfinincialApprovalModelValue)
            })
      },
        err => {
          alert('Data Do not Update Successfully !')
        })
    }
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is the problem with the Service, Please contact with System Administrator.');
  }
}
