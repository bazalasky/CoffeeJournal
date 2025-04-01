import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from './models/record';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  readonly rootUrl = 'http://localhost:5219';
  constructor(private http: HttpClient) { }

  getRecords() {
    return this.http.get(this.rootUrl + "/Coffee");
  }

  addRecord(record: Record){
    return this.http.post(this.rootUrl + '/Coffee', record);
  }
}
