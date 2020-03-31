import { Component, OnInit } from '@angular/core';
import { CoronaService } from './service/corona.service';
import { Corona } from './model/corona.interface';
import { CStatus } from './model/cstatus.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tobe';

  time = new Date();
  timer;
  isLoading: boolean = false;
  cases: any = [];
  status: Corona = { cases: 0, deaths: 0, recovered: 0, updated: 0, active: 0 };
  cStatus: CStatus = {
    "country": "",
    "countryInfo": {
      "_id": 0,
      "country": "",
      "iso2": "",
      "iso3": "",
      "lat": 0,
      "long": -0,
      "flag": ""
    },
    "cases": 0,
    "todayCases": 0,
    "deaths": 0,
    "todayDeaths": 0,
    "recovered": 0,
    "active": 0,
    "critical": 0,
    "casesPerOneMillion": 0,
    "deathsPerOneMillion": 0,
    "updated": 0
  };

  constructor(private data: CoronaService, private toastr: ToastrService) { }

  reload() {
    // this.isLoading = true;
    console.log('data reloaded');
    this.data.getDataByCountries().subscribe(
      result => {
        // this.isLoading = false;
        this.cases = result;
      }
    );
  };

  countryStatus(cname) {
    this.data.getDataByCountryName(cname).subscribe(
      result => {
        console.log(result);
        this.cStatus = result;
      }
    );
  }

  all() {
    this.data.getAllStatus().subscribe(
      result => {
        console.log(result);
        if (this.status.cases != result.cases) {

          let more = this.status.cases == 0 ? '' : ' more';
          this.toastr.warning(result.cases - this.status.cases + more + ' cases spotted', 'Global hazard',
            { timeOut: 6000, progressBar: true, positionClass: 'toast-bottom-center' });

          this.status = result;
          this.reload();
        }

      }
    );
  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.all();
    // this.reload();

    this.timer = setInterval(() => {
      this.all();
      // this.reload();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  handleClick() {
    this.all();
    // this.reload();
  }
}
