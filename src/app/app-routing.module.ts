import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectDetailComponent } from "./project-tabs/project-detail/project-detail.component";
import { ProjectInvoiceComponent } from "./project-tabs/project-invoice/project-invoice.component";
import { ProjectResourceComponent } from "./project-tabs/project-resource/project-resource.component";
import { ProjectStatusComponent } from "./project-tabs/project-status/project-status.component";
import { ProjectFormComponent } from "./shared/project-form/project-form.component";
import { ResourceFormComponent } from "./shared/resource-form/resource-form.component";
import { StatusFormComponent } from "./shared/status-form/status-form.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/detail', pathMatch: 'full'},
  {path: 'detail', component: ProjectDetailComponent},
  {path: 'project', children: [
    {path: '', redirectTo: '/project/add', pathMatch: 'full'},
    {path: 'add', component: ProjectFormComponent},
    {path: 'edit', component: ProjectFormComponent}
  ]},
  {path: 'resource', children:[
    {path: '', component: ProjectResourceComponent, pathMatch: 'full'},
    {path: 'add', component: ResourceFormComponent},
    {path: 'edit', component: ResourceFormComponent}
  ]},
  {path: 'invoice', component: ProjectInvoiceComponent},
  {path: 'status', children: [
    {path: '', component: ProjectStatusComponent, pathMatch: 'full'},
    {path: 'add', component: StatusFormComponent}
  ]}
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}