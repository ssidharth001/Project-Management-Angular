import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { FormServiceService } from '../services/form-service.service';
import { tap } from 'rxjs/operators'

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
  selectedProject;

  constructor(
    private formService: FormServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) { }


  ngOnInit(): void {
    if (String(this.router.url).toLocaleLowerCase().includes('edit')) {
      this.buttonText = 'Update Project';
      this.showSlider = true;
    }
    else {
      this.buttonText = 'Create Project';
      this.showSlider = false;
    }



    this.projectForm = new FormGroup({
      'projectName': new FormControl(this.selectedProject ? this.selectedProject.projectName : null, Validators.required),
      'clientName': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
      'progress': new FormControl(null),
      'description': new FormControl(null, Validators.required)
    })

    this.dataService.selectedProject.subscribe(project => { this.selectedProject = project; this.fillForm(); })
  }

  fillForm() {
    this.projectForm.patchValue({
      'projectName': 'name'
    })
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
      console.log(this.projectForm.value)
      this.projectForm.reset();
    }
  }

  cancelProject() {
    this.formService.isFormStatus.next(0);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}