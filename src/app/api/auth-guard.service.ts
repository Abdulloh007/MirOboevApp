import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.isAuthed();
  }

  isAuthed() : boolean {
    if (localStorage.getItem('token')) return true
    else return false
  }

  isPermited(roleDegree: number) {
    const userRole: Role = JSON.parse(localStorage.getItem('role') || '{}')
    if (userRole.degree && userRole.degree <= roleDegree) return true
    return false 
  }
}
