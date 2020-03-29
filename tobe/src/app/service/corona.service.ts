import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  readonly COUNTRIES_URL = environment.CORONA_API + 'countries/';
  constructor(private http: HttpClient) { }

  getDataByCountries() {
    return this.http.get(this.COUNTRIES_URL);
  }
}
