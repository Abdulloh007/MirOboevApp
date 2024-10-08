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
  {
    path: 'rotation',
    loadChildren: () => import('./rotation/rotation.module').then( m => m.RotationPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'income',
    loadChildren: () => import('./income/income.module').then( m => m.IncomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'inquirer',
    loadChildren: () => import('./inquirer/inquirer.module').then( m => m.InquirerPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'permission',
    loadChildren: () => import('./permission/permission.module').then( m => m.PermissionPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'purchase-orders',
    loadChildren: () => import('./purchase-orders/purchase-orders.module').then( m => m.PurchaseOrdersPageModule)
  },
  {
    path: 'messenger',
    loadChildren: () => import('./messenger/messenger.module').then( m => m.MessengerPageModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./results/results.module').then( m => m.ResultsPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
