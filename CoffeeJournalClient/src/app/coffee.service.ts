import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from './models/record';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  readonly rootUrl = 'http://localhost:5219';
  constructor(private http: HttpClient) { }
  private populateFormSubject = new Subject<any>();
  private updateListSubject = new Subject<any>();

  getRecords() {
    return this.http.get(this.rootUrl + "/Coffee");
  }

  getRecord(id: number) {
    return this.http.get(this.rootUrl + "/Coffee/" + id);
  }

  addRecord(record: Record){
    return this.http.post(this.rootUrl + '/Coffee', record);
  }

  deleteRecord(id: number) {
    return this.http.delete(this.rootUrl + "/Coffee/" + id);
  }

  updateRecord(record: Record) {
    return this.http.put(this.rootUrl + "/Coffee", record);
  }

  populateForm(id: number) {
    this.populateFormSubject.next(id);
  }

  sendPopulateForm() {
    return this.populateFormSubject.asObservable();
  }

  updateList() {
    this.updateListSubject.next(true);
  }

  sendUpdateList() {
    return this.updateListSubject.asObservable();
  }
}
