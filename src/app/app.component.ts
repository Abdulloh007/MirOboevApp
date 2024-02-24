import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  userAccount: string = 'Меню'

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth'])
    }
    if (localStorage.getItem('account')) this.userAccount = localStorage.getItem('account') || 'Меню'
  }

  exitAccount() {
    localStorage.removeItem('activeServer')
    localStorage.removeItem('token')
    localStorage.removeItem('orderDraft')
    localStorage.removeItem('account')
    this.router.navigate(['/auth'])
  }
}
