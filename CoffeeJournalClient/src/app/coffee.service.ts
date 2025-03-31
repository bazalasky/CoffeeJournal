import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  readonly rootUrl = 'https://localhost:5219/';
  constructor(private http: HttpClient) { }

  getRecords() {
    return this.http.get(this.rootUrl + "/Coffee");
  }
}
