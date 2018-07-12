import { Injectable } from '@angular/core';

@Injectable()
export class DatesConverterService {

  constructor() { }

  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + '/' + month + '/' + day;
  }

}
