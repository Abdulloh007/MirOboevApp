import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './api/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'find-out',
    loadChildren: () => import('./find-out/find-out.module').then( m => m.FindOutPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'move-orders',
    loadChildren: () => import('./move-orders/move-orders.module').then( m => m.MoveOrdersPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'return-orders',
    loadChildren: () => import('./return-orders/return-orders.module').then( m => m.ReturnOrdersPageModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
