import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getResults(period: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/results/' + period, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  getResultsCustomPeriod(period: string, date1: string, date2: string) {
    return this.http.post(this.hostControlSvr.defineHost() + '/results/' + period, {
      date1,
      date2
    }, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

}
