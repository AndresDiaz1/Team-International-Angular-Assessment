import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }

}
