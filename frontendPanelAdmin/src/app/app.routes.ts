import { Routes } from '@angular/router';
import { FistViewTableComponent } from './fist-view-table/fist-view-table.component';
import { AllRegistersComponent } from './all-registers/all-registers.component';

export const routes: Routes = [
  { path: '', component: FistViewTableComponent },
  { path: 'all-registers', component: AllRegistersComponent }
];
