import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit, OnChanges {

  @Input() isViewing = false;
  @Input() currentArea: string;
  @Input() selectedEmployeeJobTitle: string;
  @Output() changeSelection = new EventEmitter();
  servicesJobTitles = [{name: 'Manager'}, {name: 'Host'}, {name: 'Tuttofare'}, {name: 'Waitress'}, {name: 'Dining room manager'}];
  kitchenJobTitles = [{name: 'Chef'}, {name: 'Sous chef'}, {name: 'Dishwasher'}, {name: 'Cook'}];
  dropDownOptions;
  selectedJobTitle: string;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.selectedJobTitle = null;
    this.setDropDownOptions();
    if (this.selectedEmployeeJobTitle) {
      this.selectedJobTitle = this.selectedEmployeeJobTitle;
    }
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
