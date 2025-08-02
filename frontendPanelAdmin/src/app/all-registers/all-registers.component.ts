import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesService } from '../../services/inscripciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-registers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-registers.component.html',
  styleUrls: ['./all-registers.component.css']
})
export class AllRegistersComponent implements OnInit {
  inscripciones: any[] = [];
  inscripcionesFiltradas: any[] = [];

  constructor(private inscripcionesService: InscripcionesService) {}

  ngOnInit(): void {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.inscripcionesService.obtenerInscripciones().subscribe({
      next: (data) => {
        // Ordenamos de más reciente a más antiguo
        this.inscripciones = data.sort((a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.filtrarUltimos5Dias(); // ✅ por defecto últimos 5 días
      },
      error: (error) => {
        console.error('❌ Error al obtener inscripciones', error);
      }
    });
  }

  formatearTelefono(numero: string): string {
    if (!numero) return '';
    const limpio = numero.replace(/\D/g, '');
    if (limpio.length === 10) {
      return `(${limpio.substring(0, 2)}) ${limpio.substring(2, 6)}-${limpio.substring(6)}`;
    }
    return numero;
  }

  // ✅ Filtra solo registros de los últimos 5 días
  filtrarUltimos5Dias(): void {
    const hoy = new Date();
    const hace5dias = new Date();
    hace5dias.setDate(hoy.getDate() - 5);

    this.inscripcionesFiltradas = this.inscripciones.filter(item => {
      const fechaRegistro = new Date(item.createdAt);
      return fechaRegistro >= hace5dias && fechaRegistro <= hoy;
    });
  }

  // ✅ Panel para elegir rango de fechas
  filtrarPorFecha(): void {
    Swal.fire({
      title: 'Filtrar por fecha',
      html: `
        <label>Fecha de inicio:</label>
        <input type="date" id="fechaInicio" class="swal2-input">
        <label>Fecha final:</label>
        <input type="date" id="fechaFin" class="swal2-input">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Aplicar filtro',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const inicio = (document.getElementById('fechaInicio') as HTMLInputElement).value;
        const fin = (document.getElementById('fechaFin') as HTMLInputElement).value;

        if (!inicio || !fin) {
          Swal.showValidationMessage('⚠️ Debes seleccionar ambas fechas');
          return false;
        }

        return { inicio, fin };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { inicio, fin } = result.value;
        this.inscripcionesFiltradas = this.inscripciones.filter(item => {
          const fechaRegistro = item.createdAt.split('T')[0];
          return fechaRegistro >= inicio && fechaRegistro <= fin;
        });
      }
    });
  }
}
