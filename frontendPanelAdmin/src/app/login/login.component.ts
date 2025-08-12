// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  contra = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  iniciarSesion() {
    this.authService.login(this.usuario, this.contra).subscribe({
      next: () => this.router.navigate(['/panel']),
      error: () => alert('Credenciales incorrectas')
    });
  }
}
