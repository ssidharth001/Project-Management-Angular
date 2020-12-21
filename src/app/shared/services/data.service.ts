import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    selectedId = new Subject<number>();

    selectedProject = new Subject();

    projects = new Subject();

    resources = new Subject();

    selectedResource = new Subject();

    constructor(private http: HttpClient) { }

    fetchData() {
        this.http
            .get('http://localhost:8080/projects')
            .subscribe(res => {
                return res;
            })
    }
}