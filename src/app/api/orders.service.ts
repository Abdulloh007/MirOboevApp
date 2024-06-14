import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getOrders() {
    return this.http.get(this.hostControlSvr.defineHost() + '/clients-orders', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  getOrder(id: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/client-order/' + id, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  createOrder(order: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/clients-orders', JSON.stringify(order), {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }
  
  searchOrder(body: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/s-client-order', body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getOrderForm(id: string | number) {
    return this.http.get(this.hostControlSvr.defineHost() + '/get_order_document/' + id , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getOrderFormWithParams(id: string | number, getWithComment?: boolean) {
    return this.http.post(this.hostControlSvr.defineHost() + '/get_order_document/' + id, {
      comment: getWithComment ? 1 : 0 
    }, {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getDeliveryStatus() {
    return this.http.get(this.hostControlSvr.defineHost() + '/delivery', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  updateDeliveryStatus(body: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/delivery', body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  getDeliveriesMonitor(body: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/co-monitoring', body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

}
