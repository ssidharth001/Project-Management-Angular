import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from '../services/form-service.service';
import { PathRoutingService } from '../services/path-routing.service';
import { ProjectApiService } from '../services/project-api.service';
import { ProjectsModel } from '../services/projects-model.model';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  slider: string = '0';
  subscription: Subscription;
  buttonText: string;
  showSlider = false;
  projectForm: FormGroup;
  startDateError = false;
  endDateError = false;
  previousPath: string;
  totalProjectCount: number;
  projectDetails: ProjectsModel;
  projectList: ProjectsModel[];

  constructor(
    private formService: FormServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private path: PathRoutingService,
    private projectApi: ProjectApiService) { }

  ngOnInit(): void {

    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required),
      'clientName': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
      'range': new FormControl(0),
      'description': new FormControl(null, Validators.required)
    })

    this.projectApi.fetchProjects().subscribe(
      data => {
        this.projectList = JSON.parse(JSON.stringify(data));
        this.projectDetails = JSON.parse(JSON.stringify(data.reverse()))[this.router.url.split('/')[2]]; // router id is considered to fetch details
      });

    if (String(this.router.url).toLocaleLowerCase().includes('edit')) {
      this.buttonText = 'Update Project';
      this.showSlider = true;

      this.projectApi.fetchProjects().subscribe(
        data => {
          this.projectDetails = JSON.parse(JSON.stringify(data))[this.router.url.split('/')[2]];

          this.projectForm.setValue({
            'projectName': this.projectDetails.projectName,
            'clientName': this.projectDetails.clientName,
            'startDate': this.projectDetails.startDate,
            'endDate': this.projectDetails.endDate,
            'range': this.projectDetails.range,
            'description': this.projectDetails.description
          });
        });
    }
    else {
      this.buttonText = 'Create Project';
      this.showSlider = false;
    }

    this.path.currentPath.subscribe(
      storedPath => {
        this.previousPath = storedPath;
      })
  }

  onSubmit() {

    if (this.buttonText == 'Create Project') {
      // Start date less than current date check -> Invalid start date
      if (new Date(this.projectForm.root.get('startDate').value) < new Date()) {
        this.startDateError = true;
      }
      else this.startDateError = false;
      // End date less than current start date check -> Valid end date
      if (new Date(this.projectForm.root.get('endDate').value) <= new Date(this.projectForm.root.get('startDate').value)) {
        this.endDateError = true;
      }
      else this.endDateError = false;

      // Submit actual form
      if ((this.projectForm.valid) && (!this.endDateError) && (!this.startDateError)) {
        // Send http
        const projectData = Object.assign({}, this.projectForm.value, { 'projectID': this.projectList.length });
        console.log(projectData);
        this.projectApi.storeProjectData(projectData);

        // Show details of newly added project
        this.projectApi.selectedProjectId.next(this.projectList.length);
        this.router.navigate([`/projects/${this.projectList.length}/details`]);
      }
    }
    else {
      // Overwrite already present data
      console.log(this.projectList[this.router.url.split('/')[2]])
      this.projectList[this.router.url.split('/')[2]] = Object.assign(this.projectList[this.router.url.split('/')[2]], this.projectForm.value);
      console.log(this.projectList)
      this.projectApi.updateProjectData(this.projectList);
      this.router.navigate([`/projects/${this.router.url.split('/')[2]}/details`]);
    }

    this.projectForm.reset();
    this.formService.isFormStatus.next(0);
  }

  cancelProject() {
    this.formService.isFormStatus.next(0);
    this.buttonText == 'Update Project' ? this.router.navigate(['../'], { relativeTo: this.route }) : this.router.navigateByUrl(this.previousPath);
  }

}