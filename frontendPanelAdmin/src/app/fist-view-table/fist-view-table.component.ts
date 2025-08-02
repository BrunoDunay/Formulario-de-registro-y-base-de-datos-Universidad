import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesService } from '../../services/inscripciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fist-view-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fist-view-table.component.html',
  styleUrls: ['./fist-view-table.component.css']
})
export class FistViewTableComponent implements OnInit {
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

        console.log('✅ Inscripciones cargadas:', data);

        // Por defecto filtrar solo los registros de hoy
        this.filtrarUltimos3Dias();
      },
      error: (error) => {
        console.error('❌ Error al obtener inscripciones', error);
      }
    });
  }

  filtrarUltimos3Dias(): void {
  const hoy = new Date();
  const hace3dias = new Date();
  hace3dias.setDate(hoy.getDate() - 3);

  this.inscripcionesFiltradas = this.inscripciones.filter(item => {
    const fechaRegistro = new Date(item.createdAt);
    return fechaRegistro >= hace3dias && fechaRegistro <= hoy;
  });
}


  // ✅ Filtra registros por rango de fechas
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

  // ✅ Formateo de números de teléfono
  formatearTelefono(numero: string): string {
    if (!numero) return '';
    const limpio = numero.replace(/\D/g, '');
    if (limpio.length === 10) {
      return `(${limpio.substring(0, 2)}) ${limpio.substring(2, 6)}-${limpio.substring(6)}`;
    }
    return numero;
  }

  eliminarRegistro(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscripcionesService.eliminarInscripcion(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El registro fue eliminado correctamente', 'success');
            this.cargarInscripciones();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
          }
        });
      }
    });
  }

  editarRegistro(inscripcion: any): void {
    Swal.fire({
      title: 'Editar Inscripción',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${inscripcion.nombre || ''}">
        <input id="primerApellido" class="swal2-input" placeholder="Primer Apellido" value="${inscripcion.primerApellido || ''}">
        <input id="segundoApellido" class="swal2-input" placeholder="Segundo Apellido" value="${inscripcion.segundoApellido || ''}">
        <input id="correo" class="swal2-input" placeholder="Correo" value="${inscripcion.correo || ''}">
        <input id="telefono" class="swal2-input" placeholder="Teléfono" value="${inscripcion.telefono || ''}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar cambios',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const primerApellido = (document.getElementById('primerApellido') as HTMLInputElement).value;
        const segundoApellido = (document.getElementById('segundoApellido') as HTMLInputElement).value;
        const correo = (document.getElementById('correo') as HTMLInputElement).value;
        const telefono = (document.getElementById('telefono') as HTMLInputElement).value;

        if (!nombre || !primerApellido || !correo) {
          Swal.showValidationMessage('⚠️ Nombre, Primer Apellido y Correo son obligatorios');
          return false;
        }

        return { nombre, primerApellido, segundoApellido, correo, telefono };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.inscripcionesService.actualizarInscripcion(inscripcion._id, result.value).subscribe({
          next: () => {
            Swal.fire('Actualizado', 'El registro fue actualizado correctamente', 'success');
            this.cargarInscripciones();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
          }
        });
      }
    });
  }
}
