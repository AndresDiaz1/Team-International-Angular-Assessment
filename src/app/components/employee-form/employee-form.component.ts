import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  form: FormGroup;
  currentDate: Date;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      dob: [null, Validators.required],
      country: [null, Validators.required],
      userName: [null, Validators.required],
      hireDate: [null, Validators.required],
      status: [null, Validators.required],
      area: [null, Validators.required],
      jobTitle: [null, Validators.required],
      tipRate: [null, Validators.required],
    });
  }

}
