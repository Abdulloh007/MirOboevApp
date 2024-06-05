import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class PrintersService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getPrinters() {
    return this.http.get(this.hostControlSvr.defineHost() + '/printers', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  PrintOrder(body: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/printers', body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 
}
