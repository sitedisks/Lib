import { Component, OnInit } from '@angular/core';
import { CoronaService } from './service/corona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tobe';

  cases:any = [];
  constructor(private data: CoronaService) { }

  ngOnInit() { 
    this.data.getDataByCountries().subscribe(
      result=>{
        console.log(result);
        this.cases = result;
      }
    );
  }
}
