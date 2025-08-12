import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent {

  constructor(private router: Router) {}

  continuarRegistro() {
    this.router.navigate(['/formulario']);
  }
}
