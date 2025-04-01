import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoffeeService } from '../coffee.service';
import { Record } from '../models/record';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';

@Component({
  selector: 'app-coffee-list',
  imports: [CommonModule],
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})
export class CoffeeListComponent implements OnInit, OnDestroy{
  updateListSubscription: Subscription;
  coffeeServiceSubscription: Subscription;
  records: Record[] = [];
  deleteId = 0;
  displayConfirmationPopup = "none";
  displayResultPopup = "none";
  resultPopupMessage = "";

  response: ApiResponse = {
    success: false
  }

  constructor(private coffeeService: CoffeeService) {
    this.updateListSubscription = this.coffeeService.sendUpdateList().subscribe(() => {
      this.getAllRecords();
    });
  }

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords() {
    this.coffeeService.getRecords().subscribe((data) => {
      this.records = data as Record[];
      console.log(data);
    })
  }

  openConfirmationPopup(id: number) {
    this.deleteId = id;
    this.displayConfirmationPopup = "block";
  }

  onDelete() {
    this.coffeeService.deleteRecord(this.deleteId).subscribe((data) => {
      this.response = data as ApiResponse;
      this.getAllRecords();
      this.closeConfirmationPopup();
      this.openResultPopup(this.response.success);
    })
  }

  openResultPopup(result: boolean) {
    this.displayResultPopup = 'block';
    if (result != null && result) {
      this.resultPopupMessage = "Record deleted successfully";
    } else {
      this.resultPopupMessage = "There was an error";
    }
  }

  closeConfirmationPopup() {
    this.displayConfirmationPopup = "none";
  }

  closeResultPopup() {
    this.displayResultPopup = 'none';
  }

  onUpdate(id: number) {
    this.coffeeService.populateForm(id);
  }

  ngOnDestroy() {
    this.updateListSubscription.unsubscribe();
    this.coffeeServiceSubscription.unsubscribe();
  }
}
