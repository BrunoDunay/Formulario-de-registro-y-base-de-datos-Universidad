import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private autenticadoSubject = new BehaviorSubject<boolean>(this.hayToken());
  autenticado$ = this.autenticadoSubject.asObservable();

  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  private hayToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(usuario: string, password: string): Observable<{ token: string; role: string }> {
    return this.http
      .post<{ token: string; role: string }>(
        `${this.apiUrl}/login`, 
        { usuario, password }
      )
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this.autenticadoSubject.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.autenticadoSubject.next(false);
  }
}
