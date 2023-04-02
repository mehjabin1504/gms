import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public localStorage;
  constructor() {
    this.localStorage = window.localStorage;
  }


  getItem(key) {
    let value = this.localStorage.getItem(key);
    return JSON.parse(value);
  }

  setItem(key, value) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    return this.localStorage.getItem(key);
  }

  set(key, value) {
    this.localStorage.setItem(key, value);
  }

  clear() {
    this.localStorage.clear();
    //console.log("cleared");
  }
}