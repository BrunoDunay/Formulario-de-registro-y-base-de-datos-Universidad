import { Routes } from '@angular/router';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', component: PresentacionComponent },
  { path: 'formulario', component: FormComponent },
  { path: '**', redirectTo: '' } 
];
