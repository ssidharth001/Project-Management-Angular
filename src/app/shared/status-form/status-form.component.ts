import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormServiceService } from '../services/form-service.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {

  statusForm: FormGroup;

  constructor(private formService: FormServiceService, private router: Router) { }

  ngOnInit(): void {
    this.statusForm = new FormGroup({
      'resource': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'actvitytype': new FormControl(null, Validators.required),
      'hours': new FormControl(null, Validators.required),
      'minutes': new FormControl(null, Validators.required)
    })
  }

  cancelStatus() {
    this.formService.isFormStatus.next(0);
    this.router.navigate(['/status']);
  }

  onSubmit(){
    console.log(this.statusForm)
  }
}
