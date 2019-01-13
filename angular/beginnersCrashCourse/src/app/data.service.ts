import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  globalSomeClick() {
    console.log('global someClick clicked')
  }

  // using http module to fetch some data
  getUsers() {
    return this.http.get('https://reqres.in/api/users')
  }
}
