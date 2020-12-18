import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { FormServiceService } from '../shared/services/form-service.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects;

  constructor(private router: Router,
    private formService: FormServiceService,
    private dataService: DataService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get('http://localhost:8080/projects')
      .subscribe(res => {
        this.projects = res;
      })
  }

  loadProjectForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigate(['/project/add']);
  }

}