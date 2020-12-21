import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.css']
})
export class ProjectTabsComponent implements OnInit {
  path: string;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.selectedId.subscribe(id => this.path = `/project/${id}`);
  }
}
