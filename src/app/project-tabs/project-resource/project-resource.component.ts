import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

@Component({
  selector: 'app-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.css']
})
export class ProjectResourceComponent implements OnInit {

  resources;
  selectedId;
  selectedProjRes = [{}];
  newResources = [{}];

  constructor(private formService: FormServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedId = +params['id'];
        this.fetchResource()
        console.log(this.selectedId)
      });

    this.dataService.resources.subscribe(res => {
      // this.fetchResource()
    })
    console.log(this.newResources)

  }

  fetchResource() {
    this.http
      .get('http://localhost:8080/resources')
      .subscribe((res: []) => {
        this.resources = res;
        let selectedRes = res.filter((resource) => {
          return resource.project_id == this.selectedId;
        })
        this.selectedProjRes = selectedRes;
        console.log(this.selectedProjRes)
      })
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
