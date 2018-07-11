import { Injectable } from '@angular/core';

@Injectable()
export class CalculateAgeService {

  constructor() { }

  calculateAge(year: string): Number {
    const birthDate = year.split('/');
    const birthDateDate = new Date(Number(birthDate[0]), Number(birthDate[1]), Number(birthDate[2]));
    const diff_ms = Date.now() - birthDateDate.getTime();
    const age_dt = new Date(diff_ms);
    const actualAge = Math.abs(age_dt.getUTCFullYear() - 1970);
    return actualAge;
  }

}
