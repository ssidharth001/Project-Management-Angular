import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: [{}];

  id: number;

  constructor(private route: ActivatedRoute, private dataService: DataService, private http: HttpClient) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.fetchData(this.id)
      }
    )
  }

  fetchData(id: number) {
    this.http
      .get('http://localhost:8080/projects')
      .subscribe((res: []) => {
        let selectedProj = res.filter((proj) => {
          return proj.projectId == this.id
        })
        this.project = selectedProj[0];
        this.dataService.selectedProject.next(selectedProj[0]);
      })
  }
}
