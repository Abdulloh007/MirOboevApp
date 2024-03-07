import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class RotationService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getRotations() {
    return this.http.get(this.hostControlSvr.defineHost() + '/rotation', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  setUserRotation(body: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/rotation', JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

}