import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormServiceService } from 'src/app/shared/services/form-service.service';
import { ProjectApiService } from 'src/app/shared/services/project-api.service';
import { ResourcesModel } from 'src/app/shared/services/resources-model.model';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resources: ResourcesModel[];
  selectedProjectResources: ResourcesModel[];
  updatedResources: ResourcesModel[];
  isDelete = false;

  constructor(private router: Router, private formService: FormServiceService, private route: ActivatedRoute, private projectApi: ProjectApiService) { }

  ngOnInit(): void {

    this.projectApi.fetchResources().subscribe(
      data => {
        this.resources = JSON.parse(JSON.stringify(data))
        this.selectedProjectResources = this.resources.filter((resource) => resource.projectId === JSON.parse(this.router.url.split('/')[2]))
        console.log(this.selectedProjectResources)
      });

    // Reload component : Add new project
    this.projectApi.reloadComponent.subscribe(
      response => response == 1 ? this.ngOnInit() : 0
    )
  }

  loadResourceForm() {
    this.isDelete = false;
    this.formService.isFormStatus.next(1);
    this.router.navigate([`${this.router.url}` + '/add']);
  }

  editResource(resourceId) {
    this.isDelete = false;
    this.formService.isFormStatus.next(1);
    this.formService.selectedResource.next(resourceId);
    this.router.navigate([`${this.router.url}` + '/edit/' + `${resourceId}`]);
  }

  deleteResource(resourceId) {
    // this.isDelete = true;
    console.log(resourceId)
    this.projectApi.fetchResources().subscribe(
      data => {
        this.resources = JSON.parse(JSON.stringify(data))
        this.updatedResources = this.resources.filter((resource) => resource.resourceId !== resourceId)
        this.projectApi.updateResourceData(this.updatedResources)
        console.log(this.updatedResources);
      });


    // this.formService.isFormStatus.next(1);
    // this.formService.selectedResource.next(resourceId);
  }

  cancelDeleteResource() {
    this.isDelete = false;
    this.formService.isFormStatus.next(0);
    this.router.navigate(['../']);
  }
}
