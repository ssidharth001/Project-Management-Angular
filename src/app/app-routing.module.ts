import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectDetailComponent } from "./project-tabs/project-detail/project-detail.component";
import { ProjectInvoiceComponent } from "./project-tabs/project-invoice/project-invoice.component";
import { ProjectResourceComponent } from "./project-tabs/project-resource/project-resource.component";
import { ProjectStatusComponent } from "./project-tabs/project-status/project-status.component";

const appRoutes: Routes = [
    // { path: '', redirectTo: '/...', pathMatch: 'full'},
    // { path: '...', component: ...Component, children:[
    //     { path: ':id', component: RecipeDetailComponent }
    // ] },
    { path: 'detail', component: ProjectDetailComponent },
    { path: 'resource', component: ProjectResourceComponent },
    { path: 'invoice', component: ProjectInvoiceComponent },
    { path: 'status', component: ProjectStatusComponent }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}