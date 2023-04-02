import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, of, ReplaySubject } from "rxjs";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";

import { ComponentWiseActivityMappingApiService } from "src/app/gums_module_api/component-wise-activity-mapping/component-wise-activity-mapping-api.service";
import { ActivityMasterEntryComponent } from "../activity-master/activity-master-entry/activity-master-entry.component";
import { ComponentWiseActivityMappingEntryComponent } from "./component-wise-activity-mapping-entry/component-wise-activity-mapping-entry.component";
import { ComponentWiseActivityMappingModel } from "./interfaces/component-wise-activity-mapping-model";


@UntilDestroy()
@Component({
  selector: 'vex-component-wise-activity-mapping',
  templateUrl: './component-wise-activity-mapping.component.html',
  styleUrls: ['./component-wise-activity-mapping.component.scss'],
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
export class ComponentWiseActivityMappingComponent implements OnInit {

  form: UntypedFormGroup;

  

  searchCtrl = new UntypedFormControl();
  layoutCtrl = new UntypedFormControl('boxed');
  result: string;
  

  /*Copy*/
  EventWiseDynamicItem : any =[];

  subject$: ReplaySubject<ComponentWiseActivityMappingModel []> = new ReplaySubject<ComponentWiseActivityMappingModel []>();
  data$: Observable<ComponentWiseActivityMappingModel []> = this.subject$.asObservable();
  obj_acyivityMaster: ComponentWiseActivityMappingModel [];
 
  @Input()
  columns: TableColumn<ComponentWiseActivityMappingModel >[] = [
    { label: 'Component ID', property: 'componentUniqueId', type: 'text', visible: false,  },
    { label: 'Component Name', property: 'componentName', type: 'text', visible: true, cssClasses: ['font-medium']  },
    { label: 'Activity ID', property: 'activityUniqueId', type: 'text', visible: false },
    { label: 'Activity Name', property: 'activityName', type: 'text', visible: true },
    { label: 'Created By', property: 'createdBy', type: 'text', visible: false },
    
    
    
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<ComponentWiseActivityMappingModel > | null;
  selection = new SelectionModel<ComponentWiseActivityMappingModel >(true, []);



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, 
    private ComponentWiseActivityMappingApi :ComponentWiseActivityMappingApiService ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(this.EventWiseDynamicItem.map(data => new ComponentWiseActivityMappingModel (data)));
  }

  ngOnInit() {

    this.GetComponentMasterList();

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

  createComponentWiseActivityMapping() {
    this.dialog.open(ComponentWiseActivityMappingEntryComponent).afterClosed().subscribe((obj_acyivityMaster: ComponentWiseActivityMappingModel ) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (obj_acyivityMaster) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.obj_acyivityMaster.unshift(new ComponentWiseActivityMappingModel (obj_acyivityMaster));
        this.subject$.next(this.obj_acyivityMaster);
      }
    });
  }


 
  updateComponentWiseActivityMapping(activityMaster: ComponentWiseActivityMappingModel ) {
    this.dialog.open(ComponentWiseActivityMappingEntryComponent, {
      data: activityMaster
    }).afterClosed().subscribe(data => {
      if (data) {
        
        const index = this.obj_acyivityMaster.findIndex((existingactivityMaster) => existingactivityMaster.uniqueId === data.uniqueId);
        this.obj_acyivityMaster[index] = new ComponentWiseActivityMappingModel (data);
        this.subject$.next(this.obj_acyivityMaster);
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

  onLabelChange(change: MatSelectChange, row: ComponentWiseActivityMappingModel ) {
    const index = this.obj_acyivityMaster.findIndex(c => c === row);
    this.obj_acyivityMaster[index] = change.value;
    this.subject$.next(this.obj_acyivityMaster);
  }


  /* Component Master Get Api Calling
     URL : http://192.168.88.122:8088/teller/v1/positive-pay-instruction */

     GetComponentMasterList(){
      this.ComponentWiseActivityMappingApi.GetComponentWiseActivityMappingList().
      subscribe(data=>{
        this.dataSource.data = data.activity;
        this.EventWiseDynamicItem = data.activity;
        console.log(data);
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

}
