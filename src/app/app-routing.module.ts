import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { ApplicationMasterComponent } from './gums_module/application-master/application-master.component';

import { EventMasterComponent } from './gums_module/event-master/event-master.component';
import { WorkflowDesignComponent } from './gums_module/workflow-design/workflow-design.component';
import { ComponentWiswEventMappingComponent } from './gums_module/component-wise-event-mapping/component-wisw-event-mapping.component';
import { EventWiseDynamicItemComponent } from './gums_module/event-wise-dynamic-item/event-wise-dynamic-item.component';
import { LoginComponentComponent } from './gums_module_api/login-component/login-component.component';
import { UserManagementApprovalComponent } from './gums_module_approved/user-management-approval/user-management-approval.component';
import { RouteGuardService } from './services/security/route-guard.service';
import { ComponentMasterComponent } from './gums_module/component-master/component-master.component';
import { RoleMasterComponent } from './gums_module/role-master/role-master.component';
import { ActivityMasterComponent } from './gums_module/activity-master/activity-master.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventWiseWorkflowComponent } from './gums_module/event-wise-workflow/event-wise-workflow.component';
import { UserMasterComponent } from './gums_module/user-master/user-master.component';

import { ComponentWiseActivityMappingComponent } from './gums_module/component-wise-activity-mapping/component-wise-activity-mapping.component';
import { DataTypeSetupComponent } from './gums_module/data-type-setup/data-type-setup.component';

import { MenuMasterComponent } from './gums_module/menu-master/menu-master.component';



const routes: Routes = [
  {
    path: '',
    component: CustomLayoutComponent, canActivate: [RouteGuardService],
    children: [
      {
        path: 'gums',
        children: [
       
          { 
            path: 'application-master', component: ApplicationMasterComponent,
            canActivate: [RouteGuardService]
          },
          {
            path:'component-master',component:ComponentMasterComponent,
            canActivate:[RouteGuardService]
          },
          { 
            path: 'menu-master', component: MenuMasterComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'component-wise-event-mapping', component: ComponentWiswEventMappingComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'user-management-approval', component: UserManagementApprovalComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'event-master', component: EventMasterComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'event-wise-dynamic-item', component: EventWiseDynamicItemComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'workflow-design', component: WorkflowDesignComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'event-wise-workflow-mapping', component: EventWiseWorkflowComponent,
            canActivate: [RouteGuardService]
          }
          ,
          { 
            path: 'role-master', component: RoleMasterComponent,
            canActivate: [RouteGuardService]
          }
          ,
          { 
            path: 'activity-master', component: ActivityMasterComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'component-wise-activity-mapping', component: ComponentWiseActivityMappingComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'data-type-setup', component: DataTypeSetupComponent,
            canActivate: [RouteGuardService]
          },
          { 
            path: 'user-master', component: UserMasterComponent,
            canActivate: [RouteGuardService]
          }
          
        ],
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponentComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
