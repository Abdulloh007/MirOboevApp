import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  searchProducts(query: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/s/' + query, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getProductById(id: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/s-id/' + id, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  findOutPrice(number: number | string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/find-out-price/' + number, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  findOutBalance(id: number | string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/find-out-balance/' + id, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }
}