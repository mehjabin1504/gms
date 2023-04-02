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
import { ApplicationMasterModel } from "./interface/application-master.model";
import { ApplicationMasterApiService } from "src/app/gums_module_api/application-master/application-master-api.service";
import { ApplicationCreateComponent } from "./application-create/application-create.component";

@UntilDestroy()
@Component({
  selector: 'vex-application-master',
  templateUrl: './application-master.component.html',
  styleUrls: ['./application-master.component.scss'],
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
export class ApplicationMasterComponent implements OnInit {

  form: UntypedFormGroup;

  searchCtrl = new UntypedFormControl();
  layoutCtrl = new UntypedFormControl('boxed');

  p_applicationMasterModel: ApplicationMasterModel[];

  obj_applicationMasterModel: ApplicationMasterModel[];


  appData : any =[];

  subject$: ReplaySubject<ApplicationMasterModel[]> = new ReplaySubject<ApplicationMasterModel[]>(1);
  data$: Observable<ApplicationMasterModel[]> = this.subject$.asObservable();
  messages: ApplicationMasterModel[];

  @Input()
  columns: TableColumn<ApplicationMasterModel>[] = [
    { label: 'Application Id', property: 'appId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Application Name', property: 'appName', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Purpose', property: 'purpose', type: 'text', visible: true },
    { label: 'Url', property: 'appUrl', type: 'text', visible: true }
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<ApplicationMasterModel> | null;

  selection = new SelectionModel<ApplicationMasterModel>(true, []);

  messageData:any=[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,private applicationMasterApi:ApplicationMasterApiService) { }

  get visibleColumns() {

    let visibleColumns = this.columns.filter(column => column.visible).map(column => column.property);

    //console.log("visible columns : ", visibleColumns)

    return visibleColumns;
  }

  getData() {
  
    //console.log("appdata in getdata : ",this.appData)
    
    return of(this.messageData.map(app => new ApplicationMasterModel(app)));
  }


  ngOnInit(){

    this.dataSource = new MatTableDataSource();

    this.getAllAppDetails();

    setTimeout(() => {
      this.getData().subscribe(data => {
      
        this.subject$.next(data);

        // this.subject$.subscribe({

        //   next: (v) => v.forEach(element => console.log(element)),
        
        // });
        
        this.p_applicationMasterModel = data;

        this.obj_applicationMasterModel = data;

        // console.log("p_obj",this.p_applicationMasterModel)

        // console.log("obj",this.obj_applicationMasterModel)

      });

    }, 1000);

    this.Searching();

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log("Value 4 : " +   this.dataSource.sort )
  }

  getAllAppDetails(){
    
    this.applicationMasterApi.GetAllApplications()
    .subscribe(res=>{

      // console.log(typeof(res));

      // console.log("Class Name : ", res.constructor.name);

      // for(var i = 0; i < res.length; i++){
        
      //   console.log(res[i]);
      
      // }

      this.appData = res;

      this.messageData = res;

      this.dataSource.data = res;

      // let mappedRes = res.map(message => 
      //   {
      //     console.log("each message : ", message);
          
      //     return new ApplicationMasterModel(message);
        
      //   })
      
      // console.log("original res : ", res);

      // console.log("mapped res : ", mappedRes);

      // console.log("response : "+this.appData);
      // console.log("Datasource data : ", this.dataSource.data);
    })
  }

  createApp() {

    this.dialog.open(ApplicationCreateComponent).afterClosed().subscribe((p_applicationMasterModel: ApplicationMasterModel) => {
      
      
      
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (p_applicationMasterModel) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */

        //console.log("p_applicationMasterModel : ",p_applicationMasterModel)

        this.obj_applicationMasterModel.unshift(new ApplicationMasterModel(p_applicationMasterModel));
        this.subject$.next(this.obj_applicationMasterModel);
      }
    });
    
  }

  updateApp(app: ApplicationMasterModel) {
    this.dialog.open(ApplicationCreateComponent, {
      data: app
    }).afterClosed().subscribe(updatedApp => {
      if (updatedApp) {
       
        const index = this.obj_applicationMasterModel.findIndex((existingApp) => existingApp.uniqueId === updatedApp.uniqueId);
        this.obj_applicationMasterModel[index] = new ApplicationMasterModel(updatedApp);
        this.subject$.next(this.obj_applicationMasterModel);
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

  onLabelChange(change: MatSelectChange, row: ApplicationMasterModel) {
    const index = this.obj_applicationMasterModel.findIndex(c => c === row);
    this.obj_applicationMasterModel[index] = change.value;
    this.subject$.next(this.obj_applicationMasterModel);
  }


}
