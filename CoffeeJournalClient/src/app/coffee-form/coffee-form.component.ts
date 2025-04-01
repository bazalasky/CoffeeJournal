import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CoffeeService } from '../coffee.service';
import { Subscription } from 'rxjs';
import { Record } from '../models/record';
import { ApiResponse } from '../models/apiResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coffee-form',
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './coffee-form.component.html',
  styleUrls: ['./coffee-form.component.css']
})
export class CoffeeFormComponent implements OnInit, OnDestroy{
  populateFormSubscription: Subscription;
  coffeeServiceSubscription: Subscription;
  public addRecordForm: FormGroup;
  public record: Record;

  submitButton = "";
  displayPopup = "none";
  resultPopupMessage = "";
  operation = "";

  response: ApiResponse = {
    success: false
  }
  
  hasApiResponded = false;

  constructor(private fb: FormBuilder,
    private coffeeService: CoffeeService) {
      this.populateFormSubscription = this.coffeeService.sendPopulateForm().subscribe((data) => {
        this.populateForm(data);
      })
    }

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
    this.submitButton = "Add Record";
    this.addRecordForm = this.fb.group({
      id: [0],
      type: ['', [Validators.required]],
      bean: [''],
      location: ['', [Validators.required]],
      dateCreated: ['', [Validators.required]],
      score: [''],
      numShots: ['', [Validators.required, Validators.min(0)]],
      price: ['']
    })
  }

  get registerFormControl(): { [key: string]: AbstractControl} {
    return this.addRecordForm.controls;
  }

  onSubmit() {
    if (this.addRecordForm.valid) {
      if (this.addRecordForm.value.id > 0) {
        this.coffeeService.updateRecord(this.addRecordForm.value).subscribe((data) => {
          this.coffeeService.updateList();
          this.response = data as ApiResponse;
          this.operation = "updated";
          this.openPopup(this.response.success);
          this.emptyForm();
          this.hasApiResponded = true;
       });
      } else {
        this.coffeeService.addRecord(this.addRecordForm.value).subscribe((data) => {
          this.coffeeService.updateList();
          this.response = data as ApiResponse;
          this.operation = "added";
          this.openPopup(this.response.success);
          this.emptyForm();
          this.hasApiResponded = true;
       })
        if (!this.hasApiResponded) {
        this.openPopup(false);
      }
  }
    } else {
      return;
    }

  }

  populateForm(id: number) {
    this.submitButton = "Update Record";
    this.coffeeService.getRecord(id).subscribe((record) => {
      this.record = record as Record
      this.addRecordForm = this.fb.group({
        id: this.record.id,
        type: this.record.type,
        bean: this.record.bean,
        location: this.record.location,
        dateCreated: this.record.dateCreated,
        score: this.record.score,
        numShots: this.record.numShots,
        price: this.record.price
      });
    })
  }

  openPopup(result: boolean) {
    this.displayPopup = "block";

    if (result != null && result) {
      this.resultPopupMessage = 'Record ' + this.operation + ' successfully';
    }
    else {
      this.resultPopupMessage = "There was an error";
    }
  }

  closePopup() {
    this.displayPopup = "none";
  }

  ngOnDestroy() {
    this.populateFormSubscription.unsubscribe();
    this.coffeeServiceSubscription.unsubscribe();
  }
}
