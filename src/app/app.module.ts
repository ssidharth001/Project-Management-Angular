import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectTabsComponent } from './project-tabs/project-tabs.component';
import { ProjectDetailComponent } from './project-tabs/project-detail/project-detail.component';
import { ProjectResourceComponent } from './project-tabs/project-resource/project-resource.component';
import { ProjectInvoiceComponent } from './project-tabs/project-invoice/project-invoice.component';
import { ProjectStatusComponent } from './project-tabs/project-status/project-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectFormComponent } from './shared/project-form/project-form.component';
import { ResourceFormComponent } from './shared/resource-form/resource-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectTabsComponent,
    ProjectDetailComponent,
    ProjectResourceComponent,
    ProjectInvoiceComponent,
    ProjectStatusComponent,
    ProjectFormComponent,
    ResourceFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
