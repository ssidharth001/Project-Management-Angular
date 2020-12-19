import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  selectedId;

  constructor(private router: Router,
    private formService: FormServiceService,
    private dataService: DataService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get('http://localhost:8080/projects')
      .subscribe(res => {
        this.projects = res;
        this.setSelectedId();
      })

    this.dataService.selectedId.subscribe(id => this.selectedId = id)
  }

  loadProjectForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigate(['/project/add']);
  }

  passIndex(projectId) {
    this.selectedId = projectId;
    this.setSelectedId();
  }

  setSelectedId() {
    this.dataService.selectedId.next(this.selectedId)
  }

}