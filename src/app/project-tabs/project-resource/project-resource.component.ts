import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

@Component({
  selector: 'app-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.css']
})
export class ProjectResourceComponent implements OnInit {

  constructor(private formService:FormServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  loadResourceForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigate(['/resourceform']);
  }

}
