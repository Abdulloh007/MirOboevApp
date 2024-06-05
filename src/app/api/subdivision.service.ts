import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  searchSubdivision(query: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/s-subdivision/' + query, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

}