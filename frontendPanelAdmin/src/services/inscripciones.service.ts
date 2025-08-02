import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private apiUrl = '/api/inscripciones'; // Usamos proxy

  constructor(private http: HttpClient) {}

  obtenerInscripciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  actualizarInscripcion(id: string, datos: any) {
  return this.http.put(`/api/inscripciones/${id}`, datos);
}

  eliminarInscripcion(id: string) {
  return this.http.delete(`/api/inscripciones/${id}`);
}

  
}
