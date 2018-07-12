import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../../services/country/country.service';
import {DatesConverterService} from '../../miscellaneous/dates-converter/dates-converter.service';
import {CalculateAgeService} from '../../miscellaneous/calculate-age/calculate-age.service';
import {Employee} from '../../models/employee.model';

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
  @Output() pressedSave = new EventEmitter();
  @Output() goBack = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private countryService: CountryService,
              private datesConverterService: DatesConverterService,
              private calculateAgeService: CalculateAgeService) { }

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
      userName: [null, [Validators.required, Validators.pattern('^[a-z0-9]+$')]],
      hireDate: [null, Validators.required],
      status: [true, Validators.required],
      area: [null, Validators.required],
      jobTitle: [null, Validators.required],
      tipRate: [null],
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
    this.form.controls['tipRate'].setValue(null);
    this.currentArea = this.form.controls['area'].value;
  }

  handleJobTitleChange(jobTitle) {
    this.form.controls['jobTitle'].setValue(jobTitle);
  }

  setTipRateVisibility() {
    if (this.form.controls['jobTitle'].value === 'Waitress' || this.form.controls['jobTitle'].value === 'Dining room manager') {
      this.form.controls['tipRate'].setValidators([Validators.required]);
      this.form.controls['tipRate'].updateValueAndValidity();
      return true;
    } else {
      this.form.controls['tipRate'].setValidators([]);
      this.form.controls['tipRate'].updateValueAndValidity();
      return false;
    }
  }

  isUnder18(): boolean {
    const selectedDob = this.datesConverterService.formatDate(this.form.controls['dob'].value);
    const employeeAge = this.calculateAgeService.calculateAge(selectedDob);
    return employeeAge < 18;
  }

  isFormValid() {
    return this.form.valid && !this.isUnder18();
  }

  saveEmployee(post) {
    this.hasPressedSaveEmployee = true;
    if (this.isFormValid()) {
      const employee = this.prepareEmployeeData(post);
      this.pressedSave.emit(employee);
    }
  }

  prepareEmployeeData(post): Employee {
    let tipRate: number;
    if (post.jobTitle === 'Waitress' || post.jobTitle === 'Dining room manager') {
      tipRate = post.tipRate;
    } else {
      tipRate = 0;
    }
    return {
      name: post.name,
      dob: this.datesConverterService.formatDate(post.dob),
      country: post.country,
      username: post.userName,
      hireDate: this.datesConverterService.formatDate(post.hireDate),
      status: post.status,
      area: post.area,
      jobTitle: post.jobTitle,
      tipRate: tipRate
    };
  }

  hasPressedBack() {
      this.goBack.emit(this.form.dirty);
  }
}
