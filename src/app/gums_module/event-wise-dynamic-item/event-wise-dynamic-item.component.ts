import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, Observable, of, ReplaySubject } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { EventWiseDynamicItemService } from 'src/app/gums_module_api/event-wise-dynamic-item/event-wise-dynamic-item.service';
import { EventWiseDynamicItemInterfaceComponent } from './event-wise-dynamic-item-interface/event-wise-dynamic-item-interface.component';
import { EventWiseDynamicItemModel } from './model/event-wise-dynamic-item.model';


@UntilDestroy()
@Component({
  selector: 'vex-event-wise-dynamic-item',
  templateUrl: './event-wise-dynamic-item.component.html',
  styleUrls: ['./event-wise-dynamic-item.component.scss'],
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
export class EventWiseDynamicItemComponent implements OnInit {

  form: UntypedFormGroup;

  p_eventWiseDynamicItemModel: EventWiseDynamicItemModel[];

  searchCtrl = new UntypedFormControl();
  layoutCtrl = new UntypedFormControl('boxed');

  

  /*Copy*/
  EventWiseDynamicItem : any =[];

  subject$: ReplaySubject<EventWiseDynamicItemModel[]> = new ReplaySubject<EventWiseDynamicItemModel[]>();
  data$: Observable<EventWiseDynamicItemModel[]> = this.subject$.asObservable();
  obj_EventWiseDynamicItemModel: EventWiseDynamicItemModel[];
 
  @Input()
  columns: TableColumn<EventWiseDynamicItemModel>[] = [
    { label: 'Application Id', property: 'applicationUniqueId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Component Id', property: 'componentUniqueId', type: 'text', visible: true },
    { label: 'Event Id', property: 'eventUniqueId', type: 'text', visible: true },
    { label: 'Item Name', property: 'itemName', type: 'text', visible: true },
    { label: 'Item Data Type', property: 'itemUniqueDataType', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Item Level', property: 'itemLevel', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<EventWiseDynamicItemModel> | null;
  selection = new SelectionModel<EventWiseDynamicItemModel>(true, []);



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private evenWiseDynamicApi:EventWiseDynamicItemService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    console.log("DAta : "+ of(this.EventWiseDynamicItem.map(data => new EventWiseDynamicItemModel(data))));
    return of(this.EventWiseDynamicItem.map(data => new EventWiseDynamicItemModel(data)));
  }

  ngOnInit() {

    this.GetEventWiseDynamicItem();

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

  createCustomer() {
    this.dialog.open(EventWiseDynamicItemInterfaceComponent).afterClosed().subscribe((p_eventwisemodel: EventWiseDynamicItemModel) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (p_eventwisemodel) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.obj_EventWiseDynamicItemModel.unshift(new EventWiseDynamicItemModel(p_eventwisemodel));
        this.subject$.next(this.obj_EventWiseDynamicItemModel);
      }
    });
  }


 
  updateCustomer(customer: EventWiseDynamicItemModel) {
    this.dialog.open(EventWiseDynamicItemInterfaceComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {
        
        const index = this.p_eventWiseDynamicItemModel.findIndex((existingCustomer) => existingCustomer.uniqueId === updatedCustomer.uniqueId);
        this.p_eventWiseDynamicItemModel[index] = new EventWiseDynamicItemModel(updatedCustomer);
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

  onLabelChange(change: MatSelectChange, row: EventWiseDynamicItemModel) {
    const index = this.obj_EventWiseDynamicItemModel.findIndex(c => c === row);
    this.obj_EventWiseDynamicItemModel[index] = change.value;
    this.subject$.next(this.obj_EventWiseDynamicItemModel);
  }


  /* Event Wise Dynamic Item Get Api Calling
     URL : http://192.168.88.122:4200/teller/v1/event-wise-item-setup */

     GetEventWiseDynamicItem(){
      this.evenWiseDynamicApi.GetEventWiseDynamicItemList().
      subscribe(data=>{
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
}
