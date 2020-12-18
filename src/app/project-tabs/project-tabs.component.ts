import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.css']
})
export class ProjectTabsComponent implements OnInit {
  path: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.path = this.router.url;
    console.log(this.router.url);
    console.log(this.route.snapshot.url)
  }
}
