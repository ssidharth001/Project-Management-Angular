import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private formService: FormServiceService, private projectApi: ProjectApiService) { }

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

  }

  cancelResource() {
    this.formService.isFormStatus.next(0);
    this.router.navigate(['../resources']);
  }

  onSubmit() {
    if (this.buttonText == 'Add Resource') {
      const resourceData = Object.assign({}, this.resourceForm.value, { 'resourceId': this.resourceList.length }, { 'projectId': this.projectIndex });
      console.log(resourceData);
      // this.projectApi.storeResourceData(resourceData)
    }

    // this.resourceForm.reset();
  }

}
