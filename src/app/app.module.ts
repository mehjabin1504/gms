import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { ApplicationMasterComponent } from './gums_module/application-master/application-master.component';


import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { ApplicationCreateComponent } from './gums_module/application-master/application-create/application-create.component';
import { ShowDetailsComponent } from './gums_module_approved/user-management-approval/show-details/show-details.component';
import { UserManagementApprovalComponent } from './gums_module_approved/user-management-approval/user-management-approval.component';
import { LoginComponentComponent } from './gums_module_api/login-component/login-component.component';
import { HttpIntersepterBasicAuthService } from './services/configuration/http-intersepter-basic-auth.service';

import { EventMasterComponent } from './gums_module/event-master/event-master.component';


import { ComponentMasterComponent } from './gums_module/component-master/component-master.component';
import { ComponentMasterInterfaceComponent } from './gums_module/component-master/component-master-interface/component-master-interface.component';
import { RoleMasterComponent } from './gums_module/role-master/role-master.component';
import { RoleMasterInterfaceComponent } from './gums_module/role-master/role-master-interface/role-master-interface.component';
import { ComponentWiswEventMappingComponent } from './gums_module/component-wise-event-mapping/component-wisw-event-mapping.component';

import { ComponentEntryComponent } from './gums_module/component-wise-event-mapping/component-entry/component-entry.component';
import { EventWiseDynamicItemComponent } from './gums_module/event-wise-dynamic-item/event-wise-dynamic-item.component';
import { EventWiseDynamicItemInterfaceComponent } from './gums_module/event-wise-dynamic-item/event-wise-dynamic-item-interface/event-wise-dynamic-item-interface.component';

import { WorkflowDesignComponent } from './gums_module/workflow-design/workflow-design.component';
import { WorkflowDesignInterfaceComponent } from './gums_module/workflow-design/workflow-design-interface/workflow-design-interface.component';

import { ActivityMasterComponent } from './gums_module/activity-master/activity-master.component';
import { ActivityMasterEntryComponent } from './gums_module/activity-master/activity-master-entry/activity-master-entry.component';
import { EventCreateComponent } from './gums_module/event-master/event-create/event-create.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WidgetQuickValueCenterModule } from 'src/@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import { WidgetAssistantModule } from 'src/@vex/components/widgets/widget-assistant/widget-assistant.module';

import { EventWiseWorkflowComponent } from './gums_module/event-wise-workflow/event-wise-workflow.component';
import { EventWiseWorkflowInterfaceComponent } from './gums_module/event-wise-workflow/event-wise-workflow-interface/event-wise-workflow-interface.component';

import { ComponentWiseActivityMappingComponent } from './gums_module/component-wise-activity-mapping/component-wise-activity-mapping.component';
import { ComponentWiseActivityMappingEntryComponent } from './gums_module/component-wise-activity-mapping/component-wise-activity-mapping-entry/component-wise-activity-mapping-entry.component';

import { MenuMasterComponent } from './gums_module/menu-master/menu-master.component';
import { MenuMasterInterfaceComponent } from './gums_module/menu-master/menu-master-interface/menu-master-interface.component';
import { DataTypeSetupComponent } from './gums_module/data-type-setup/data-type-setup.component';
import { DataTypeInterfaceComponent } from './gums_module/data-type-setup/data-type-interface/data-type-interface.component';
import { MenuMasterInterface1Component } from './gums_module/menu-master/menu-master-interface1/menu-master-interface1.component';
import { UserMasterComponent } from './gums_module/user-master/user-master.component';
import { UserMasterInterfaceComponent } from './gums_module/user-master/user-master-interface/user-master-interface.component';




@NgModule({
  declarations: [AppComponent,
    ApplicationMasterComponent,
    ApplicationCreateComponent, 
    EventMasterComponent, 
    ShowDetailsComponent, 
    UserManagementApprovalComponent, 
    LoginComponentComponent, 
    ComponentMasterComponent, 
    ComponentMasterInterfaceComponent, 
    RoleMasterComponent, 
    RoleMasterInterfaceComponent,
    ComponentWiswEventMappingComponent,
    ComponentEntryComponent,
    EventWiseDynamicItemComponent,
    EventWiseDynamicItemInterfaceComponent,
    WorkflowDesignComponent,
    WorkflowDesignInterfaceComponent,
    ActivityMasterComponent,
    ActivityMasterEntryComponent,
    EventCreateComponent,
    DashboardComponent,
    EventWiseWorkflowComponent,
    EventWiseWorkflowInterfaceComponent,
    ComponentWiseActivityMappingComponent,
    ComponentWiseActivityMappingEntryComponent,
    MenuMasterComponent,
    MenuMasterInterfaceComponent,
    DataTypeSetupComponent,
    DataTypeInterfaceComponent,
    MenuMasterInterface1Component,
    UserMasterComponent,
    UserMasterInterfaceComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule,
    VexModule,
    MatRippleModule,
    CustomLayoutModule,
    MatButtonToggleModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatRadioModule,
    MatStepperModule,
    MatSnackBarModule,
    SecondaryToolbarModule,
    ScrollingModule,
    // Vex
    VexModule,
    CustomLayoutModule,
    WidgetAssistantModule,
    WidgetQuickValueCenterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntersepterBasicAuthService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
