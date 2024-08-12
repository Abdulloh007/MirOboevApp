import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  setPin(pin: string) {
    return this.http.post(this.hostControlSvr.defineHost() + '/set-pin', { pin }, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 
  
  checkPin(pin: string) {
    return this.http.put(this.hostControlSvr.defineHost() + '/set-pin', { pin }, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 
}
