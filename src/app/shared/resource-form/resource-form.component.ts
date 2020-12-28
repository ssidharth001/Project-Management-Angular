import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormServiceService } from '../services/form-service.service';
import { ProjectApiService } from '../services/project-api.service';
import { ResourcesModel } from '../services/resources-model.model';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {

  buttonText: string;
  billable: boolean;
  showRate = false;
  resourceDetails: ResourcesModel;
  resourceList: ResourcesModel[];
  projectIndex: number;

  constructor(private router: Router, private formService: FormServiceService, private projectApi: ProjectApiService, private route: ActivatedRoute) { }

  resourceForm: FormGroup;

  ngOnInit(): void {
    this.projectApi.selectedProjectId.subscribe(
      index => {
        this.projectIndex = index
        console.log(this.projectIndex)
      }
    )
    // Form button text 
    if (String(this.router.url).toLocaleLowerCase().includes('edit')) {
      this.buttonText = 'Update Resource';
    }
    else {
      this.buttonText = 'Add Resource';
    }

    // Form initialization
    this.resourceForm = new FormGroup({
      'resourceName': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(2)]),
      'resourceEmail': new FormControl(null, [Validators.required, Validators.email]),
      'role': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      'billable': new FormControl(false),
      'billableAmount': new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')])
    });

    this.projectApi.fetchResources().subscribe(
      data => {
        this.resourceList = JSON.parse(JSON.stringify(data));
        // this.resourceDetails = JSON.parse(JSON.stringify(data))[this.router.url.split('/')[2]];
      });

    if (String(this.router.url).toLocaleLowerCase().includes('edit')) {
      this.buttonText = 'Update Resource';

      this.projectApi.fetchResources().subscribe(
        data => {
          const selectedResource = JSON.parse(this.router.url.split('/')[5]);
          this.resourceDetails = JSON.parse(JSON.stringify(data)).filter(resource => resource.resourceId == selectedResource)[0];
          this.resourceForm.setValue({
            'resourceName': this.resourceDetails.resourceName,
            'resourceEmail': this.resourceDetails.resourceEmail,
            'role': this.resourceDetails.role,
            'billable': this.resourceDetails.billable,
            'billableAmount': this.resourceDetails.billableAmount
          });
        });
    }
    else {
      this.buttonText = 'Create Project';
    }

  }

  cancelResource() {
    this.formService.isFormStatus.next(0);
    if (String(this.router.url).toLocaleLowerCase().includes('edit')) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }

  }

  onSubmit() {
    const selectedResource = JSON.parse(this.router.url.split('/')[5]);
    if (this.buttonText == 'Add Resource') {
      const resourceData = Object.assign({}, this.resourceForm.value, { 'resourceId': this.resourceList.length }, { 'projectId': JSON.parse(this.router.url.split('/')[2]) });
      console.log(resourceData);
      this.projectApi.storeResourceData(resourceData);
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
    else {
      this.resourceList[selectedResource] = Object.assign({}, this.resourceForm.value, { 'resourceId': selectedResource }, { 'projectId': JSON.parse(this.router.url.split('/')[2]) });
      console.log(this.resourceList)
      this.projectApi.updateResourceData(this.resourceList);
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
    this.resourceForm.reset();
    this.formService.isFormStatus.next(0);
  }

}
