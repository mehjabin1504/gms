import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of, ReplaySubject } from "rxjs";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { UserRoleModel } from './interface/user-role.model';
import { UserRoleApiService } from 'src/app/gums_module_api/user-role/user-role-api.service';
import { UserRoleCreateComponent } from './user-role-create/user-role-create.component';
import { untilDestroyed } from "@ngneat/until-destroy";

@Component({
  selector: 'vex-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
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
export class UserRoleComponent implements OnInit {

  static id = 100;
  itemArr: any = [];
  gridView: boolean = true;


  /*Value Assign Variable */

  ComponentUniqueId: any;
  EventCode: any;
  WorkflowUniqueId: any;

  form: UntypedFormGroup;

  searchCtrl = new UntypedFormControl();
  layoutCtrl = new UntypedFormControl('boxed');

  p_userRoleModel: UserRoleModel[];

  obj_userRoleModel: UserRoleModel[];


  appData : any =[];

  subject$: ReplaySubject<UserRoleModel[]> = new ReplaySubject<UserRoleModel[]>(1);
  data$: Observable<UserRoleModel[]> = this.subject$.asObservable();
  messages: UserRoleModel[];

  @Input()
  columns: TableColumn<UserRoleModel>[] = [
    { label: 'Role Id', property: 'roleId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Branch Code', property: 'branchCode', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Active Flag', property: 'activeFlag', type: 'text', visible: true },
    { label: 'Created By', property: 'createdBy', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<UserRoleModel> | null;

  selection = new SelectionModel<UserRoleModel>(true, []);

  messageData:any=[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,private userRoleApi:UserRoleApiService) { }

  get visibleColumns() {

    let visibleColumns = this.columns.filter(column => column.visible).map(column => column.property);

    return visibleColumns;
  }

  getData() {
    return of(this.messageData.map(app => new UserRoleModel(app)));
  }


  ngOnInit(){

    this.dataSource = new MatTableDataSource();

    this.getAllUserRoleDetails();

    setTimeout(() => {
      this.getData().subscribe(data => {
      
        this.subject$.next(data);

        this.p_userRoleModel = data;

        this.obj_userRoleModel = data;


      });

    }, 1000);

    // this.Searching();

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log("Value 4 : " +   this.dataSource.sort )
  }

  createUserRole() {
    this.dialog.open(UserRoleCreateComponent).afterClosed().subscribe((p_userRole: UserRoleModel) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (p_userRole) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.obj_userRoleModel.unshift(new UserRoleModel(p_userRole));
        this.subject$.next(this.obj_userRoleModel);
      }
    });
  }


 
  updateUserRoleInfo(positivePay: UserRoleModel) {
    this.dialog.open(UserRoleCreateComponent, {
      data: positivePay
    }).afterClosed().subscribe(data => {
      if (data) {
        const index = this.obj_userRoleModel.findIndex((existingpositivePay) => existingpositivePay.uniqueId === data.uniqueId);
        this.obj_userRoleModel[index] = new UserRoleModel(data);
        this.subject$.next(this.obj_userRoleModel);
      }
    });
  }


  getAllUserRoleDetails(){
    
    this.userRoleApi.GetAllUserRoles()
    .subscribe(res=>{

      console.log(res);
      this.appData = res;

      this.messageData = res;

      this.dataSource.data = res;

    })
  }

  createApp() {

    this.dialog.open(UserRoleCreateComponent).afterClosed().subscribe((p_applicationMasterModel: UserRoleModel) => {
      
      
      if (p_applicationMasterModel) {
        
        this.obj_userRoleModel.unshift(new UserRoleModel(p_applicationMasterModel));
        this.subject$.next(this.obj_userRoleModel);
      }
    });
    
  }
  
  updateApp(app: UserRoleModel) {
    this.dialog.open(UserRoleCreateComponent, {
      data: app
    }).afterClosed().subscribe(updatedApp => {
      if (updatedApp) {
       
        const index = this.obj_userRoleModel.findIndex((existingApp) => existingApp.uniqueId === updatedApp.uniqueId);
        this.obj_userRoleModel[index] = new UserRoleModel(updatedApp);
        this.subject$.next(this.obj_userRoleModel);
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

  toggleColumnVisibility(column, userRole) {
    userRole.stopPropagation();
    userRole.stopImmediatePropagation();
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

  onLabelChange(change: MatSelectChange, row: UserRoleModel) {
    const index = this.obj_userRoleModel.findIndex(c => c === row);
    this.obj_userRoleModel[index] = change.value;
    this.subject$.next(this.obj_userRoleModel);
  }

}