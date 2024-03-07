import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getIncomes() {
    return this.http.get(this.hostControlSvr.defineHost() + '/incomes', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  getIncome(id: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/income/' + id, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  createIncome(order: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/incomes', JSON.stringify(order), {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getBaseInfo(base_id: string) {
    return this.http.post(this.hostControlSvr.defineHost() + '/pre-income', JSON.stringify({base: base_id}), {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  // getIncomeForm(id: string | number) {
  //   return this.http.get(this.hostControlSvr.defineHost() + '/get_order_document/' + id, {
  //     headers: {
  //       'Authorization': 'Basic ' + localStorage.getItem('token')
  //     }
  //   })
  // }
}
