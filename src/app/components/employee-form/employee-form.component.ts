import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../../services/country/country.service';
import {EmployeesService} from '../../services/employees/employees.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  form: FormGroup;
  currentDate: Date;
  hasPressedSaveEmployee: boolean;
  countries;
  currentArea: string;

  constructor(private formBuilder: FormBuilder, private countryService: CountryService, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.hasPressedSaveEmployee = false;
    this.createForm();
    this.getCountries();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      dob: [null, Validators.required],
      country: [null, Validators.required],
      userName: [null, Validators.required],
      hireDate: [null, Validators.required],
      status: [true, Validators.required],
      area: [null, Validators.required],
      jobTitle: [null, Validators.required],
      tipRate: [null, Validators.required],
    });
  }

  getCountries() {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    }, err => {
      console.log('There was an error loading the countries', err);
    });
  }

  isFieldValid(field) {
    return !this.form.get(field).valid && this.hasPressedSaveEmployee;
  }

  changeArea() {
    this.currentArea = this.form.controls['area'].value;
  }

  handleJobTitleChange(jobTitle) {
    this.form.controls['jobTitle'].setValue(jobTitle);
  }

  saveEmployee(post) {
    this.hasPressedSaveEmployee = true;
    console.log('el empleado', post);

    if (this.form.valid) {
      console.log('el empleado', post);
      //this.addEmployee();
    }
  }

  addEmployee(employee) {
    this.employeesService.addEmployee(employee).subscribe(res => {
      console.log('agrego', res);
    }, err => {
      console.log('hubo error', err);
    });
  }

}
