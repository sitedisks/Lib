import { Component, OnInit } from '@angular/core';
import { CoronaService } from './service/corona.service';
import { Corona } from './model/corona.interface';
import { CStatus } from './model/cstatus.interface';
import { History } from './model/history.interface';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';
import { PwaService } from './service/pwa.service';

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
  dates: string[] = [];
  cases_count: number[] = [];
  deaths_count: number[] = [];
  recovered_count: number[] = [];
  chart = [];

  constructor(
    private data: CoronaService,
    private toastr: ToastrService,
    private pwa: PwaService) { }

  installPwa(): void {
    this.pwa.promptEvent.prompt();
  }

  renderChart() {
    this.chart = new Chart('corona', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Cases',
            data: this.cases_count,
            borderColor: '#ffc107',
            fill: false
          },
          {
            label: 'Deaths',
            data: this.deaths_count,
            borderColor: '#dc3545',
            fill: false
          },
          {
            label: 'Recovered',
            data: this.recovered_count,
            borderColor: '#28a745',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        legend: { display: false },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: false }]
        }
      }
    });
  }

  reload() {
    // this.isLoading = true;
    console.log('data reloaded');
    this.data.getDataByCountries().subscribe(
      result => {
        // this.isLoading = false;
        this.cases = result;
      }
    );

    this.dates = [];
    this.cases_count = [];
    this.deaths_count = [];
    this.recovered_count = [];

    this.data.getHistoryStatus().subscribe(
      (result: History) => {

        for (const [date, count] of Object.entries(result.cases)) {
          this.dates.push(date);
          this.cases_count.push(count);
        }

        for (const [date, count] of Object.entries(result.deaths)) {
          this.deaths_count.push(count);
        }

        for (const [date, count] of Object.entries(result.recovered)) {
          this.recovered_count.push(count);
        }

        this.renderChart();
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
