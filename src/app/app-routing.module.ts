import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectDetailComponent } from "./project-tabs/project-detail/project-detail.component";
import { ProjectInvoiceComponent } from "./project-tabs/project-invoice/project-invoice.component";
import { ProjectResourceComponent } from "./project-tabs/project-resource/project-resource.component";
import { ProjectStatusComponent } from "./project-tabs/project-status/project-status.component";
import { ProjectFormComponent } from "./shared/project-form/project-form.component";
import { ResourceFormComponent } from "./shared/resource-form/resource-form.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/detail', pathMatch: 'full'},
  {path: 'detail', component: ProjectDetailComponent},
  {path: 'resource', component: ProjectResourceComponent},
  {path: 'invoice', component: ProjectInvoiceComponent},
  {path: 'status', component: ProjectStatusComponent},
  {path: 'projectform', component: ProjectFormComponent, children: [
    {path: 'edit', component: ProjectFormComponent}
  ]},
  {path: 'resourceform', component: ResourceFormComponent, children: [
    {path: 'edit', component: ResourceFormComponent}
  ]}
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}