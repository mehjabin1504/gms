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
import { ApplicationMasterApiService } from "src/app/gums_module_api/application-master/application-master-api.service";
import { EventMasterModel } from "./interface/event-master.model";
import { EventCreateComponent } from "./event-create/event-create.component";
import { EventMasterApiService } from "src/app/gums_module_api/event_master/event-master-api.service";

@Component({
  selector: 'vex-event-master',
  templateUrl: './event-master.component.html',
  styleUrls: ['./event-master.component.scss'],
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
export class EventMasterComponent implements OnInit {


  form: UntypedFormGroup;

  searchCtrl = new UntypedFormControl();
  layoutCtrl = new UntypedFormControl('boxed');

  p_eventMasterModel: EventMasterModel[];

  obj_eventMasterModel: EventMasterModel[];


  appData : any =[];

  subject$: ReplaySubject<EventMasterModel[]> = new ReplaySubject<EventMasterModel[]>(1);
  data$: Observable<EventMasterModel[]> = this.subject$.asObservable();
  messages: EventMasterModel[];

  @Input()
  columns: TableColumn<EventMasterModel>[] = [
    { label: 'Event Id', property: 'eventId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Event Name', property: 'eventName', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Active Flag', property: 'activeFlag', type: 'text', visible: true },
    { label: 'Created By', property: 'createdBy', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<EventMasterModel> | null;

  selection = new SelectionModel<EventMasterModel>(true, []);

  messageData:any=[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,private eventMasterApi:EventMasterApiService) { }

  get visibleColumns() {

    let visibleColumns = this.columns.filter(column => column.visible).map(column => column.property);

    return visibleColumns;
  }

  getData() {
    return of(this.messageData.map(app => new EventMasterModel(app)));
  }


  ngOnInit(){

    this.dataSource = new MatTableDataSource();

    this.getAllEventDetails();

    setTimeout(() => {
      this.getData().subscribe(data => {
      
        this.subject$.next(data);

        this.p_eventMasterModel = data;

        this.obj_eventMasterModel = data;


      });

    }, 1000);

    // this.Searching();

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log("Value 4 : " +   this.dataSource.sort )
  }

  createEventMaster() {
    this.dialog.open(EventCreateComponent).afterClosed().subscribe((p_eventMaster: EventMasterModel) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (p_eventMaster) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.obj_eventMasterModel.unshift(new EventMasterModel(p_eventMaster));
        this.subject$.next(this.obj_eventMasterModel);
      }
    });
  }


 
  updateEventMasterInfo(positivePay: EventMasterModel) {
    this.dialog.open(EventCreateComponent, {
      data: positivePay
    }).afterClosed().subscribe(data => {
      if (data) {
        
        const index = this.obj_eventMasterModel.findIndex((existingpositivePay) => existingpositivePay.uniqueId === data.uniqueId);
        this.obj_eventMasterModel[index] = new EventMasterModel(data);
        this.subject$.next(this.obj_eventMasterModel);
      }
    });
  }

  getAllEventDetails(){
    
    this.eventMasterApi.GetAllEvents()
    .subscribe(res=>{

      console.log(res);
      this.appData = res;

      this.messageData = res;

      this.dataSource.data = res;

    })
  }

  createApp() {

    this.dialog.open(EventCreateComponent).afterClosed().subscribe((p_applicationMasterModel: EventMasterModel) => {
      
      
      if (p_applicationMasterModel) {
        
        this.obj_eventMasterModel.unshift(new EventMasterModel(p_applicationMasterModel));
        this.subject$.next(this.obj_eventMasterModel);
      }
    });
    
  }
  
  updateApp(app: EventMasterModel) {
    this.dialog.open(EventCreateComponent, {
      data: app
    }).afterClosed().subscribe(updatedApp => {
      if (updatedApp) {
       
        const index = this.obj_eventMasterModel.findIndex((existingApp) => existingApp.uniqueId === updatedApp.uniqueId);
        this.obj_eventMasterModel[index] = new EventMasterModel(updatedApp);
        this.subject$.next(this.obj_eventMasterModel);
      }
    });
  }

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

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: EventMasterModel) {
    const index = this.obj_eventMasterModel.findIndex(c => c === row);
    this.obj_eventMasterModel[index] = change.value;
    this.subject$.next(this.obj_eventMasterModel);
  }

}
