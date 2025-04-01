import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CoffeeService } from '../coffee.service';
import { Subscription } from 'rxjs';
import { Record } from '../models/record';

@Component({
  selector: 'app-coffee-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './coffee-form.component.html',
  styleUrl: './coffee-form.component.css'
})
export class CoffeeFormComponent implements OnInit{
  populateFormSubscription: Subscription;
  public addRecordForm: FormGroup;
  public record: Record;
  submitButton = "Add Record";

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
    if (this.addRecordForm.value.id > 0){
      this.coffeeService.updateRecord(this.addRecordForm.value).subscribe((data) => {
        this.coffeeService.updateList();
        this.emptyForm();
      });
    }
    else {
      this.coffeeService.addRecord(this.addRecordForm.value).subscribe((data) => {
        this.coffeeService.updateList();
        this.emptyForm()});
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
}
