import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

@Component({
  selector: 'app-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.css']
})
export class ProjectResourceComponent implements OnInit {

  constructor(private formService: FormServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  loadResourceForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  editResource() {
    this.formService.isFormStatus.next(1);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
