import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Corona } from '../model/corona.interface';
import { CStatus } from '../model/cstatus.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  readonly ALL_URL = environment.CORONA_API + 'all';
  readonly COUNTRIES_URL = environment.CORONA_API + 'countries'; // /countries/australia
  readonly HISTORY_URL = environment.CORONA_API + 'v2/historical/all'; // v2/historical/all
  constructor(private http: HttpClient) { }

  getAllStatus(): Observable<Corona> {
    return this.http.get<Corona>(this.ALL_URL);
  }

  getHistoryStatus() {
    return this.http.get(this.HISTORY_URL);
  }

  getDataByCountries() {
    return this.http.get(this.COUNTRIES_URL + '?sort=cases');
  }

  getDataByCountryName(cname): Observable<CStatus> {
    return this.http.get<CStatus>(this.COUNTRIES_URL + '/' + cname);
  }
  
}
