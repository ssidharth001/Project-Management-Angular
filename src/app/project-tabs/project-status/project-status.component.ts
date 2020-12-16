import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {

  constructor(private router:Router, private formService: FormServiceService) { }

  ngOnInit(): void {
  }

  addStatusForm(){
    this.formService.isFormStatus.next(1);
    this.router.navigate(['/status/add']);
  }

}
