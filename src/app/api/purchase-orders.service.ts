import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getOrders() {
    return this.http.get(this.hostControlSvr.defineHost() + '/purchases', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  getOrder(id: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/purchase/' + id, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  createOrder(order: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/purchases', JSON.stringify(order), {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  // getOrderForm(id: string | number) {
  //   return this.http.get(this.hostControlSvr.defineHost() + '/get_order_document/' + id , {
  //     headers: {
  //       'Authorization': 'Basic ' + localStorage.getItem('token')
  //     }
  //   })
  // }

  // getOrderFormWithParams(id: string | number, getWithComment?: boolean) {
  //   return this.http.post(this.hostControlSvr.defineHost() + '/get_order_document/' + id, {
  //     comment: getWithComment ? 1 : 0 
  //   }, {
  //     headers: {
  //       'Authorization': 'Basic ' + localStorage.getItem('token')
  //     }
  //   })
  // }

}
