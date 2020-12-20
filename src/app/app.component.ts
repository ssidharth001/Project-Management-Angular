import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from './shared/services/data.service';
import { FormServiceService } from './shared/services/form-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  isForm: number;
  isProjectDetails = true;
  subscription: Subscription;
  path: string;
  constructor(private formService: FormServiceService, private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.subscription = this.formService.isFormStatus.subscribe(
      status => {
        this.isForm = status;
      }
    );
    this.dataService.selectedId.subscribe(id => this.path = `/project/${id}/edit`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editProjectForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigate([this.path]);

  }

}