import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare, faWeixin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faCoffee = faCoffee;
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faWeixin = faWeixin;
  
  constructor() { }

  ngOnInit(): void {
  }

}
