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

  findOutPrice(title: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/find-out-price/' + title, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  findOutBalance(title: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/find-out-balance/' + title, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }
}