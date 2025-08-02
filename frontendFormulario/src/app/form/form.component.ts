import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  form: FormGroup;

  // ✅ Inyectamos HttpClient aquí
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      programa: ['', Validators.required],

      // Datos generales
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]],
      primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]],
      segundoApellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]],
      curp: ['', [Validators.required, Validators.pattern('^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$')]],

      // Fecha de nacimiento
      diaNacimiento: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
      mesNacimiento: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
      anioNacimiento: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],

      ciudadNacimiento: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]],
      paisNacimiento: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correo: ['', [Validators.required, Validators.email]],

      // Domicilio
      calle: ['', Validators.required],
      numero: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z\\s]+$')]],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      colonia: ['', Validators.required],
      municipio: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]],
      estado: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]],

      // Contacto
      telefonoMovil: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      whatsapp: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correoContacto: ['', [Validators.required, Validators.email]],
      nombreContacto: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]],

      // Académicos
      gradoEstudios: ['', Validators.required],
      planEstudios: ['', Validators.required],
      institucion: ['', Validators.required],

      // Asesor
      asesor: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]+$')]]
    });
  }

  cancelar() {
    this.form.reset();
    Swal.fire("Datos eliminados correctamente");
  }

  guardar() {
    if (this.form.valid) {
      Swal.fire({
        title: "Enviar datos",
        text: "Tu inscripción quedará registrada después de aceptar",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#6576b4",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          // ✅ Enviar los datos al backend
          this.http.post("/api/inscripciones", this.form.value)
            .subscribe({
              next: () => {
                this.form.reset();
                Swal.fire({
                  title: "¡Datos Enviados!",
                  text: "Nos pondremos en contacto contigo pronto.",
                  icon: "success"
                });
              },
              error: () => {
                Swal.fire("Error", "No se pudo enviar, intenta de nuevo.", "error");
              }
            });
        }
      });
    } else {
      Swal.fire("Por favor completa todos los campos requeridos");
      this.form.markAllAsTouched();
    }
  }
}
