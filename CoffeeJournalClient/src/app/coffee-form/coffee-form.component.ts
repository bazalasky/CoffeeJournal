import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CoffeeService } from '../coffee.service';

@Component({
  selector: 'app-coffee-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './coffee-form.component.html',
  styleUrl: './coffee-form.component.css'
})
export class CoffeeFormComponent implements OnInit{
  public addRecordForm: FormGroup;
  submitButton = "Add Record";

  constructor(private fb: FormBuilder,
    private coffeeService: CoffeeService) {}

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
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
    this.coffeeService.addRecord(this.addRecordForm.value).subscribe((res) => {
      console.log(res);
      this.emptyForm()});
  }
}
