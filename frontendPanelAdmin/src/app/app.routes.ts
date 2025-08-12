import { Routes } from '@angular/router';
import { FistViewTableComponent } from './fist-view-table/fist-view-table.component';
import { AllRegistersComponent } from './all-registers/all-registers.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'all-registers', component: AllRegistersComponent, canActivate: [AuthGuard] },
  { path: 'panel', component: FistViewTableComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

