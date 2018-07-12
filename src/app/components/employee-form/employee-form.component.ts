import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
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
export class EmployeeFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  currentDate: Date;
  hasPressedSaveEmployee: boolean;
  countries;
  currentArea: string;
  @Output() pressedSave = new EventEmitter();
  @Output() goBack = new EventEmitter();
  @Input() isViewing: boolean = false;
  @Input() selectedEmployeeData: Employee = null;

  constructor(private formBuilder: FormBuilder,
              private countryService: CountryService,
              private datesConverterService: DatesConverterService,
              private calculateAgeService: CalculateAgeService) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.hasPressedSaveEmployee = false;
    this.createForm();
    this.getCountries();
    if (this.selectedEmployeeData) {
      this.fillForm();
    }
  }

  ngOnChanges() {}

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      dob: [null, Validators.required],
      country: [null, Validators.required],
      userName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      hireDate: [null, Validators.required],
      status: [true, Validators.required],
      area: [null, Validators.required],
      jobTitle: [null, Validators.required],
      tipRate: [null],
    });
  }

  fillForm() {
    this.form.controls['name'].setValue(this.selectedEmployeeData.name);
    this.form.controls['dob'].setValue(new Date(this.selectedEmployeeData.dob));
    this.form.controls['country'].setValue(this.selectedEmployeeData.country);
    this.form.controls['userName'].setValue(this.selectedEmployeeData.username);
    this.form.controls['hireDate'].setValue(new Date(this.selectedEmployeeData.hireDate));
    this.form.controls['status'].setValue(this.selectedEmployeeData.status);
    this.form.controls['area'].setValue(this.selectedEmployeeData.area);
    this.form.controls['jobTitle'].setValue(this.selectedEmployeeData.jobTitle);
    this.form.controls['tipRate'].setValue(this.selectedEmployeeData.tipRate);

    if (this.isViewing) {
      this.disableFields();
    }
  }

  disableFields() {
    this.form.controls['name'].disable();
    this.form.controls['dob'].disable();
    this.form.controls['country'].disable();
    this.form.controls['userName'].disable();
    this.form.controls['hireDate'].disable();
    this.form.controls['status'].disable();
    this.form.controls['area'].disable();
    this.form.controls['jobTitle'].disable();
    this.form.controls['tipRate'].disable();
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
