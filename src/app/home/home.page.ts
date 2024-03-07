import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../interfaces/Role';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  userRole: Role = {
    name: '',
    degree: 0
  }

  constructor() {}
  
  ngOnInit() {
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole)) 
  }

}
