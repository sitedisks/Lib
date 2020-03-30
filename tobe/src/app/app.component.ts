import { Component, OnInit } from '@angular/core';
import { CoronaService } from './service/corona.service';
import { Corona } from './model/corona.interface';

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
  status: Corona = {cases: 0, deaths: 0, recovered: 0, updated: 0, active: 0};

  constructor(private data: CoronaService) { }

  reload() {
    this.isLoading = true;
    console.log('data reloaded');
    this.data.getDataByCountries().subscribe(
      result => {
        this.isLoading = false;
        this.cases = result;
      }
    );
  };

  all() {
    this.data.getAllStatus().subscribe(
      result => {
        console.log(result);
        this.status = result;
      }
    );
  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.all();
    this.reload();
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

  handleClick(){
    this.all();
    this.reload();
  }
}
