import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getCurencies() {
    return this.http.get(this.hostControlSvr.defineHost() + '/currency', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 
}
