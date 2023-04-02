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
import { ActivityMasterApiServiceService } from "src/app/gums_module_api/activity-master/activity-master-api-service.service";
import { ActivityMasterEntryComponent } from "./activity-master-entry/activity-master-entry.component";
import { ActivityMasterModel } from "./interfaces/activity-master-model";

@UntilDestroy()
@Component({
  selector: 'vex-activity-master',
  templateUrl: './activity-master.component.html',
  styleUrls: ['./activity-master.component.scss'],
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
export class ActivityMasterComponent implements OnInit {

  form: UntypedFormGroup;

  // p_eventWiseDynamicItemModel: PositivePayModel[];

  searchCtrl = new UntypedFormControl();
  layoutCtrl = new UntypedFormControl('boxed');
  result: string;
  

  /*Copy*/
  EventWiseDynamicItem : any =[];

  subject$: ReplaySubject<ActivityMasterModel[]> = new ReplaySubject<ActivityMasterModel[]>();
  data$: Observable<ActivityMasterModel[]> = this.subject$.asObservable();
  obj_acyivityMaster: ActivityMasterModel[];
 
  @Input()
  columns: TableColumn<ActivityMasterModel>[] = [
    { label: 'Activity ID', property: 'activityId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Activity Name', property: 'activityName', type: 'text', visible: true },
    
    { label: 'Active Flag', property: 'activeFlag', type: 'text', visible: true },
    
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<ActivityMasterModel> | null;
  selection = new SelectionModel<ActivityMasterModel>(true, []);



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, 
    private ActivityMasterApi:ActivityMasterApiServiceService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(this.EventWiseDynamicItem.map(data => new ActivityMasterModel(data)));
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

  createActivityMaster() {
    this.dialog.open(ActivityMasterEntryComponent).afterClosed().subscribe((obj_acyivityMaster: ActivityMasterModel) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (obj_acyivityMaster) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.obj_acyivityMaster.unshift(new ActivityMasterModel(obj_acyivityMaster));
        this.subject$.next(this.obj_acyivityMaster);
      }
    });
  }


 
  updateActivityMaster(activityMaster: ActivityMasterModel) {
    this.dialog.open(ActivityMasterEntryComponent, {
      data: activityMaster
    }).afterClosed().subscribe(data => {
      if (data) {
        
        const index = this.obj_acyivityMaster.findIndex((existingactivityMaster) => existingactivityMaster.uniqueId === data.uniqueId);
        this.obj_acyivityMaster[index] = new ActivityMasterModel(data);
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

  onLabelChange(change: MatSelectChange, row: ActivityMasterModel) {
    const index = this.obj_acyivityMaster.findIndex(c => c === row);
    this.obj_acyivityMaster[index] = change.value;
    this.subject$.next(this.obj_acyivityMaster);
  }


  /* Component Master Get Api Calling
     URL : http://192.168.88.122:8088/teller/v1/positive-pay-instruction */

     GetComponentMasterList(){
      this.ActivityMasterApi.GetActivityMasterList().
      subscribe(data=>{
        this.dataSource.data = data;
        this.EventWiseDynamicItem = data;
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
