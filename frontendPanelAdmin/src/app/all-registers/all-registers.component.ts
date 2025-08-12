import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones.service';
import Swal from 'sweetalert2';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';




@Component({
  selector: 'app-all-registers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-registers.component.html',
  styleUrls: ['./all-registers.component.css']
})
export class AllRegistersComponent implements OnInit {
  inscripciones: any[] = [];
  inscripcionesFiltradas: any[] = [];
  terminoBusqueda: string = '';

  constructor(private inscripcionesService: InscripcionesService) {}

  ngOnInit(): void {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.inscripcionesService.obtenerInscripciones().subscribe({
      next: (data) => {
        this.inscripciones = data.sort((a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.filtrarUltimos5Dias(); 
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

  filtrarUltimos5Dias(): void {
    const hoy = new Date();
    const hace5dias = new Date();
    hace5dias.setDate(hoy.getDate() - 5);

    this.inscripcionesFiltradas = this.inscripciones.filter(item => {
      const fechaRegistro = new Date(item.createdAt);
      return fechaRegistro >= hace5dias && fechaRegistro <= hoy;
    });
  }

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

  // ✅ Función de búsqueda
  buscarRegistros(): void {
    const termino = this.terminoBusqueda?.toLowerCase().trim();

    if (!termino) {
      // ✅ Si no hay texto, mantener el filtro de últimos 5 días
      this.filtrarUltimos5Dias();
      return;
    }

    this.inscripcionesFiltradas = this.inscripciones.filter(item => {
      const nombreCompleto = `${item.nombre} ${item.primerApellido} ${item.segundoApellido}`.toLowerCase();
      return nombreCompleto.includes(termino);
    });
  }

  exportarExcelTodo(): void {
  if (!this.inscripciones || this.inscripciones.length === 0) {
    console.warn("No hay datos para exportar.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Registros Completos');

  // ✅ Definir columnas
  worksheet.columns = [
    { header: '#', key: 'index', width: 5 },
    { header: 'Fecha', key: 'fecha', width: 15 },
    { header: 'Nombre', key: 'nombre', width: 20 },
    { header: 'Primer Apellido', key: 'primerApellido', width: 20 },
    { header: 'Segundo Apellido', key: 'segundoApellido', width: 20 },
    { header: 'Correo', key: 'correo', width: 25 },
    { header: 'Teléfono', key: 'telefono', width: 15 },
    { header: 'Programa', key: 'programa', width: 20 },
    { header: 'CURP', key: 'curp', width: 20 },
    { header: 'Día', key: 'diaNacimiento', width: 10 },
    { header: 'Mes', key: 'mesNacimiento', width: 10 },
    { header: 'Año', key: 'anioNacimiento', width: 10 },
    { header: 'Ciudad Nacimiento', key: 'ciudadNacimiento', width: 20 },
    { header: 'País', key: 'paisNacimiento', width: 20 },
    { header: 'Calle', key: 'calle', width: 20 },
    { header: 'Número', key: 'numero', width: 10 },
    { header: 'CP', key: 'cp', width: 10 },
    { header: 'Colonia', key: 'colonia', width: 20 },
    { header: 'Municipio', key: 'municipio', width: 20 },
    { header: 'Estado', key: 'estado', width: 20 },
    { header: 'Tel. Móvil', key: 'telefonoMovil', width: 15 },
    { header: 'WhatsApp', key: 'whatsapp', width: 15 },
    { header: 'Correo Contacto', key: 'correoContacto', width: 25 },
    { header: 'Nombre Contacto', key: 'nombreContacto', width: 25 },
    { header: 'Grado Estudios', key: 'gradoEstudios', width: 20 },
    { header: 'Plan Estudios', key: 'planEstudios', width: 20 },
    { header: 'Institución', key: 'institucion', width: 25 },
    { header: 'Asesor', key: 'asesor', width: 20 }
  ];

  // ✅ Agregar datos
  this.inscripciones.forEach((item, index) => {
    worksheet.addRow({
      index: index + 1,
      fecha: new Date(item.createdAt).toLocaleDateString(),
      ...item
    });
  });

  // ✅ Dar estilo a los encabezados
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4472C4' }
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // ✅ Bordes en todas las celdas
  worksheet.eachRow({ includeEmpty: false }, (row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });

  // ✅ Habilitar autofiltro en la tabla
  worksheet.autoFilter = {
    from: 'A1',
    to: 'AC1'
  };

  // ✅ Descargar archivo
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), `Registros_Completos_${new Date().toLocaleDateString()}.xlsx`);
  });
}

esHoy(fecha: string): boolean {
  if (!fecha) return false;
  const fechaRegistro = new Date(fecha);
  const hoy = new Date();
  return (
    fechaRegistro.getDate() === hoy.getDate() &&
    fechaRegistro.getMonth() === hoy.getMonth() &&
    fechaRegistro.getFullYear() === hoy.getFullYear()
  );
}


}


