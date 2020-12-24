import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { ProjectsModel } from './projects-model.model';


@Injectable({
  providedIn: 'root'
})
export class ResourceApiService {

  reloadComponent = new Subject<number>();

  constructor(private http: HttpClient) { }

  storeResourceData(data: ProjectsModel) {
    this.http
      .post('https://project-dashboard-angular-default-rtdb.firebaseio.com/resources.json',
        data)
      .subscribe(responseData => {
        this.reloadComponent.next(1);
        console.log(responseData)
      })
  }

  updateResourceData(data: ProjectsModel[]) {
    this.http
      .put('https://project-dashboard-angular-default-rtdb.firebaseio.com/resources.json',
        data)
      .subscribe(responseData => {
        this.reloadComponent.next(1);
        console.log(responseData)
      })
  }

  fetchResources() {
    return this.http
      .get('https://project-dashboard-angular-default-rtdb.firebaseio.com/resources.json')
      .pipe(
        map(responseData => {
          const projectsArray: ProjectsModel[] = []
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              projectsArray.push({ ...responseData[key] })
            }
          }
          return projectsArray;
        })
      )
  }
}
