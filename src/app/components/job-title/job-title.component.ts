import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit, OnChanges {

  @Input() currentArea: string;
  @Output() changeSelection = new EventEmitter();
  servicesJobTitles = [{name: 'Manager'}, {name: 'Host'}, {name: 'Tuttofare'}, {name: 'Waitress'}, {name: 'Dining room manager'}];
  kitchenJobTitles = [{name: 'Chef'}, {name: 'Sous chef'}, {name: 'Dishwasher'}, {name: 'cook'}];
  dropDownOptions;
  selectedJobTitle: string;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.setDropDownOptions();
  }

  setDropDownOptions() {
    if (this.currentArea === 'Services') {
      this.dropDownOptions = this.servicesJobTitles;
    } else if (this.currentArea === 'Kitchen') {
      this.dropDownOptions = this.kitchenJobTitles;
    }
  }

  changeSelectedJobTitle() {
    this.changeSelection.emit(this.selectedJobTitle);
  }

}
