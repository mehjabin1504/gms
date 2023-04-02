import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of, ReplaySubject } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { WorkflowDesignMasterApiService } from 'src/app/gums_module_api/workflow-design-master/workflow-design-master-api.service';
import { WorkflowMasterModel } from './model/workflow-design.model';

import { WorkflowDesignInterfaceComponent } from './workflow-design-interface/workflow-design-interface.component';


@UntilDestroy()
@Component({
  selector: 'vex-workflow-design',
  templateUrl: './workflow-design.component.html',
  styleUrls: ['./workflow-design.component.scss'],
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
export class WorkflowDesignComponent implements OnInit {

  form: UntypedFormGroup;

  p_eventWiseDynamicItemModel: WorkflowMasterModel[];

  searchCtrl = new UntypedFormControl();
  layoutCtrl = new UntypedFormControl('boxed');
  result: string;
  

  /*Copy*/
  EventWiseDynamicItem : any =[];

  subject$: ReplaySubject<WorkflowMasterModel[]> = new ReplaySubject<WorkflowMasterModel[]>();
  data$: Observable<WorkflowMasterModel[]> = this.subject$.asObservable();
  obj_EventWiseDynamicItemModel: WorkflowMasterModel[];
 
  @Input()
  columns: TableColumn<WorkflowMasterModel>[] = [
    { label: 'Workflow Id', property: 'workflowId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Workflow Name', property: 'workflowName', type: 'text', visible: true },
    { label: 'From Amount', property: 'fromAmount', type: 'text', visible: true },
    { label: 'To Amount', property: 'toAmount', type: 'text', visible: true },
    { label: 'Maker Checker Level', property: 'makerCheckerLevel', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Additional Checker Level', property: 'additionalCheckerLevel', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<WorkflowMasterModel> | null;
  selection = new SelectionModel<WorkflowMasterModel>(true, []);



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private WorkflowMasterApi:WorkflowDesignMasterApiService,) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(this.EventWiseDynamicItem.map(data => new WorkflowMasterModel(data)));
  }

  ngOnInit() {

    this.GetWorkflowDesignMaster();

    this.getData().subscribe(data => {
      console.log("this.subject$.next(data) : "+this.subject$.next(data));
      this.subject$.next(data);
    });

    this.dataSource = new MatTableDataSource();

    this.Searching();

    
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // console.log("Value 3 : " + this.dataSource.paginator )
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createWorkflowDesignMaster() {
    this.dialog.open(WorkflowDesignInterfaceComponent).afterClosed().subscribe((p_eventwisemodel: WorkflowMasterModel) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (p_eventwisemodel) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.obj_EventWiseDynamicItemModel.unshift(new WorkflowMasterModel(p_eventwisemodel));
        this.subject$.next(this.obj_EventWiseDynamicItemModel);
      }
    });
  }


 
  updateWorkflowDesignMaster(customer: WorkflowMasterModel) {
    this.dialog.open(WorkflowDesignInterfaceComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {
        
        const index = this.p_eventWiseDynamicItemModel.findIndex((existingCustomer) => existingCustomer.uniqueId === updatedCustomer.uniqueId);
        this.p_eventWiseDynamicItemModel[index] = new WorkflowMasterModel(updatedCustomer);
        this.subject$.next(this.p_eventWiseDynamicItemModel);
      }
    });
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

  onLabelChange(change: MatSelectChange, row: WorkflowMasterModel) {
    const index = this.obj_EventWiseDynamicItemModel.findIndex(c => c === row);
    this.obj_EventWiseDynamicItemModel[index] = change.value;
    this.subject$.next(this.obj_EventWiseDynamicItemModel);
  }


  /* WorkflowDesignMaster Get Api Calling
     URL : http://192.168.88.154:8088/teller/v1/Workflow-design-master */

     GetWorkflowDesignMaster(){
      this.WorkflowMasterApi.GetWorkflowDesignMasterList().
      subscribe(data=>{
        console.log("data"+data)
        this.dataSource.data = data;
        this.EventWiseDynamicItem = data;
      },err=>{
        alert(err)
      });
     }

  /* Event Wise Dynamic Item Get Api Calling Value Search */

     Searching(){
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



    GetWorkflowId(p_WorkflowMasterModel: WorkflowMasterModel) {
      console.log(p_WorkflowMasterModel.workflowId);
    }



    // GetRowWiseUniqueId(customer: WorkflowMasterModel) {
    //   if(customer.uniqueId>0){
    //     this.WorkflowMasterShared.setworkflow_unique_id(customer.uniqueId);
    //     this.dialog.open(WorkflowDesignDetailsComponent, {
    //       disableClose: false,
    //       width: '70%'
    //     }).afterClosed().subscribe(result => {
    //       this.result = result;
    //     });
    //   }
    // }
}
