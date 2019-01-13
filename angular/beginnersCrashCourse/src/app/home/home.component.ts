import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  h1GreyStyle: boolean = false;

  users: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  someClick() {
    console.log('someClick clicked');
    this.h1GreyStyle = !this.h1GreyStyle;
  }

  usingGlobalClick() {
    this.data.globalSomeClick();
  }
}
