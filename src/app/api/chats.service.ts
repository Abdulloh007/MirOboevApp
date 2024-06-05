import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  getUsers() {
    return this.http.get(this.hostControlSvr.defineChatHost() + '/users', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getChats() {
    return this.http.get(this.hostControlSvr.defineChatHost() + '/chats', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getChat(id: string) {
    return this.http.get(this.hostControlSvr.defineChatHost() + '/chat/' + id, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  createChat(body: any) {
    return this.http.post(this.hostControlSvr.defineChatHost() + '/chats', body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  updateChat(id: string, body: any) {
    return this.http.put(this.hostControlSvr.defineChatHost() + '/chat/' + id, body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  createMessage(body: any) {
    return this.http.post(this.hostControlSvr.defineChatHost() + '/msgs', body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  updateMessage(body: any) {
    return this.http.put(this.hostControlSvr.defineChatHost() + '/msgs', body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

  getMessage(body: any) {
    return this.http.post(this.hostControlSvr.defineChatHost() + '/get-msgs', body, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }

}
