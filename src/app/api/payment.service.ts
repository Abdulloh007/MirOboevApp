import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getPayments() {
    return this.http.get(this.hostControlSvr.defineHost() + '/payments', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  getPayment(id: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/payment/' + id, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  createPayment(order: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/payments', JSON.stringify(order), {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getBaseInfo(base_id: string) {
    return this.http.post(this.hostControlSvr.defineHost() + '/pre-payment', JSON.stringify({base: base_id}), {
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
