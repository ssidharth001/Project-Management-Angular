import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { FormServiceService } from '../services/form-service.service';
import { tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

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
  projects;
  selectedProject;
  projectName;


  constructor(
    private formService: FormServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private http: HttpClient) { }


  ngOnInit(): void {
    this.dataService.projects.subscribe(projects => {
      this.projects = projects;
      console.log(this.projects);
    });

    if (String(this.router.url).toLocaleLowerCase().includes('edit')) {
      this.buttonText = 'Update Project';
      this.showSlider = true;
    }
    else {
      this.buttonText = 'Create Project';
      this.showSlider = false;
    }



    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required),
      'clientName': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
      'progress': new FormControl(null),
      'description': new FormControl(null, Validators.required)
    })

    this.dataService.selectedProject.subscribe(project => { this.selectedProject = project; this.fillForm(); })
  }

  fillForm() {
    console.log('entered fillForm');
    this.projectForm.patchValue({ ['projectName']: 'value' });
  }

  onSubmit() {

    // Date validations
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
      if (this.buttonText === 'Create Project') {
        console.log(this.projectForm);
        console.log(this.projects);
        this.projects.push(this.projectForm.value);
        this.dataService.projects.next(this.projects.slice());
        this.http.post('http://localhost:8080/projects', { "projectName": "LMN Project", "clientName": "LMN", "projectManager": "Roy Miller", "projectStatus": "Open", "startDate": "2019-12-31T18:30:00.000Z", "endDate": "2020-10-31T18:30:00.000Z", "progress": 80, "description": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a \ntype specimen book.", "technologies": "[\"HTML\", \"CSS\"]" })
      }
      this.projectForm.reset();
    }
  }

  cancelProject() {
    this.formService.isFormStatus.next(0);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}