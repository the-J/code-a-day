import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  h1GreyStyle: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  someClick() {
    console.log('someClick clicked');
    this.h1GreyStyle = !this.h1GreyStyle;
  }
}
