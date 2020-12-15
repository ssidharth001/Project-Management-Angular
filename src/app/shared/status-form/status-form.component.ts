import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from '../services/form-service.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {

  constructor(private formService: FormServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  cancelStatus() {
    this.formService.isFormStatus.next(0);
    this.router.navigate(['/status']);
  }
}
