import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getStorages() {
    return this.http.get(this.hostControlSvr.defineHost() + '/storages', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  findStorage(val: string) {
    return this.http.get(this.hostControlSvr.defineHost() + '/storage/' + val, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  } 

  // getStorage(id: string) {
  //   return this.http.get(this.hostControlSvr.defineHost() + '/client-order/' + id, {
  //     headers: {
  //       'Content-Type': 'application/json, charset=utf-8',
  //       'Accept': 'application/json',
  //       'Authorization': 'Basic ' + localStorage.getItem('token')
  //     }
  //   })
  // }

  // createStorage(order: any) {
  //   return this.http.post(this.hostControlSvr.defineHost() + '/clients-orders', JSON.stringify(order), {
  //     headers: {
  //       'Content-Type': 'application/json, charset=utf-8',
  //       'Authorization': 'Basic ' + localStorage.getItem('token')
  //     }
  //   })
  // }

}
