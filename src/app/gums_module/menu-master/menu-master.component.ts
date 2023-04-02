import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Observable, ReplaySubject } from 'rxjs';
import { ApplicationMasterApiService } from 'src/app/gums_module_api/application-master/application-master-api.service';
import { MenuMasterService } from 'src/app/gums_module_api/menu-master/menu-master.service';
import { MenuMasterInterfaceComponent } from './menu-master-interface/menu-master-interface.component';
import { MenuMasterInterface1Component } from './menu-master-interface1/menu-master-interface1.component';
import { MenuMasterModel } from './model/menu-master.model';

@Component({
  selector: 'vex-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.scss']
})
export class MenuMasterComponent implements OnInit {

  index = 0;
  menu: any;
  expand = {};
   MenuData : any = [];
   form: UntypedFormGroup;
  selectedNode = undefined;
  hideButton:boolean=true;
  layoutCtrl = new UntypedFormControl('boxed');
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subject$: ReplaySubject<MenuMasterModel[]> = new ReplaySubject<MenuMasterModel[]>();
  data$: Observable<MenuMasterModel[]> = this.subject$.asObservable();
  obj_MenuMasterModel: MenuMasterModel[];

  constructor(private MenuMasterApi:MenuMasterService,private fb: UntypedFormBuilder,
    private ApplicationMasterApi: ApplicationMasterApiService,private dialog: MatDialog,) {
   
  }
  ngOnInit(): void {
    this.GetApplicationMasterList();
    this.form = this.fb.group({
      uniqueId: '',
      applicationUniqueId: '',
      componentUniqueId : '',
      parentUniqueId : '',
      componentName : '',
      menuType : '',
      levelCode : '',
      menuSerial : '',
      createBy : '',
      updateBy : '',
      activeFlag : '',
      Child_Id: '',
    });
  }

  /* Application Master Get Api Calling
     URL :  */
     Application:any=[];
     GetApplicationMasterList(){
      this.ApplicationMasterApi.GetApplicationsListByQuery().
      subscribe(data=>{
        this.Application = data.application
      },err=>{
        alert(err)
      });
     }

     prevent(event) {
      event.preventDefault();
    }

    
  valueGet(node :any){
    this.getMenuMasterByUniqueId(node);
  }

  getMenuMasterByUniqueId(node:any){
     this.MenuMasterApi.GetMenuMasterByUniqueIdQuery(node).subscribe(res=>{
      this.MenuMasterApi.setMenuMasterByUniueId(res.menu[0]);
      this.createNewMenuMaster();
     },err=>{
      alert(err)
    });
  }

  MenuSerialGet(){
    this.MenuMasterApi.GetMenuSerialByQuery(this.form.value.applicationUniqueId,0) 
    .subscribe(res=>{
      this.MenuMasterApi.setMenuSerial(res);
      this.MenuMasterApi.setApplicationUniqueId(this.form.value.applicationUniqueId);
      this.createTreeForApplication();
    },err=>{
      alert(err)
    });
  }

  getMenutreeDetails(){
    this.MenuMasterApi.GetMenuMasterList(this.form.value.applicationUniqueId)
    .subscribe(res=>{
      if(res!=null){
        this.MenuData.push(res);
        this.hideButton=true;
        this.mappingMethod();        
      }
      else{
        this.hideButton=false;
        this.MenuData.splice(0);
        this.mappingMethod(); 
      }        
    })
  }

  mappingMethod(){
    this.menu = this.MenuData.map(x => this.toNode(x));
  }

  private toNode(x: any): any {
      const y: any = { ...x };
      y.index = ++this.index;
      for (let n = 0; n < y.submenu.length; n++) {
        y.submenu[n] = this.toNode(y.submenu[n])
      }
      return y;
  }

  toggleVisible(node: any) {
    if (node.submenu && node.submenu.length) {
      if (this.expand[node.index]) {
        this.expand[node.index] = false;
      } else {
        this.expand[node.index] = true;
      }
    }
  }

  selectNode(node: any) {
    this.selectedNode = node;
  }


  createNewMenuMaster() {
    this.dialog.open(MenuMasterInterfaceComponent).afterClosed().subscribe((p_menumaster: MenuMasterModel) => {
      if (p_menumaster) {
        this.obj_MenuMasterModel.unshift(new MenuMasterModel(p_menumaster));
        this.subject$.next(this.obj_MenuMasterModel);
      }
    });
  }

  createTreeForApplication() {
    this.dialog.open(MenuMasterInterface1Component).afterClosed().subscribe((p_menumaster: MenuMasterModel) => {
      if (p_menumaster) {
        this.obj_MenuMasterModel.unshift(new MenuMasterModel(p_menumaster));
        this.subject$.next(this.obj_MenuMasterModel);
      }
    });
  }

  updateOldMenuMaster(positivePay: MenuMasterModel) {
    this.dialog.open(MenuMasterInterfaceComponent, {
      data: positivePay
    }).afterClosed().subscribe(data => {
      if (data) {
        
        const index = this.obj_MenuMasterModel.findIndex((existingpositivePay) => existingpositivePay.uniqueId === data.uniqueId);
        this.obj_MenuMasterModel[index] = new MenuMasterModel(data);
        this.subject$.next(this.obj_MenuMasterModel);
      }
    });
  }
}
