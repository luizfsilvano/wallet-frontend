import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { DashboardComponent } from './dashboard/dashboard';
import { HomeComponent } from './home/home';
import { WalletDetailsComponent } from './wallet/wallet-details/wallet-details';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'wallet/id',
    component: WalletDetailsComponent,
    canActivate: [authGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', redirectTo: '/home' },
];
