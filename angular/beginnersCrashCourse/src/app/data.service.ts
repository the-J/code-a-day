import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  globalSomeClick() {
    console.log('global someClick clicked')
  }
}
