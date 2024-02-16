import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    return this.http.get(environment.api + '/user', {
      headers: {
        'Authorization': 'Basic ' + this.UTF8TextToBase64(username + ':' + password)
      }
    })
  }

  base64ToUTF8Text(base64: string) {
    const binString = atob(base64);
    return new TextDecoder().decode(Uint8Array.from(binString.split('').map((m) => m.charCodeAt(0))));
  }

  UTF8TextToBase64(text: string) {
    const bytes: Uint8Array = new TextEncoder().encode(text);
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
  }

}
