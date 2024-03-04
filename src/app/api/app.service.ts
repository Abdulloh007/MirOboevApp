import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  setAppVersion() {
    return this.http.post(this.hostControlSvr.defineHost() + '/set-app-version', {
      "version": environment.version
    }, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 
}
