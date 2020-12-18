import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    fetchData() {
        this.http
            .get('http://localhost:8080/projects')
            .subscribe(res => {
                return res;
            })
    }
}