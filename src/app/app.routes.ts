import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' }, 
      { 
        path: 'login', 
        loadComponent: () => import('./core/pages/login/login.component').then(m => m.LoginComponent) 
      },
      { 
        path: 'register', 
        loadComponent: () => import('./core/pages/register/register.component').then(m => m.RegisterComponent) 
      },
      { 
        path: 'forget-password', 
        loadComponent: () => import('./core/pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) 
      },
      { 
        path: 'set-password', 
        loadComponent: () => import('./core/pages/set-password/set-password.component').then(m => m.SetPasswordComponent) 
      },
      { 
        path: 'verify-code', 
        loadComponent: () => import('./core/pages/verify-code/verify-code.component').then(m => m.VerifyCodeComponent) 
      }
    ]
  },
  {
    path:'',redirectTo: 'auth',pathMatch: 'full'
  }
];
